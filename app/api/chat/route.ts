import OpenAI from "openai";
import { profileData } from "@/app/data/profile";
import { resumeKnowledge } from "@/app/data/resumeKnowledge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type RequirementStatus =
  | "direct"
  | "transferable"
  | "gap";

type RequirementImportance =
  | "core"
  | "preferred";

type RequirementAssessment = {
  requirement: string;
  importance: RequirementImportance;
  status: RequirementStatus;
  evidence: string;
  criticalGap: boolean;
};

type RelevantExperience = {
  company: string;
  title: string;
  evidence: string;
};

type JobAssessment = {
  isJobDescription: boolean;
  jobTitle: string;
  requirements: RequirementAssessment[];
  relevantExperience: RelevantExperience[];
};

type ScoreResult = {
  score: number;
  coreDirect: number;
  coreTransferable: number;
  coreGaps: number;
  preferredDirect: number;
  preferredTransferable: number;
  criticalGapCount: number;
};

const allowedHistoricalTitles: Record<string, string[]> = {
  Adobe: ["Data Engineer"],

  "Swire Coca-Cola": [
    "Business Intelligence Analyst",
    "Data Engineering Intern",
  ],

  Amazon: ["Last Mile Analyst"],

  "Amazon Development Centre": [
    "Last Mile Analyst",
  ],
};

/* ---------------------------------------------------------
   TEXT HELPERS
--------------------------------------------------------- */

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s+#./-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAny(
  text: string,
  terms: string[]
) {
  const normalized =
    normalizeText(text);

  return terms.some((term) =>
    normalized.includes(
      normalizeText(term)
    )
  );
}

function findRequirement(
  requirements: RequirementAssessment[],
  searchTerms: string[]
) {
  return requirements.find((item) =>
    containsAny(
      item.requirement,
      searchTerms
    )
  );
}

/* ---------------------------------------------------------
   HISTORICAL TITLE PROTECTION
--------------------------------------------------------- */

function enforceHistoricalTitles(
  experiences: RelevantExperience[]
) {
  return experiences
    .map((experience) => {
      const allowedTitles =
        allowedHistoricalTitles[
          experience.company
        ];

      if (!allowedTitles) {
        return experience;
      }

      /*
        If the model already returned
        a valid exact title, keep it.
      */

      if (
        allowedTitles.includes(
          experience.title
        )
      ) {
        return experience;
      }

      const evidence =
        normalizeText(
          experience.evidence
        );

      /*
        Swire has two legitimate roles.

        Internship evidence should map to
        Data Engineering Intern.
      */

      if (
        experience.company ===
          "Swire Coca-Cola" &&
        containsAny(evidence, [
          "intern",
          "azure data factory",
          "azure synapse",
          "sql server datasets to snowflake",
          "sql server to snowflake",
          "migration of sql server",
        ])
      ) {
        return {
          ...experience,
          title:
            "Data Engineering Intern",
        };
      }

      /*
        Otherwise use the primary known
        title for that employer.
      */

      return {
        ...experience,
        title: allowedTitles[0],
      };
    })
    .filter((experience) => {
      /*
        Relevant Experience should contain
        positive evidence.

        Do not show employers simply to say
        that a technology was not used.
      */

      const evidence =
        normalizeText(
          experience.evidence
        );

      const negativePatterns = [
        "does not",
        "did not",
        "no experience",
        "not related",
        "lacked experience",
        "not directly related",
        "doesn't have",
        "not java",
        "not relevant",
      ];

      return !negativePatterns.some(
        (pattern) =>
          evidence.includes(pattern)
      );
    });
}

/* ---------------------------------------------------------
   DETERMINISTIC ADJACENCY / ACCURACY FALLBACK
--------------------------------------------------------- */

function applyAdjacencyFallback(
  assessment: JobAssessment,
  originalMessage: string
): JobAssessment {
  const requirements = [
    ...assessment.requirements,
  ];

  const message =
    normalizeText(originalMessage);

  /*
    AWS
  */

  if (
    containsAny(message, [
      "aws",
      "amazon web services",
    ])
  ) {
    const item =
      findRequirement(
        requirements,
        [
          "aws",
          "amazon web services",
          "cloud services",
        ]
      );

    if (
      item &&
      item.status === "gap"
    ) {
      item.status = "direct";
      item.criticalGap = false;
      item.evidence =
        "Documented AWS experience from Amazon, including AWS services used in analytics, APIs, and data workflows.";
    }
  }

  /*
    REST / API adjacency
  */

  if (
    containsAny(message, [
      "rest api",
      "restful",
      "api",
      "apis",
      "microservice",
      "microservices",
    ])
  ) {
    const item =
      findRequirement(
        requirements,
        [
          "microservice",
          "microservices",
          "restful",
          "rest api",
          "apis",
        ]
      );

    if (
      item &&
      item.status === "gap"
    ) {
      item.status =
        "transferable";

      item.criticalGap =
        false;

      item.evidence =
        "Documented API integration experience provides transferable relevance to REST and service-oriented concepts, although backend microservice development is not directly documented.";
    }
  }

  /*
    CI/CD adjacency
  */

  if (
    containsAny(message, [
      "ci/cd",
      "cicd",
      "continuous integration",
      "continuous deployment",
      "deployment pipelines",
      "deployment workflow",
    ])
  ) {
    const item =
      findRequirement(
        requirements,
        [
          "ci/cd",
          "cicd",
          "deployment",
        ]
      );

    if (
      item &&
      item.status === "gap"
    ) {
      item.status =
        "transferable";

      item.criticalGap =
        false;

      item.evidence =
        "Git-based source control and governed deployment workflow experience provides limited transferable relevance to CI/CD.";
    }
  }

  /*
    Databricks -> Spark / PySpark
  */

  if (
    containsAny(message, [
      "spark",
      "pyspark",
      "apache spark",
    ])
  ) {
    const item =
      findRequirement(
        requirements,
        [
          "spark",
          "pyspark",
          "apache spark",
        ]
      );

    if (
      item &&
      item.status === "gap"
    ) {
      item.status =
        "transferable";

      item.criticalGap =
        false;

      item.evidence =
        "Hands-on Databricks experience provides meaningful exposure to Spark-based data engineering environments, although direct Spark/PySpark depth is not explicitly documented.";
    }
  }

  /*
    ETL / ELT -> Batch processing
  */

  if (
    containsAny(message, [
      "batch processing",
      "large-scale batch",
      "batch workloads",
    ])
  ) {
    const item =
      findRequirement(
        requirements,
        [
          "batch processing",
          "batch workload",
          "batch data",
        ]
      );

    if (
      item &&
      item.status === "gap"
    ) {
      item.status =
        "transferable";

      item.criticalGap =
        false;

      item.evidence =
        "ETL/ELT pipelines, scheduled transformations, and migration workflows provide meaningful transferable experience for batch-oriented processing.";
    }
  }

  /*
    Scalable systems adjacency
  */

  if (
    containsAny(message, [
      "scalable backend systems",
      "highly scalable systems",
      "distributed systems",
      "scalable systems",
    ])
  ) {
    const item =
      findRequirement(
        requirements,
        [
          "scalable backend",
          "highly scalable",
          "distributed systems",
          "scalable systems",
        ]
      );

    if (
      item &&
      item.status === "gap"
    ) {
      item.status =
        "transferable";

      item.criticalGap =
        false;

      item.evidence =
        "Experience building scalable enterprise data pipelines and cloud data platforms provides limited systems-engineering transferability, but backend application architecture is not directly documented.";
    }
  }

  /*
    SQL platform adjacency
  */

  if (
    containsAny(message, [
      "db2",
      "bigquery",
      "postgresql",
      "oracle",
    ])
  ) {
    const item =
      findRequirement(
        requirements,
        [
          "db2",
          "bigquery",
          "postgresql",
          "oracle",
        ]
      );

    if (
      item &&
      item.status === "gap"
    ) {
      item.status =
        "transferable";

      item.criticalGap =
        false;

      item.evidence =
        "Strong SQL experience provides transferable relational-database foundations, although the specific platform or dialect is not directly documented.";
    }
  }

  /*
    Fabric notebook safeguard

    Lakehouse + pipelines + semantic models
    are documented.

    Fabric notebook usage is not.
  */

  const fabricCombined =
    findRequirement(
      requirements,
      [
        "fabric lakehouse",
        "lakehouse",
        "notebooks",
        "semantic models",
      ]
    );

  if (
    fabricCombined &&
    containsAny(
      fabricCombined.requirement,
      ["notebook", "notebooks"]
    ) &&
    fabricCombined.status === "direct"
  ) {
    fabricCombined.status =
      "transferable";

    fabricCombined.criticalGap =
      false;

    fabricCombined.evidence =
      "Microsoft Fabric experience directly includes Lakehouses, pipelines, workspaces, and semantic models. Fabric notebook usage is not explicitly documented, so this combined requirement is treated as a strong partial match.";
  }

  /*
    Years-of-experience safeguard

    Broad data/analytics experience should
    not become specialized software-engineering
    experience automatically.
  */

  for (const item of requirements) {
    if (
      containsAny(
        item.requirement,
        [
          "software engineering experience",
          "java development",
          "spark experience",
          "pyspark experience",
          "fabric experience",
          "databricks experience",
        ]
      ) &&
      item.status === "direct"
    ) {
      const evidence =
        normalizeText(
          item.evidence
        );

      if (
        evidence.includes(
          "7+ years"
        ) &&
        containsAny(
          item.requirement,
          [
            "software engineering",
            "java",
          ]
        )
      ) {
        item.status =
          "transferable";

        item.criticalGap =
          false;

        item.evidence =
          "Abhilash has 7+ years across data engineering, business intelligence, analytics, and cloud data platforms. This provides relevant technical experience but is not equivalent to the narrower specialization requested.";
      }
    }
  }

  /*
    Deduplicate requirement objects.
  */

  const seen =
    new Set<string>();

  const deduped =
    requirements.filter((item) => {
      const key =
        normalizeText(
          item.requirement
        );

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });

  return {
    ...assessment,
    requirements: deduped,
    relevantExperience:
      enforceHistoricalTitles(
        assessment.relevantExperience
      ),
  };
}

/* ---------------------------------------------------------
   MATCH SCORE
--------------------------------------------------------- */

function calculateMatch(
  requirements: RequirementAssessment[]
): ScoreResult {
  let earned = 0;
  let possible = 0;

  let coreDirect = 0;
  let coreTransferable = 0;
  let coreGaps = 0;

  let preferredDirect = 0;
  let preferredTransferable = 0;

  let criticalGapCount = 0;

  for (const item of requirements) {
    /*
      CORE

      Direct = 1.00
      Transferable = 0.55
      Gap = 0
    */

    if (
      item.importance === "core"
    ) {
      possible += 1;

      if (
        item.status === "direct"
      ) {
        earned += 1;
        coreDirect++;
      }

      if (
        item.status ===
        "transferable"
      ) {
        earned += 0.55;
        coreTransferable++;
      }

      if (
        item.status === "gap"
      ) {
        coreGaps++;
      }
    }

    /*
      PREFERRED

      Direct = 0.30
      Transferable = 0.15
    */

    if (
      item.importance ===
      "preferred"
    ) {
      possible += 0.3;

      if (
        item.status === "direct"
      ) {
        earned += 0.3;
        preferredDirect++;
      }

      if (
        item.status ===
        "transferable"
      ) {
        earned += 0.15;
        preferredTransferable++;
      }
    }

    if (
      item.criticalGap &&
      item.status === "gap"
    ) {
      criticalGapCount++;
    }
  }

  if (possible === 0) {
    return {
      score: 0,
      coreDirect,
      coreTransferable,
      coreGaps,
      preferredDirect,
      preferredTransferable,
      criticalGapCount,
    };
  }

  let score =
    Math.round(
      (earned / possible) * 100
    );

  const totalSupported =
    coreDirect +
    coreTransferable +
    preferredDirect +
    preferredTransferable;

  /*
    Avoid meaningless 0% scores when
    technical adjacency actually exists.
  */

  if (
    totalSupported >= 3 &&
    score < 15
  ) {
    score = 15;
  }

  if (
    totalSupported >= 4 &&
    score < 18
  ) {
    score = 18;
  }

  /*
    Critical-gap caps
  */

  if (
    criticalGapCount >= 4
  ) {
    score = Math.min(
      score,
      34
    );
  } else if (
    criticalGapCount === 3
  ) {
    score = Math.min(
      score,
      39
    );
  } else if (
    criticalGapCount === 2
  ) {
    score = Math.min(
      score,
      54
    );
  } else if (
    criticalGapCount === 1
  ) {
    score = Math.min(
      score,
      79
    );
  }

  /*
    Core-gap-ratio caps
  */

  const totalCore =
    coreDirect +
    coreTransferable +
    coreGaps;

  if (totalCore > 0) {
    const gapRatio =
      coreGaps / totalCore;

    if (
      gapRatio >= 0.8
    ) {
      score = Math.min(
        score,
        24
      );
    } else if (
      gapRatio >= 0.65
    ) {
      score = Math.min(
        score,
        34
      );
    } else if (
      gapRatio >= 0.5
    ) {
      score = Math.min(
        score,
        49
      );
    }
  }

  score = Math.max(
    0,
    Math.min(100, score)
  );

  return {
    score,
    coreDirect,
    coreTransferable,
    coreGaps,
    preferredDirect,
    preferredTransferable,
    criticalGapCount,
  };
}

/* ---------------------------------------------------------
   FIT LABELS
--------------------------------------------------------- */

function getFitLabel(
  score: number
) {
  if (score >= 90) {
    return "Excellent fit";
  }

  if (score >= 80) {
    return "Strong fit";
  }

  if (score >= 70) {
    return "Good fit";
  }

  if (score >= 55) {
    return "Moderate fit";
  }

  if (score >= 40) {
    return "Significant stretch";
  }

  if (score >= 15) {
    return "Low fit";
  }

  return "Very low fit";
}

function getApplicationGuidance(
  score: number,
  gaps: RequirementAssessment[]
) {
  const criticalGaps =
    gaps.filter(
      (item) =>
        item.criticalGap
    );

  if (score >= 90) {
    return "Strongly recommend pursuing this opportunity.";
  }

  if (score >= 80) {
    return "Recommend pursuing this opportunity.";
  }

  if (score >= 70) {
    if (
      criticalGaps.length > 0
    ) {
      return "Worth pursuing, but review the critical requirement gap before applying.";
    }

    return "Good fit and worth pursuing.";
  }

  if (score >= 55) {
    return "May be worth pursuing if the employer is flexible on the identified gaps.";
  }

  if (score >= 40) {
    return "This is a stretch opportunity and is not one of the strongest matches.";
  }

  if (score >= 15) {
    return "This is not a primary target role based on the documented background.";
  }

  return "This role has very limited alignment with the documented background.";
}

/* ---------------------------------------------------------
   JOB MATCH RESPONSE
--------------------------------------------------------- */

function buildJobMatchResponse(
  assessment: JobAssessment
) {
  const result =
    calculateMatch(
      assessment.requirements
    );

  const strongMatches =
    assessment.requirements.filter(
      (item) =>
        item.status === "direct"
    );

  const transferable =
    assessment.requirements.filter(
      (item) =>
        item.status ===
        "transferable"
    );

  const gaps =
    assessment.requirements
      .filter(
        (item) =>
          item.status === "gap" &&
          item.importance === "core"
      )
      .sort((a, b) => {
        if (
          a.criticalGap ===
          b.criticalGap
        ) {
          return 0;
        }

        return a.criticalGap
          ? -1
          : 1;
      })
      .slice(0, 4);

  const fitLabel =
    getFitLabel(result.score);

  const guidance =
    getApplicationGuidance(
      result.score,
      gaps
    );

  let output = `## Job Match Analysis

**Estimated Match: ${result.score}%**

### Strong Matches
`;

  if (
    strongMatches.length === 0
  ) {
    output += `
- No major direct matches were identified.
`;
  } else {
    for (
      const item of strongMatches
    ) {
      output += `
- **${item.requirement}**: ${item.evidence}`;
    }

    output += "\n";
  }

  if (
    assessment.relevantExperience
      .length > 0
  ) {
    output += `
### Relevant Experience
`;

    for (
      const experience of assessment.relevantExperience
    ) {
      output += `
**${experience.company} — ${experience.title}**

- ${experience.evidence}
`;
    }
  }

  output += `
### Transferable Experience
`;

  if (
    transferable.length === 0
  ) {
    output += `
- No major transferable requirements were identified.
`;
  } else {
    for (
      const item of transferable
    ) {
      output += `
- **${item.requirement}**: ${item.evidence}`;
    }

    output += "\n";
  }

  output += `
### Key Gaps
`;

  if (gaps.length === 0) {
    output += `
- No major mandatory gaps were identified.
`;
  } else {
    for (const item of gaps) {
      output += `
- **${item.requirement}**: ${item.evidence}`;
    }

    output += "\n";
  }

  output += `
### Recommendation

**${fitLabel}.** ${guidance}
`;

  return output;
}

/* ---------------------------------------------------------
   JOB DESCRIPTION CLASSIFIER
--------------------------------------------------------- */

async function analyzeJobDescription(
  message: string
): Promise<JobAssessment | null> {
  const response =
    await openai.chat.completions.create({
      model: "gpt-4o-mini",

      response_format: {
        type: "json_object",
      },

      temperature: 0,

      messages: [
        {
          role: "system",

          content: `
You are a strict evidence classifier for Abhilash Joga's professional portfolio.

You do NOT calculate a match percentage.

You ONLY classify requirements.

Use only the supplied portfolio and resume information.

Never invent experience.

HISTORICAL JOB TITLES

Preserve exact historical titles.

Adobe:
Data Engineer

Swire Coca-Cola:
Business Intelligence Analyst

Swire Coca-Cola:
Data Engineering Intern

Amazon / Amazon Development Centre:
Last Mile Analyst

Swire Coca-Cola has TWO valid historical roles.

Do not automatically convert all Swire experience into Business Intelligence Analyst.

Use:

Business Intelligence Analyst
for work from July 2023 - March 2026.

Use:

Data Engineering Intern
for work from February 2023 - July 2023.

The SQL Server to Snowflake migration involving Azure Data Factory and Azure Synapse belongs to the Data Engineering Intern role.

Do not rename historical roles.

YEARS-OF-EXPERIENCE ACCURACY

Do not treat experience in a broad professional field as identical to experience in a narrower specialization.

Examples:

7+ years across data engineering, business intelligence, analytics, and cloud platforms is relevant to a data engineering requirement.

It is NOT automatically:

- 7+ years of Java software engineering
- 7+ years of Spark
- 7+ years of Fabric
- 7+ years of Databricks
- 7+ years of another specific technology

If the broader background is relevant but not equivalent, classify it as transferable.

REQUIREMENT STATUS

Use:

"direct"

when the supplied evidence clearly supports the requirement.

"transferable"

when closely related supported experience exists but the exact specialization is not fully documented.

"gap"

only when meaningful direct or transferable evidence is not documented.

IMPORTANCE

Use:

"core"

for mandatory, required, must-have, or central requirements.

"preferred"

for preferred, desired, bonus, plus, or nice-to-have requirements.

CRITICAL GAP

Set criticalGap=true only when:

1. the requirement is core,
2. it is central to performing the role,
3. and there is no meaningful transferable evidence.

Do not mark every missing technology critical.

FABRIC NOTEBOOK ACCURACY

Microsoft Fabric notebook usage is NOT explicitly documented.

If a requirement combines:

- Lakehouse
- pipelines
- notebooks
- semantic models

and Lakehouses, pipelines, and semantic models are supported while notebooks are not, classify that combined requirement as transferable rather than direct.

MIGRATION ATTRIBUTION

Keep migration work tied to the correct role.

Swire Coca-Cola — Data Engineering Intern:

- SQL Server to Snowflake
- Azure Data Factory
- Azure Synapse
- downstream reporting migration

Swire Coca-Cola — Business Intelligence Analyst:

- Snowflake analytics
- Microsoft Fabric modernization patterns
- BI modernization
- validation and reconciliation
- Power BI
- logistics analytics

Adobe — Data Engineer:

- legacy SQL Server modernization
- migration POCs involving Databricks and Microsoft Fabric
- ETL/ELT integration
- Fabric Lakehouses, pipelines, semantic models

Do not imply:

- SQL Server to Databricks was completed at Swire
- every Fabric initiative was a completed production migration

TRANSFERABLE CLASSIFICATION GUIDANCE

AWS

Documented AWS experience is direct when general AWS experience is requested.

APIs

Documented API integration may be transferable toward REST/service-oriented requirements.

Do not automatically claim backend microservices.

DATABRICKS

Databricks is directly documented at Adobe.

Databricks may also provide transferable relevance toward Spark/PySpark requirements where direct Spark/PySpark depth is not documented.

SNOWFLAKE

Snowflake is directly documented.

AZURE DATA FACTORY

Azure Data Factory is directly documented during the Swire Coca-Cola Data Engineering Internship.

SQL

Strong SQL may provide transferable relevance toward specific dialects such as DB2 or BigQuery.

Do not claim unsupported platform-specific syntax.

ETL / ELT

ETL/ELT work may provide transferable experience toward batch-processing requirements.

GIT / DEPLOYMENT

Git-based source control and deployment workflows may provide limited transferable evidence toward CI/CD.

DATA VALIDATION

Source-to-target validation, reconciliation, and data-quality work are directly documented.

POWER BI

Power BI and enterprise reporting are directly documented.

STAKEHOLDER COLLABORATION

Do not automatically classify stakeholder collaboration as a gap.

Enterprise BI, reporting, operational analytics, cross-functional work, business-facing dashboards, and requirements-oriented analytics provide relevant evidence.

NO DUPLICATES

Represent each requirement once.

RELEVANT EXPERIENCE

Only include employers/roles that provide positive evidence for the target job.

Do not include an employer merely to explain what Abhilash did not do.

Use exact historical titles.

OUTPUT VALID JSON ONLY.

Use exactly:

{
  "isJobDescription": true,
  "jobTitle": "string",
  "requirements": [
    {
      "requirement": "string",
      "importance": "core",
      "status": "direct",
      "evidence": "string",
      "criticalGap": false
    }
  ],
  "relevantExperience": [
    {
      "company": "string",
      "title": "string",
      "evidence": "string"
    }
  ]
}

If the user is clearly NOT asking for job-match analysis:

{
  "isJobDescription": false,
  "jobTitle": "",
  "requirements": [],
  "relevantExperience": []
}

PORTFOLIO PROFILE

${JSON.stringify(
  profileData,
  null,
  2
)}

RESUME INFORMATION

${resumeKnowledge}
`,
        },

        {
          role: "user",
          content: message,
        },
      ],
    });

  const content =
    response.choices[0].message
      .content;

  if (!content) {
    return null;
  }

  try {
    const parsed =
      JSON.parse(
        content
      ) as JobAssessment;

    return applyAdjacencyFallback(
      parsed,
      message
    );
  } catch (error) {
    console.error(
      "JOB JSON PARSE ERROR:",
      error
    );

    return null;
  }
}

/* ---------------------------------------------------------
   GENERAL PORTFOLIO ASSISTANT
--------------------------------------------------------- */

async function answerGeneralQuestion(
  message: string
) {
  const response =
    await openai.chat.completions.create({
      model: "gpt-4o-mini",

      temperature: 0.3,

      messages: [
        {
          role: "system",

          content: `
You are Abhilash AI, the professional portfolio assistant for Abhilash Joga.

Use the supplied portfolio and resume information as the primary source of truth.

You help visitors understand:

- professional experience
- technical skills
- projects
- certifications
- migration experience
- data engineering
- business intelligence
- Microsoft Fabric
- Databricks
- Snowflake
- Azure
- Power BI
- applied AI
- professional contact

TRUTHFULNESS

Never invent:

- professional experience
- job titles
- technologies
- certifications
- projects
- metrics
- domain knowledge

Historical titles must remain exact:

Adobe:
Data Engineer

Swire Coca-Cola:
Business Intelligence Analyst

Swire Coca-Cola:
Data Engineering Intern

Amazon:
Last Mile Analyst

Future role fit may be broader than historical titles.

Do not rename historical employment.

MIGRATION ACCURACY

Swire Coca-Cola Data Engineering Intern:
SQL Server to Snowflake work.

Swire Coca-Cola Business Intelligence Analyst:
Snowflake / Fabric modernization patterns, Power BI, operational analytics, validation and reconciliation.

Adobe Data Engineer:
Databricks, Microsoft Fabric, SQL Server modernization and migration POCs.

AI ACCURACY

Do not describe the current portfolio assistant as production RAG or vector search unless explicitly supported.

Appropriate descriptions include:

- context-grounded AI
- OpenAI-powered assistant
- job-description analysis assistant
- calendar-integrated portfolio assistant

CONTACT

Preferred direct contact methods are LinkedIn and email.

Do not claim you independently contacted Abhilash.

SCHEDULING

Do not invent calendar availability.

Do not claim a meeting was created unless the scheduling API confirms success.

OUT OF SCOPE

For unrelated questions, explain that you focus on Abhilash's professional portfolio.

Keep answers professional and reasonably concise.

PORTFOLIO PROFILE

${JSON.stringify(
  profileData,
  null,
  2
)}

RESUME INFORMATION

${resumeKnowledge}
`,
        },

        {
          role: "user",
          content: message,
        },
      ],
    });

  return (
    response.choices[0].message
      .content ||
    "Sorry, I am unable to answer right now."
  );
}

/* ---------------------------------------------------------
   API ROUTE
--------------------------------------------------------- */

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const message =
      typeof body.message ===
      "string"
        ? body.message.trim()
        : "";

    if (!message) {
      return Response.json(
        {
          answer:
            "Please enter a question.",
        },
        {
          status: 400,
        }
      );
    }

    /*
      First determine whether this is
      a job-match request.
    */

    const assessment =
      await analyzeJobDescription(
        message
      );

    /*
      Job descriptions use deterministic
      TypeScript scoring.
    */

    if (
      assessment?.isJobDescription
    ) {
      const answer =
        buildJobMatchResponse(
          assessment
        );

      return Response.json({
        answer,
      });
    }

    /*
      Normal portfolio Q&A.
    */

    const answer =
      await answerGeneralQuestion(
        message
      );

    return Response.json({
      answer,
    });
  } catch (error) {
    console.error(
      "OPENAI ERROR:",
      error
    );

    return Response.json(
      {
        answer:
          "Sorry, I am unable to answer right now.",
      },
      {
        status: 500,
      }
    );
  }
}