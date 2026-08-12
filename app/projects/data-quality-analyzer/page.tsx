"use client";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import Papa from "papaparse";
import * as XLSX from "xlsx";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* =========================================================
   TYPES
========================================================= */

type DataRow = Record<
  string,
  string | number | null
>;

type ColumnType =
  | "Number"
  | "Date"
  | "Boolean"
  | "Text";

type Severity =
  | "Good"
  | "Low"
  | "Medium"
  | "High";

type Mode =
  | "dataset"
  | "pdf"
  | null;

type DatasetSource =
  | "CSV"
  | "Excel";

type ColumnProfile = {
  name: string;
  type: ColumnType;

  total: number;

  missing: number;
  missingPercent: number;

  unique: number;
  uniquePercent: number;

  possibleKey: boolean;

  validCount: number;
  invalidCount: number;

  min?: number;
  max?: number;
  mean?: number;
  median?: number;

  negativeCount?: number;

  outlierCount?: number;
  lowerBound?: number;
  upperBound?: number;

  inconsistentGroups?: {
    normalized: string;

    variants: {
      value: string;
      count: number;
    }[];
  }[];

  severity: Severity;
};

type QualityIssue = {
  id: string;

  column?: string;

  title: string;

  description: string;

  severity:
    | "Low"
    | "Medium"
    | "High";

  recommendation: string;

  kind:
    | "missing"
    | "duplicate"
    | "invalid"
    | "negative"
    | "outlier"
    | "consistency";
};

type QualityDimensions = {
  completeness: number;
  uniqueness: number;
  validity: number;
  consistency: number;
  anomalyHealth: number;
  overall: number;
};

type ExcelSheet = {
  name: string;
  rows: DataRow[];

  rowCount: number;
  columnCount: number;

  density: number;

  score: number;
};

type PdfPageData = {
  page: number;
  text: string;
  words: number;
};

type PdfAnalysis = {
  fileName: string;
  fileSize: string;

  pages: number;

  text: string;

  wordCount: number;
  characterCount: number;
  sentenceCount: number;

  pageData:
    PdfPageData[];

  topTerms: {
    term: string;
    count: number;
  }[];
};

type AiAction =
  | "dataset-overview"
  | "explain-score"
  | "prioritize"
  | "sql"
  | "python"
  | "summary"
  | "document-skills"
  | "document-dates"
  | "document-actions"
  | "custom";

/* =========================================================
   SETTINGS
========================================================= */

const DAILY_AI_LIMIT = 10;

/* =========================================================
   SAMPLE DATA
========================================================= */

const SAMPLE_DATA: DataRow[] = [
  {
    Order_ID:
      "ORD-1001",
    Customer_ID:
      "CUS-001",
    Order_Date:
      "2026-07-01",
    Region: "West",
    Product: "Laptop",
    Quantity: 2,
    Revenue: 2598,
    Profit: 467.64,
    Email:
      "customer1@example.com",
    Status:
      "Completed",
  },

  {
    Order_ID:
      "ORD-1002",
    Customer_ID:
      "CUS-002",
    Order_Date:
      "2026-07-02",
    Region: "South",
    Product: "Monitor",
    Quantity: 3,
    Revenue: 1047,
    Profit: 230.34,
    Email:
      "customer2@example.com",
    Status:
      "Completed",
  },

  {
    Order_ID:
      "ORD-1003",
    Customer_ID: null,
    Order_Date:
      "INVALID_DATE",
    Region: "west",
    Product:
      "Keyboard",
    Quantity: 75,
    Revenue: -356,
    Profit: 110.36,
    Email: null,
    Status:
      "Returned",
  },

  {
    Order_ID:
      "ORD-1002",
    Customer_ID:
      "CUS-002",
    Order_Date:
      "2026-07-02",
    Region: "South",
    Product: "Monitor",
    Quantity: 3,
    Revenue: 1047,
    Profit: 230.34,
    Email:
      "customer2@example.com",
    Status:
      "Completed",
  },
];

/* =========================================================
   GENERAL HELPERS
========================================================= */

function isMissing(
  value: unknown
) {
  if (
    value === null ||
    value === undefined
  ) {
    return true;
  }

  const normalized =
    String(value)
      .trim()
      .toLowerCase();

  return [
    "",
    "null",
    "undefined",
    "n/a",
    "na",
    "nan",
  ].includes(
    normalized
  );
}

function numericString(
  value: unknown
) {
  return String(value)
    .replace(
      /[$,%]/g,
      ""
    )
    .replace(/,/g, "")
    .trim();
}

function isNumeric(
  value: unknown
) {
  if (isMissing(value)) {
    return false;
  }

  const valueString =
    numericString(value);

  return (
    valueString !== "" &&
    Number.isFinite(
      Number(valueString)
    )
  );
}

function toNumber(
  value: unknown
) {
  return Number(
    numericString(value)
  );
}

function isBoolean(
  value: unknown
) {
  if (isMissing(value)) {
    return false;
  }

  return [
    "true",
    "false",
    "yes",
    "no",
    "y",
    "n",
  ].includes(
    String(value)
      .trim()
      .toLowerCase()
  );
}

function looksLikeDate(
  value: unknown
) {
  if (isMissing(value)) {
    return false;
  }

  const text =
    String(value).trim();

  return (
    /^\d{4}[-/]\d{1,2}[-/]\d{1,2}/.test(
      text
    ) ||
    /^\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/.test(
      text
    )
  );
}

function isValidDate(
  value: unknown
) {
  return (
    looksLikeDate(value) &&
    !Number.isNaN(
      Date.parse(
        String(value)
      )
    )
  );
}

function dateColumnName(
  name: string
) {
  const n =
    name.toLowerCase();

  return (
    n.includes("date") ||
    n.includes("time") ||
    n.includes(
      "timestamp"
    )
  );
}

function detectType(
  name: string,
  values: unknown[]
): ColumnType {
  const valid =
    values.filter(
      (value) =>
        !isMissing(value)
    );

  if (!valid.length) {
    return "Text";
  }

  const numberRatio =
    valid.filter(
      isNumeric
    ).length /
    valid.length;

  const booleanRatio =
    valid.filter(
      isBoolean
    ).length /
    valid.length;

  const dateRatio =
    valid.filter(
      isValidDate
    ).length /
    valid.length;

  if (
    dateColumnName(name) &&
    dateRatio >= 0.5
  ) {
    return "Date";
  }

  if (
    numberRatio >= 0.85
  ) {
    return "Number";
  }

  if (
    booleanRatio >= 0.85
  ) {
    return "Boolean";
  }

  if (
    dateRatio >= 0.75
  ) {
    return "Date";
  }

  return "Text";
}

function normalizeRow(
  row: Record<
    string,
    unknown
  >
): DataRow {
  const output:
    DataRow = {};

  Object.entries(row).forEach(
    ([key, value]) => {
      const cleanKey =
        key.trim();

      if (!cleanKey) {
        return;
      }

      if (
        isMissing(value)
      ) {
        output[
          cleanKey
        ] = null;

        return;
      }

      if (
        isNumeric(value)
      ) {
        output[
          cleanKey
        ] =
          toNumber(value);
      } else {
        output[
          cleanKey
        ] =
          String(value).trim();
      }
    }
  );

  return output;
}

function formatNumber(
  number: number
) {
  return new Intl.NumberFormat(
    "en-US",
    {
      maximumFractionDigits:
        2,
    }
  ).format(number);
}

function clamp(
  value: number
) {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(value)
    )
  );
}

function median(
  numbers: number[]
) {
  if (!numbers.length) {
    return 0;
  }

  const sorted =
    [...numbers].sort(
      (a, b) => a - b
    );

  const middle =
    Math.floor(
      sorted.length / 2
    );

  if (
    sorted.length % 2 ===
    0
  ) {
    return (
      (sorted[
        middle - 1
      ] +
        sorted[
          middle
        ]) /
      2
    );
  }

  return sorted[middle];
}

function formatFileSize(
  bytes: number
) {
  if (
    bytes <
    1024
  ) {
    return `${bytes} B`;
  }

  if (
    bytes <
    1024 * 1024
  ) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(2)} MB`;
}

/* =========================================================
   EXCEL
========================================================= */

function removeEmptyColumns(
  rows: DataRow[]
) {
  if (!rows.length) {
    return [];
  }

  const columns =
    Array.from(
      new Set(
        rows.flatMap(
          (row) =>
            Object.keys(
              row
            )
        )
      )
    );

  const populatedColumns =
    columns.filter(
      (column) =>
        rows.some(
          (row) =>
            !isMissing(
              row[column]
            )
        )
    );

  return rows.map(
    (row) => {
      const cleaned:
        DataRow = {};

      populatedColumns.forEach(
        (column) => {
          cleaned[
            column
          ] =
            row[column] ??
            null;
        }
      );

      return cleaned;
    }
  );
}

function calculateSheetScore(
  rows: DataRow[]
) {
  if (!rows.length) {
    return {
      score: 0,
      rowCount: 0,
      columnCount: 0,
      density: 0,
    };
  }

  const columns =
    Array.from(
      new Set(
        rows.flatMap(
          (row) =>
            Object.keys(
              row
            )
        )
      )
    );

  const totalCells =
    rows.length *
    Math.max(
      1,
      columns.length
    );

  const populated =
    rows.reduce(
      (sum, row) =>
        sum +
        columns.filter(
          (column) =>
            !isMissing(
              row[column]
            )
        ).length,
      0
    );

  const density =
    totalCells
      ? populated /
        totalCells
      : 0;

  const emptyHeaders =
    columns.filter(
      (column) =>
        column
          .toUpperCase()
          .startsWith(
            "__EMPTY"
          )
    ).length;

  const score =
    Math.min(
      rows.length,
      500
    ) *
      0.7 +
    Math.min(
      columns.length,
      50
    ) *
      5 +
    density * 100 -
    emptyHeaders * 20;

  return {
    score,
    rowCount:
      rows.length,
    columnCount:
      columns.length,
    density,
  };
}

function workbookSheets(
  workbook: XLSX.WorkBook
): ExcelSheet[] {
  return workbook.SheetNames.map(
    (name) => {
      const sheet =
        workbook.Sheets[
          name
        ];

      const raw =
        XLSX.utils.sheet_to_json<
          Record<
            string,
            unknown
          >
        >(sheet, {
          defval: null,
          raw: false,
        });

      const normalized =
        raw
          .map(
            normalizeRow
          )
          .filter((row) =>
            Object.values(
              row
            ).some(
              (value) =>
                !isMissing(
                  value
                )
            )
          );

      const cleaned =
        removeEmptyColumns(
          normalized
        );

      const metrics =
        calculateSheetScore(
          cleaned
        );

      return {
        name,
        rows: cleaned,
        ...metrics,
      };
    }
  );
}

/* =========================================================
   DUPLICATES
========================================================= */

function duplicateCount(
  rows: DataRow[]
) {
  const seen =
    new Set<string>();

  let duplicates = 0;

  rows.forEach(
    (row) => {
      const signature =
        JSON.stringify(
          row
        );

      if (
        seen.has(
          signature
        )
      ) {
        duplicates++;
      } else {
        seen.add(
          signature
        );
      }
    }
  );

  return duplicates;
}

/* =========================================================
   CATEGORY INCONSISTENCY
========================================================= */

function categoryInconsistencies(
  values: unknown[]
) {
  const map =
    new Map<
      string,
      Map<
        string,
        number
      >
    >();

  values.forEach(
    (value) => {
      if (
        isMissing(value)
      ) {
        return;
      }

      const original =
        String(value).trim();

      const normalized =
        original.toLowerCase();

      if (
        !map.has(
          normalized
        )
      ) {
        map.set(
          normalized,
          new Map()
        );
      }

      const variants =
        map.get(
          normalized
        )!;

      variants.set(
        original,
        (variants.get(
          original
        ) ?? 0) + 1
      );
    }
  );

  return Array.from(
    map.entries()
  )
    .filter(
      ([, variants]) =>
        variants.size >
        1
    )
    .map(
      ([
        normalized,
        variants,
      ]) => ({
        normalized,

        variants:
          Array.from(
            variants.entries()
          ).map(
            ([
              value,
              count,
            ]) => ({
              value,
              count,
            })
          ),
      })
    );
}

/* =========================================================
   PROFILING
========================================================= */

function buildProfiles(
  rows: DataRow[],
  columns: string[]
): ColumnProfile[] {
  return columns.map(
    (column) => {
      const values =
        rows.map(
          (row) =>
            row[column]
        );

      const total =
        values.length;

      const missing =
        values.filter(
          isMissing
        ).length;

      const populated =
        values.filter(
          (value) =>
            !isMissing(value)
        );

      const normalized =
        populated.map(
          (value) =>
            String(value)
              .trim()
              .toLowerCase()
        );

      const unique =
        new Set(
          normalized
        ).size;

      const missingPercent =
        total
          ? (missing /
              total) *
            100
          : 0;

      const uniquePercent =
        populated.length
          ? (unique /
              populated.length) *
            100
          : 0;

      const type =
        detectType(
          column,
          values
        );

      let validCount =
        populated.length;

      let invalidCount =
        0;

      if (
        type === "Date"
      ) {
        validCount =
          populated.filter(
            isValidDate
          ).length;

        invalidCount =
          populated.length -
          validCount;
      }

      let min:
        | number
        | undefined;

      let max:
        | number
        | undefined;

      let mean:
        | number
        | undefined;

      let med:
        | number
        | undefined;

      let negativeCount =
        0;

      let outlierCount =
        0;

      let lowerBound:
        | number
        | undefined;

      let upperBound:
        | number
        | undefined;

      if (
        type ===
        "Number"
      ) {
        const numbers =
          populated
            .filter(
              isNumeric
            )
            .map(
              toNumber
            );

        if (
          numbers.length
        ) {
          min =
            Math.min(
              ...numbers
            );

          max =
            Math.max(
              ...numbers
            );

          mean =
            numbers.reduce(
              (
                total,
                value
              ) =>
                total +
                value,
              0
            ) /
            numbers.length;

          med =
            median(
              numbers
            );

          negativeCount =
            numbers.filter(
              (value) =>
                value < 0
            ).length;

          if (
            numbers.length >=
            4
          ) {
            const sorted =
              [...numbers].sort(
                (a, b) =>
                  a - b
              );

            const q1 =
              sorted[
                Math.floor(
                  (sorted.length -
                    1) *
                    0.25
                )
              ];

            const q3 =
              sorted[
                Math.floor(
                  (sorted.length -
                    1) *
                    0.75
                )
              ];

            const iqr =
              q3 - q1;

            lowerBound =
              q1 -
              1.5 *
                iqr;

            upperBound =
              q3 +
              1.5 *
                iqr;

            outlierCount =
              numbers.filter(
                (number) =>
                  number <
                    lowerBound! ||
                  number >
                    upperBound!
              ).length;
          }
        }
      }

      const inconsistentGroups =
        type === "Text" &&
        unique <= 50
          ? categoryInconsistencies(
              populated
            )
          : [];

      const possibleKey =
        total > 1 &&
        missing === 0 &&
        invalidCount ===
          0 &&
        unique === total;

      let severity:
        Severity =
        "Good";

      if (
        missingPercent >=
          20 ||
        invalidCount /
          Math.max(
            1,
            total
          ) >=
          0.1
      ) {
        severity =
          "High";
      } else if (
        missingPercent >=
          5 ||
        invalidCount > 0 ||
        outlierCount > 0 ||
        inconsistentGroups.length >
          0
      ) {
        severity =
          "Medium";
      } else if (
        missing > 0
      ) {
        severity =
          "Low";
      }

      return {
        name: column,
        type,

        total,

        missing,
        missingPercent,

        unique,
        uniquePercent,

        possibleKey,

        validCount,
        invalidCount,

        min,
        max,
        mean,
        median: med,

        negativeCount,
        outlierCount,

        lowerBound,
        upperBound,

        inconsistentGroups,

        severity,
      };
    }
  );
}

/* =========================================================
   QUALITY ISSUES
========================================================= */

function createIssues(
  rows: DataRow[],
  profiles:
    ColumnProfile[],
  duplicates: number
): QualityIssue[] {
  const issues:
    QualityIssue[] = [];

  profiles.forEach(
    (profile) => {
      if (
        profile.missingPercent >=
        20
      ) {
        issues.push({
          id: `${profile.name}-missing`,

          column:
            profile.name,

          title: `High missing values in ${profile.name}`,

          description: `${profile.missing} values are missing (${profile.missingPercent.toFixed(
            1
          )}%).`,

          severity:
            "High",

          recommendation:
            "Investigate the upstream source and determine an appropriate missing-value strategy.",

          kind:
            "missing",
        });
      } else if (
        profile.missingPercent >=
        5
      ) {
        issues.push({
          id: `${profile.name}-missing`,

          column:
            profile.name,

          title: `Missing values in ${profile.name}`,

          description: `${profile.missing} values are missing (${profile.missingPercent.toFixed(
            1
          )}%).`,

          severity:
            "Medium",

          recommendation:
            "Validate whether these values should be corrected, imputed, defaulted, or excluded.",

          kind:
            "missing",
        });
      } else if (
        profile.missing >
        0
      ) {
        issues.push({
          id: `${profile.name}-missing`,

          column:
            profile.name,

          title: `Missing values in ${profile.name}`,

          description: `${profile.missing} values are missing.`,

          severity:
            "Low",

          recommendation:
            "Review whether the missing values are expected.",

          kind:
            "missing",
        });
      }

      if (
        profile.invalidCount >
        0
      ) {
        issues.push({
          id: `${profile.name}-invalid`,

          column:
            profile.name,

          title:
            profile.type ===
            "Date"
              ? `Invalid dates in ${profile.name}`
              : `Invalid values in ${profile.name}`,

          description: `${profile.invalidCount} populated values do not match the detected ${profile.type.toLowerCase()} format.`,

          severity:
            "Medium",

          recommendation:
            "Standardize or safely parse invalid values before downstream analysis.",

          kind:
            "invalid",
        });
      }

      if (
        profile.type ===
          "Number" &&
        (profile.negativeCount ??
          0) > 0
      ) {
        issues.push({
          id: `${profile.name}-negative`,

          column:
            profile.name,

          title: `Negative values in ${profile.name}`,

          description: `${profile.negativeCount} negative values were detected.`,

          severity:
            "Medium",

          recommendation:
            "Validate whether these represent legitimate refunds, returns, credits, or corrections.",

          kind:
            "negative",
        });
      }

      if (
        profile.type ===
          "Number" &&
        (profile.outlierCount ??
          0) > 0
      ) {
        issues.push({
          id: `${profile.name}-outlier`,

          column:
            profile.name,

          title: `Statistical outlier candidates in ${profile.name}`,

          description: `${profile.outlierCount} values fall outside the IQR-based statistical range.`,

          severity:
            "Low",

          recommendation:
            "Flag these records for review rather than automatically removing them.",

          kind:
            "outlier",
        });
      }

      if (
        profile
          .inconsistentGroups
          ?.length
      ) {
        const group =
          profile
            .inconsistentGroups[0];

        issues.push({
          id: `${profile.name}-consistency`,

          column:
            profile.name,

          title: `Category inconsistency in ${profile.name}`,

          description:
            group.variants
              .map(
                (variant) =>
                  `${variant.value} (${variant.count})`
              )
              .join(
                ", "
              ),

          severity:
            "Medium",

          recommendation:
            "Standardize category capitalization, spacing, and naming.",

          kind:
            "consistency",
        });
      }
    }
  );

  if (
    duplicates > 0
  ) {
    issues.push({
      id:
        "duplicate-rows",

      title:
        "Duplicate rows detected",

      description: `${duplicates} duplicate rows were detected.`,

      severity:
        "Medium",

      recommendation:
        "Define the correct business key and apply deterministic deduplication.",

      kind:
        "duplicate",
    });
  }

  const order = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  return issues.sort(
    (a, b) =>
      order[
        b.severity
      ] -
      order[
        a.severity
      ]
  );
}

/* =========================================================
   QUALITY SCORE
========================================================= */

function scoreQuality(
  rows: DataRow[],
  profiles:
    ColumnProfile[],
  duplicates: number,
  issues: QualityIssue[]
): QualityDimensions {
  if (
    !rows.length ||
    !profiles.length
  ) {
    return {
      completeness: 0,
      uniqueness: 0,
      validity: 0,
      consistency: 0,
      anomalyHealth: 0,
      overall: 0,
    };
  }

  const cells =
    rows.length *
    profiles.length;

  const missing =
    profiles.reduce(
      (sum, profile) =>
        sum +
        profile.missing,
      0
    );

  const completeness =
    clamp(
      100 -
        (missing /
          Math.max(
            1,
            cells
          )) *
          100
    );

  const duplicateRate =
    duplicates /
    Math.max(
      1,
      rows.length
    );

  const uniqueness =
    clamp(
      100 -
        duplicateRate *
          100
    );

  const typedProfiles =
    profiles.filter(
      (profile) =>
        profile.type !==
        "Text"
    );

  const totalTyped =
    typedProfiles.reduce(
      (sum, profile) =>
        sum +
        profile.validCount +
        profile.invalidCount,
      0
    );

  const invalidTyped =
    typedProfiles.reduce(
      (sum, profile) =>
        sum +
        profile.invalidCount,
      0
    );

  const validity =
    totalTyped
      ? clamp(
          100 -
            (invalidTyped /
              totalTyped) *
              100
        )
      : 100;

  const inconsistent =
    profiles.filter(
      (profile) =>
        (profile
          .inconsistentGroups
          ?.length ??
          0) > 0
    ).length;

  const consistency =
    clamp(
      100 -
        (inconsistent /
          Math.max(
            1,
            profiles.length
          )) *
          40
    );

  let anomalyPenalty =
    0;

  issues.forEach(
    (issue) => {
      if (
        issue.kind ===
        "outlier"
      ) {
        anomalyPenalty +=
          2;
      }

      if (
        issue.kind ===
        "negative"
      ) {
        anomalyPenalty +=
          4;
      }

      if (
        issue.kind ===
        "invalid"
      ) {
        anomalyPenalty +=
          5;
      }

      if (
        issue.kind ===
        "consistency"
      ) {
        anomalyPenalty +=
          4;
      }

      if (
        issue.kind ===
        "duplicate"
      ) {
        anomalyPenalty +=
          Math.min(
            8,
            duplicateRate *
              50
          );
      }

      if (
        issue.kind ===
        "missing"
      ) {
        anomalyPenalty +=
          issue.severity ===
          "High"
            ? 6
            : issue.severity ===
              "Medium"
            ? 3
            : 1;
      }
    }
  );

  const anomalyHealth =
    clamp(
      100 -
        anomalyPenalty
    );

  const overall =
    clamp(
      completeness *
        0.25 +
        uniqueness *
          0.2 +
        validity * 0.2 +
        consistency *
          0.15 +
        anomalyHealth *
          0.2
    );

  return {
    completeness,
    uniqueness,
    validity,
    consistency,
    anomalyHealth,
    overall,
  };
}

/* =========================================================
   PDF
========================================================= */

const PDF_STOP_WORDS =
  new Set([
    "the",
    "and",
    "for",
    "that",
    "this",
    "with",
    "from",
    "have",
    "are",
    "was",
    "were",
    "been",
    "being",
    "their",
    "they",
    "your",
    "about",
    "into",
    "also",
    "more",
    "other",
    "page",
    "linkedin",
    "experience",
    "experiences",
    "company",
    "business",
  ]);

function topTerms(
  text: string
) {
  const words =
    text
      .toLowerCase()
      .replace(
        /[^a-z0-9\s-]/g,
        " "
      )
      .split(/\s+/)
      .filter(
        (word) =>
          word.length >=
            4 &&
          !PDF_STOP_WORDS.has(
            word
          ) &&
          !/^\d+$/.test(
            word
          )
      );

  const counts =
    new Map<
      string,
      number
    >();

  words.forEach(
    (word) => {
      counts.set(
        word,
        (counts.get(
          word
        ) ?? 0) + 1
      );
    }
  );

  return Array.from(
    counts.entries()
  )
    .map(
      ([term, count]) => ({
        term,
        count,
      })
    )
    .sort(
      (a, b) =>
        b.count -
        a.count
    )
    .slice(0, 12);
}

async function readPdf(
  file: File
): Promise<PdfAnalysis> {
  const pdfjs =
    await import(
      "pdfjs-dist"
    );

  pdfjs.GlobalWorkerOptions.workerSrc =
    `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const document =
    await pdfjs.getDocument({
      data:
        new Uint8Array(
          await file.arrayBuffer()
        ),
    }).promise;

  const pages:
    PdfPageData[] = [];

  const fullText:
    string[] = [];

  for (
    let pageNumber = 1;
    pageNumber <=
    document.numPages;
    pageNumber++
  ) {
    const page =
      await document.getPage(
        pageNumber
      );

    const content =
      await page.getTextContent();

    const text =
      content.items
        .map((item) =>
          "str" in item
            ? item.str
            : ""
        )
        .join(" ")
        .replace(
          /\s+/g,
          " "
        )
        .trim();

    pages.push({
      page:
        pageNumber,

      text,

      words:
        text
          ? text.split(
              /\s+/
            ).length
          : 0,
    });

    fullText.push(text);
  }

  const text =
    fullText
      .join("\n\n")
      .trim();

  return {
    fileName:
      file.name,

    fileSize:
      formatFileSize(
        file.size
      ),

    pages:
      document.numPages,

    text,

    wordCount:
      text
        ? text.split(
            /\s+/
          ).length
        : 0,

    characterCount:
      text.length,

    sentenceCount:
      (
        text.match(
          /[.!?]+/g
        ) ?? []
      ).length,

    pageData: pages,

    topTerms:
      topTerms(text),
  };
}

/* =========================================================
   AI USAGE
========================================================= */

function today() {
  return new Date()
    .toISOString()
    .slice(0, 10);
}

function currentAiUsage() {
  if (
    typeof window ===
    "undefined"
  ) {
    return 0;
  }

  try {
    const saved =
      localStorage.getItem(
        "datalens-ai-usage"
      );

    if (!saved) {
      return 0;
    }

    const parsed =
      JSON.parse(saved);

    if (
      parsed.date !==
      today()
    ) {
      return 0;
    }

    return Number(
      parsed.count ?? 0
    );
  } catch {
    return 0;
  }
}

function addAiUsage() {
  const next =
    currentAiUsage() +
    1;

  localStorage.setItem(
    "datalens-ai-usage",
    JSON.stringify({
      date: today(),
      count: next,
    })
  );

  return next;
}

function visitorId() {
  let id =
    localStorage.getItem(
      "datalens-visitor"
    );

  if (!id) {
    id =
      crypto.randomUUID();

    localStorage.setItem(
      "datalens-visitor",
      id
    );
  }

  return id;
}

/* =========================================================
   MAIN
========================================================= */

export default function DataLensPage() {
  const fileRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const [mode, setMode] =
    useState<Mode>(null);

  const [
    datasetSource,
    setDatasetSource,
  ] =
    useState<DatasetSource>(
      "CSV"
    );

  const [rows, setRows] =
    useState<DataRow[]>([]);

  const [
    excelSheets,
    setExcelSheets,
  ] =
    useState<ExcelSheet[]>(
      []
    );

  const [
    selectedSheet,
    setSelectedSheet,
  ] = useState("");

  const [
    suggestedSheet,
    setSuggestedSheet,
  ] = useState("");

  const [
    fileName,
    setFileName,
  ] = useState("");

  const [
    fileSize,
    setFileSize,
  ] = useState("");

  const [
    pdfData,
    setPdfData,
  ] =
    useState<PdfAnalysis | null>(
      null
    );

  const [
    pdfPage,
    setPdfPage,
  ] = useState(1);

  const [
    pdfSearch,
    setPdfSearch,
  ] = useState("");

  const [
    activeTab,
    setActiveTab,
  ] = useState<
    | "overview"
    | "quality"
    | "visualize"
    | "ai"
  >("overview");

  const [
    processing,
    setProcessing,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    aiQuestion,
    setAiQuestion,
  ] = useState("");

  const [
    aiAnswer,
    setAiAnswer,
  ] = useState("");

  const [
    aiError,
    setAiError,
  ] = useState("");

  const [
    aiLoading,
    setAiLoading,
  ] = useState(false);

  const [
    aiUsage,
    setAiUsage,
  ] = useState(0);

  /* =====================================================
     ANALYSIS
  ===================================================== */

  const columns =
    useMemo(
      () =>
        Array.from(
          new Set(
            rows.flatMap(
              (row) =>
                Object.keys(
                  row
                )
            )
          )
        ),
      [rows]
    );

  const duplicates =
    useMemo(
      () =>
        duplicateCount(
          rows
        ),
      [rows]
    );

  const profiles =
    useMemo(
      () =>
        buildProfiles(
          rows,
          columns
        ),
      [rows, columns]
    );

  const issues =
    useMemo(
      () =>
        createIssues(
          rows,
          profiles,
          duplicates
        ),
      [
        rows,
        profiles,
        duplicates,
      ]
    );

  const quality =
    useMemo(
      () =>
        scoreQuality(
          rows,
          profiles,
          duplicates,
          issues
        ),
      [
        rows,
        profiles,
        duplicates,
        issues,
      ]
    );

  const totalMissing =
    profiles.reduce(
      (sum, profile) =>
        sum +
        profile.missing,
      0
    );

  const totalCells =
    rows.length *
    columns.length;

  const missingPercent =
    totalCells
      ? (totalMissing /
          totalCells) *
        100
      : 0;

  /* =====================================================
     RESET AI WHEN FILE CHANGES
  ===================================================== */

  function resetAi() {
    setAiQuestion("");
    setAiAnswer("");
    setAiError("");
    setAiLoading(false);

    setAiUsage(
      currentAiUsage()
    );
  }

  /* =====================================================
     LOAD DATASET
  ===================================================== */

  function loadDataset(
    inputRows:
      DataRow[],
    source:
      DatasetSource,
    name: string,
    size: string
  ) {
    const cleaned =
      removeEmptyColumns(
        inputRows.filter(
          (row) =>
            Object.values(
              row
            ).some(
              (value) =>
                !isMissing(
                  value
                )
            )
        )
      );

    if (
      !cleaned.length
    ) {
      setError(
        "No usable data was found."
      );

      return;
    }

    setRows(cleaned);

    setDatasetSource(
      source
    );

    setMode(
      "dataset"
    );

    setFileName(name);
    setFileSize(size);

    setPdfData(null);

    setActiveTab(
      "overview"
    );

    setError("");

    resetAi();
  }

  /* =====================================================
     FILE HANDLING
  ===================================================== */

  async function handleFile(
    file: File
  ) {
    setError("");
    setProcessing(true);

    /*
      Important:
      fully reset old AI/file state so no previous
      dataset answer appears beside a different file.
    */
    resetAi();

    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase();

    try {
      if (
        extension ===
        "csv"
      ) {
        Papa.parse<
          Record<
            string,
            unknown
          >
        >(file, {
          header: true,
          skipEmptyLines:
            true,

          complete:
            (result) => {
              setExcelSheets(
                []
              );

              setSelectedSheet(
                ""
              );

              setSuggestedSheet(
                ""
              );

              loadDataset(
                result.data.map(
                  normalizeRow
                ),
                "CSV",
                file.name,
                formatFileSize(
                  file.size
                )
              );

              setProcessing(
                false
              );
            },

          error: () => {
            setError(
              "Unable to parse CSV."
            );

            setProcessing(
              false
            );
          },
        });

        return;
      }

      if (
        extension ===
          "xlsx" ||
        extension ===
          "xls"
      ) {
        const workbook =
          XLSX.read(
            await file.arrayBuffer(),
            {
              type: "array",
            }
          );

        const sheets =
          workbookSheets(
            workbook
          );

        const suggested =
          [...sheets].sort(
            (a, b) =>
              b.score -
              a.score
          )[0];

        if (!suggested) {
          throw new Error(
            "No worksheet found."
          );
        }

        setExcelSheets(
          sheets
        );

        setSuggestedSheet(
          suggested.name
        );

        setSelectedSheet(
          suggested.name
        );

        loadDataset(
          suggested.rows,
          "Excel",
          file.name,
          formatFileSize(
            file.size
          )
        );

        return;
      }

      if (
        extension ===
        "pdf"
      ) {
        const result =
          await readPdf(
            file
          );

        if (
          !result.text.trim()
        ) {
          throw new Error(
            "No selectable PDF text found."
          );
        }

        setPdfData(
          result
        );

        setRows([]);

        setExcelSheets(
          []
        );

        setMode("pdf");

        setFileName(
          result.fileName
        );

        setFileSize(
          result.fileSize
        );

        setPdfPage(1);
        setPdfSearch("");

        resetAi();

        return;
      }

      setError(
        "Supported files: CSV, XLSX, XLS and PDF."
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof
          Error
          ? err.message
          : "Unable to analyze this file."
      );
    } finally {
      setProcessing(
        false
      );
    }
  }

  function switchSheet(
    name: string
  ) {
    const sheet =
      excelSheets.find(
        (sheet) =>
          sheet.name ===
          name
      );

    if (!sheet) {
      return;
    }

    setSelectedSheet(
      name
    );

    setRows(
      sheet.rows
    );

    setActiveTab(
      "overview"
    );

    resetAi();
  }

  function clearEverything() {
    setMode(null);

    setRows([]);

    setExcelSheets([]);

    setSelectedSheet(
      ""
    );

    setSuggestedSheet(
      ""
    );

    setPdfData(null);

    setFileName("");
    setFileSize("");

    setPdfSearch("");

    setError("");

    resetAi();
  }

  /* =====================================================
     AI CONTEXT — IMPORTANT CHANGE
  ===================================================== */

  function datasetAiContext() {
    /*
      We intentionally give AI enough context to infer
      likely business meaning without sending the entire file.
    */

    const categoricalExamples =
      profiles
        .filter(
          (profile) =>
            profile.type ===
              "Text" &&
            profile.unique <=
              20
        )
        .slice(0, 12)
        .map(
          (profile) => ({
            column:
              profile.name,

            sampleValues:
              Array.from(
                new Set(
                  rows
                    .map(
                      (row) =>
                        row[
                          profile.name
                        ]
                    )
                    .filter(
                      (value) =>
                        !isMissing(
                          value
                        )
                    )
                    .map(
                      (value) =>
                        String(
                          value
                        )
                    )
                )
              ).slice(
                0,
                10
              ),
          })
        );

    return {
      file: {
        name:
          fileName,

        type:
          datasetSource,

        worksheet:
          datasetSource ===
          "Excel"
            ? selectedSheet
            : null,
      },

      shape: {
        rows:
          rows.length,

        columns:
          columns.length,
      },

      /*
        This helps AI infer what the dataset represents.
      */
      schema:
        columns,

      qualityScore:
        quality.overall,

      qualityDimensions:
        quality,

      columns:
        profiles.map(
          (profile) => ({
            name:
              profile.name,

            type:
              profile.type,

            missingCount:
              profile.missing,

            missingPercent:
              Number(
                profile.missingPercent.toFixed(
                  2
                )
              ),

            uniqueCount:
              profile.unique,

            invalidCount:
              profile.invalidCount,

            min:
              profile.min,

            max:
              profile.max,

            mean:
              profile.mean,

            median:
              profile.median,

            negativeCount:
              profile.negativeCount,

            outlierCount:
              profile.outlierCount,
          })
        ),

      categoryExamples:
        categoricalExamples,

      detectedIssues:
        issues.map(
          (issue) => ({
            severity:
              issue.severity,

            column:
              issue.column,

            type:
              issue.kind,

            title:
              issue.title,

            description:
              issue.description,
          })
        ),

      /*
        Slightly larger sample so it can understand
        relationships between fields.
      */
      sampleRows:
        rows.slice(
          0,
          8
        ),
    };
  }

  function pdfAiContext(
    question: string
  ) {
    if (!pdfData) {
      return {};
    }

    const importantWords =
      question
        .toLowerCase()
        .split(/\W+/)
        .filter(
          (word) =>
            word.length >=
            4
        );

    const matching =
      pdfData.pageData.filter(
        (page) =>
          importantWords.some(
            (word) =>
              page.text
                .toLowerCase()
                .includes(
                  word
                )
          )
      );

    /*
      Broad questions:
      provide a larger multi-page document view.

      Specific questions:
      prioritize matching pages.
    */
    const selectedPages =
      matching.length
        ? matching.slice(
            0,
            6
          )
        : pdfData.pageData.slice(
            0,
            7
          );

    return {
      file: {
        name:
          pdfData.fileName,

        pages:
          pdfData.pages,

        words:
          pdfData.wordCount,
      },

      topTerms:
        pdfData.topTerms,

      documentText:
        selectedPages
          .map(
            (page) =>
              `PAGE ${page.page}\n${page.text}`
          )
          .join(
            "\n\n"
          )
          .slice(
            0,
            16000
          ),
    };
  }

  /* =====================================================
     AI
  ===================================================== */

  async function askAi(
    action: AiAction
  ) {
    setAiError("");

    const usage =
      currentAiUsage();

    setAiUsage(
      usage
    );

    if (
      usage >=
      DAILY_AI_LIMIT
    ) {
      setAiError(
        `Daily AI demo limit reached (${DAILY_AI_LIMIT}/${DAILY_AI_LIMIT}).`
      );

      return;
    }

    let question =
      aiQuestion.trim();

    if (
      action ===
      "dataset-overview"
    ) {
      question =
        "What is this dataset about?";
    }

    if (
      action ===
      "explain-score"
    ) {
      question =
        "Explain the dataset and its data quality score.";
    }

    if (
      action ===
      "prioritize"
    ) {
      question =
        "What should I fix first in this dataset?";
    }

    if (
      action === "sql"
    ) {
      question =
        "Generate SQL cleanup code for the detected issues.";
    }

    if (
      action === "python"
    ) {
      question =
        "Generate Python pandas cleanup code for the detected issues.";
    }

    if (
      action ===
      "summary"
    ) {
      question =
        "Summarize this document.";
    }

    if (
      action ===
      "document-skills"
    ) {
      question =
        "Extract the main skills from this document.";
    }

    if (
      action ===
      "document-dates"
    ) {
      question =
        "Find important dates in this document.";
    }

    if (
      action ===
      "document-actions"
    ) {
      question =
        "Find action items in this document.";
    }

    if (
      !question
    ) {
      setAiError(
        "Enter a question."
      );

      return;
    }

    setAiLoading(
      true
    );

    setAiAnswer("");

    try {
      const context =
        mode === "pdf"
          ? pdfAiContext(
              question
            )
          : datasetAiContext();

      const response =
        await fetch(
          "/api/data-analyzer",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",

              "x-datalens-visitor":
                visitorId(),
            },

            body:
              JSON.stringify({
                mode:
                  mode ===
                  "pdf"
                    ? "pdf"
                    : "dataset",

                action,

                question,

                context,
              }),
          }
        );

      const result =
        await response.json();

      if (
        !response.ok
      ) {
        throw new Error(
          result.error ||
            "AI request failed."
        );
      }

      setAiAnswer(
        result.answer
      );

      setAiUsage(
        addAiUsage()
      );
    } catch (err) {
      setAiError(
        err instanceof
          Error
          ? err.message
          : "Unable to complete the AI request."
      );
    } finally {
      setAiLoading(
        false
      );
    }
  }

  /* =====================================================
     PDF SEARCH
  ===================================================== */

  const pdfMatches =
    useMemo(() => {
      if (
        !pdfData ||
        !pdfSearch.trim()
      ) {
        return [];
      }

      const query =
        pdfSearch
          .trim()
          .toLowerCase();

      return pdfData.pageData.filter(
        (page) =>
          page.text
            .toLowerCase()
            .includes(
              query
            )
      );
    }, [
      pdfData,
      pdfSearch,
    ]);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-sm text-gray-300 hover:text-cyan-300"
          >
            ← Abhilash
            Portfolio
          </a>

          <a
            href="/#projects"
            className="text-sm text-cyan-300"
          >
            Projects
          </a>
        </div>
      </nav>

      <section className="px-6 pb-12 pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Interactive Data
            & Document
            Intelligence
          </div>

          <h1 className="mt-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            AbhI Analyst
          </h1>

          <p className="mt-4 text-xl text-gray-200">
            Analyze.
            Validate.
            Visualize. Ask.
          </p>

          <p className="mt-6 max-w-4xl leading-8 text-gray-400">
            Upload CSV,
            Excel or PDF
            files to understand
            what the data
            represents, detect
            quality problems,
            visualize patterns
            and ask AI for
            explanations or
            remediation code.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "CSV Analysis",
              "Excel Multi-Sheet",
              "PDF Analysis",
              "Data Profiling",
              "Quality Scoring",
              "Anomaly Detection",
              "Visualization",
              "Document Search",
              "Ask AI",
              "SQL Cleanup",
              "Python Cleanup",
            ].map(
              (item) => (
                <span
                  key={
                    item
                  }
                  className="rounded-full border border-blue-400/20 bg-blue-500/5 px-3 py-1.5 text-xs text-blue-300"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">

          {/* =================================================
              INITIAL SCREEN
          ================================================= */}

          {!mode && (
            <>
              <div className="rounded-3xl border-2 border-dashed border-blue-400/30 bg-slate-900/40 p-12 text-center">
                <div className="text-4xl">
                  ↑
                </div>

                <h2 className="mt-5 text-2xl font-bold">
                  Upload your
                  file
                </h2>

                <p className="mt-3 text-gray-400">
                  CSV, Excel
                  (.xlsx/.xls)
                  or text-based
                  PDF
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      fileRef.current?.click()
                    }
                    disabled={
                      processing
                    }
                    className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold disabled:opacity-50"
                  >
                    {processing
                      ? "Analyzing..."
                      : "Choose File"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      loadDataset(
                        SAMPLE_DATA,
                        "CSV",
                        "sample-ecommerce-data.csv",
                        "Demo dataset"
                      )
                    }
                    className="rounded-xl border border-blue-400/30 px-6 py-3 text-blue-300"
                  >
                    Try Sample
                    Dataset
                  </button>
                </div>
              </div>
            </>
          )}

          <input
            ref={fileRef}
            type="file"
            accept=".csv,.xlsx,.xls,.pdf"
            className="hidden"
            onChange={(
              event
            ) => {
              const file =
                event.target
                  .files?.[0];

              if (file) {
                void handleFile(
                  file
                );
              }

              event.target.value =
                "";
            }}
          />

          {error && (
            <ErrorBox
              text={error}
            />
          )}

          {/* =================================================
              DATASET
          ================================================= */}

          {mode ===
            "dataset" && (
            <>
              <FileHeader
                title={`${datasetSource} Dataset Loaded`}
                name={
                  fileName
                }
                size={
                  fileSize
                }
                onAnother={() =>
                  fileRef.current?.click()
                }
                onClear={
                  clearEverything
                }
              />

              {datasetSource ===
                "Excel" &&
                excelSheets.length >
                  0 && (
                  <div className="mt-5 rounded-2xl border border-blue-400/15 bg-slate-900/40 p-5">
                    <div className="text-xs uppercase tracking-[0.15em] text-cyan-300">
                      Worksheet
                    </div>

                    <select
                      value={
                        selectedSheet
                      }
                      onChange={(
                        event
                      ) =>
                        switchSheet(
                          event
                            .target
                            .value
                        )
                      }
                      className="mt-3 w-full max-w-md rounded-xl border border-blue-400/20 bg-slate-950 px-4 py-3"
                    >
                      {excelSheets.map(
                        (
                          sheet
                        ) => (
                          <option
                            key={
                              sheet.name
                            }
                            value={
                              sheet.name
                            }
                          >
                            {
                              sheet.name
                            }
                            {sheet.name ===
                            suggestedSheet
                              ? " — Suggested"
                              : ""}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}

              <QualityHeader
                quality={
                  quality
                }
                rows={
                  rows.length
                }
                columns={
                  columns.length
                }
                missingPercent={
                  missingPercent
                }
                totalMissing={
                  totalMissing
                }
                duplicates={
                  duplicates
                }
                issueCount={
                  issues.length
                }
              />

              <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
                {[
                  [
                    "overview",
                    "Overview",
                  ],
                  [
                    "quality",
                    `Data Quality (${issues.length})`,
                  ],
                  [
                    "visualize",
                    "Visualize",
                  ],
                  [
                    "ai",
                    "Ask AI ✨",
                  ],
                ].map(
                  ([
                    id,
                    label,
                  ]) => (
                    <button
                      key={
                        id
                      }
                      onClick={() =>
                        setActiveTab(
                          id as typeof activeTab
                        )
                      }
                      className={`rounded-xl px-4 py-2 text-sm ${
                        activeTab ===
                        id
                          ? "bg-cyan-500/15 text-cyan-300"
                          : "text-gray-400"
                      }`}
                    >
                      {
                        label
                      }
                    </button>
                  )
                )}
              </div>

              {activeTab ===
                "overview" && (
                <Overview
                  rows={
                    rows
                  }
                  columns={
                    columns
                  }
                  profiles={
                    profiles
                  }
                />
              )}

              {activeTab ===
                "quality" && (
                <Issues
                  issues={
                    issues
                  }
                />
              )}

              {activeTab ===
                "visualize" && (
                <DataVisuals
                  rows={
                    rows
                  }
                  profiles={
                    profiles
                  }
                  quality={
                    quality
                  }
                />
              )}

              {activeTab ===
                "ai" && (
                <AiPanel
                  mode="dataset"
                  question={
                    aiQuestion
                  }
                  setQuestion={
                    setAiQuestion
                  }
                  answer={
                    aiAnswer
                  }
                  error={
                    aiError
                  }
                  loading={
                    aiLoading
                  }
                  usage={
                    aiUsage
                  }
                  ask={askAi}
                />
              )}

              <Privacy />
            </>
          )}

          {/* =================================================
              PDF
          ================================================= */}

          {mode === "pdf" &&
            pdfData && (
              <>
                <FileHeader
                  title="PDF Document Loaded"
                  name={
                    pdfData.fileName
                  }
                  size={
                    pdfData.fileSize
                  }
                  onAnother={() =>
                    fileRef.current?.click()
                  }
                  onClear={
                    clearEverything
                  }
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Metric
                    label="Pages"
                    value={String(
                      pdfData.pages
                    )}
                  />

                  <Metric
                    label="Words"
                    value={formatNumber(
                      pdfData.wordCount
                    )}
                  />

                  <Metric
                    label="Characters"
                    value={formatNumber(
                      pdfData.characterCount
                    )}
                  />

                  <Metric
                    label="Sentences"
                    value={formatNumber(
                      pdfData.sentenceCount
                    )}
                  />
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  <ChartCard
                    title="Document Density"
                    subtitle="Words extracted from each page."
                  >
                    <ResponsiveContainer
                      width="100%"
                      height={300}
                    >
                      <BarChart
                        data={
                          pdfData.pageData
                        }
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(148,163,184,.12)"
                        />

                        <XAxis
                          dataKey="page"
                          tick={
                            chartTick
                          }
                        />

                        <YAxis
                          tick={
                            chartTick
                          }
                        />

                        <Tooltip
                          contentStyle={
                            tooltipStyle
                          }
                        />

                        <Bar
                          dataKey="words"
                          fill="#22d3ee"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>

                  <ChartCard
                    title="Top Terms"
                    subtitle="Frequently occurring meaningful document terms."
                  >
                    <ResponsiveContainer
                      width="100%"
                      height={300}
                    >
                      <BarChart
                        data={
                          pdfData.topTerms
                        }
                        layout="vertical"
                      >
                        <XAxis
                          type="number"
                          tick={
                            chartTick
                          }
                        />

                        <YAxis
                          type="category"
                          dataKey="term"
                          width={90}
                          tick={
                            chartTick
                          }
                        />

                        <Tooltip
                          contentStyle={
                            tooltipStyle
                          }
                        />

                        <Bar
                          dataKey="count"
                          fill="#22d3ee"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>

                <div className="mt-8 rounded-2xl border border-blue-400/15 bg-slate-900/40 p-6">
                  <h2 className="text-xl font-bold">
                    Search This
                    PDF
                  </h2>

                  <input
                    value={
                      pdfSearch
                    }
                    onChange={(
                      event
                    ) =>
                      setPdfSearch(
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="Search..."
                    className="mt-4 w-full rounded-xl border border-blue-400/20 bg-slate-950 px-4 py-3"
                  />

                  {pdfSearch &&
                    pdfMatches.length >
                      0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {pdfMatches.map(
                          (
                            result
                          ) => (
                            <button
                              key={
                                result.page
                              }
                              onClick={() =>
                                setPdfPage(
                                  result.page
                                )
                              }
                              className="rounded-lg border border-cyan-400/20 px-3 py-2 text-sm text-cyan-300"
                            >
                              Page{" "}
                              {
                                result.page
                              }
                            </button>
                          )
                        )}
                      </div>
                    )}
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">
                  <div className="rounded-2xl border border-blue-400/15 bg-slate-900/40 p-4">
                    <h3 className="font-semibold">
                      Pages
                    </h3>

                    <div className="mt-4 space-y-2">
                      {pdfData.pageData.map(
                        (page) => (
                          <button
                            key={
                              page.page
                            }
                            onClick={() =>
                              setPdfPage(
                                page.page
                              )
                            }
                            className={`w-full rounded-lg border p-3 text-left ${
                              pdfPage ===
                              page.page
                                ? "border-cyan-400/40 bg-cyan-500/10"
                                : "border-white/10"
                            }`}
                          >
                            Page{" "}
                            {
                              page.page
                            }

                            <div className="text-xs text-gray-500">
                              {
                                page.words
                              }{" "}
                              words
                            </div>
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-blue-400/15 bg-slate-900/40 p-6">
                    <h3 className="text-xl font-bold">
                      Extracted
                      Text —
                      Page{" "}
                      {pdfPage}
                    </h3>

                    <div className="mt-5 max-h-[520px] overflow-y-auto rounded-xl bg-slate-950/60 p-5 text-sm leading-7 text-gray-300">
                      {
                        pdfData.pageData.find(
                          (page) =>
                            page.page ===
                            pdfPage
                        )?.text
                      }
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <AiPanel
                    mode="pdf"
                    question={
                      aiQuestion
                    }
                    setQuestion={
                      setAiQuestion
                    }
                    answer={
                      aiAnswer
                    }
                    error={
                      aiError
                    }
                    loading={
                      aiLoading
                    }
                    usage={
                      aiUsage
                    }
                    ask={askAi}
                  />
                </div>

                <Privacy />
              </>
            )}
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   AI PANEL
========================================================= */

function AiPanel({
  mode,
  question,
  setQuestion,
  answer,
  error,
  loading,
  usage,
  ask,
}: {
  mode:
    | "dataset"
    | "pdf";

  question: string;

  setQuestion:
    (value: string) => void;

  answer: string;

  error: string;

  loading: boolean;

  usage: number;

  ask:
    (
      action: AiAction
    ) => Promise<void>;
}) {
  const datasetActions: {
    label: string;
    action: AiAction;
  }[] = [
    {
      label:
        "What Is This Dataset?",
      action:
        "dataset-overview",
    },

    {
      label:
        "Explain Quality Score",
      action:
        "explain-score",
    },

    {
      label:
        "What Should I Fix First?",
      action:
        "prioritize",
    },

    {
      label:
        "Generate SQL Fix",
      action: "sql",
    },

    {
      label:
        "Generate Python Fix",
      action:
        "python",
    },
  ];

  const pdfActions: {
    label: string;
    action: AiAction;
  }[] = [
    {
      label:
        "Summarize Document",
      action:
        "summary",
    },

    {
      label:
        "Extract Skills",
      action:
        "document-skills",
    },

    {
      label:
        "Find Important Dates",
      action:
        "document-dates",
    },

    {
      label:
        "Extract Actions",
      action:
        "document-actions",
    },
  ];

  const actions =
    mode ===
    "dataset"
      ? datasetActions
      : pdfActions;

  return (
    <div className="rounded-3xl border border-purple-400/20 bg-purple-500/5 p-7">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-purple-300">
            AbhI Analyst
          </div>

          <h2 className="mt-2 text-2xl font-bold">
            Ask AbhI Analyst
            AI
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
            {mode ===
            "dataset"
              ? "DataLens can infer the likely business purpose from the schema and samples, explain quality issues, and generate remediation code."
              : "Ask questions about the extracted PDF content."}
          </p>
        </div>

        <div className="rounded-xl border border-purple-400/20 px-4 py-3 text-sm">
          Daily usage
          <div className="mt-1 font-bold text-purple-300">
            {usage}/
            {
              DAILY_AI_LIMIT
            }
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {actions.map(
          (item) => (
            <button
              key={
                item.label
              }
              type="button"
              disabled={
                loading
              }
              onClick={() =>
                void ask(
                  item.action
                )
              }
              className="rounded-xl border border-purple-400/25 bg-purple-500/5 px-4 py-2 text-sm text-purple-200 transition hover:bg-purple-500/10 disabled:opacity-50"
            >
              {
                item.label
              }
            </button>
          )
        )}
      </div>

      <textarea
        rows={4}
        maxLength={1500}
        value={
          question
        }
        onChange={(
          event
        ) =>
          setQuestion(
            event.target
              .value
          )
        }
        placeholder={
          mode ===
          "dataset"
            ? "Example: What is this dataset about and what insights could I build from it?"
            : "Example: What experience does this person have with Microsoft Fabric?"
        }
        className="mt-6 w-full rounded-xl border border-purple-400/20 bg-slate-950 p-4 text-sm outline-none"
      />

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          disabled={
            loading ||
            !question.trim()
          }
          onClick={() =>
            void ask(
              "custom"
            )
          }
          className="rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
        >
          {loading
            ? "Analyzing..."
            : "Ask AbhI Analyst"}
        </button>
      </div>

      {error && (
        <ErrorBox
          text={error}
        />
      )}

      {answer && (
        <div className="mt-6 rounded-2xl border border-purple-400/20 bg-slate-950/70 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-300">
            DataLens AI
          </div>

          <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-gray-300">
            {answer}
          </div>
        </div>
      )}

      <div className="mt-5 rounded-xl border border-amber-400/15 bg-amber-500/5 p-4 text-xs leading-6 text-amber-200/80">
        AI-generated
        interpretations and
        remediation code
        should be reviewed
        before production use.
      </div>
    </div>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function Overview({
  rows,
  columns,
  profiles,
}: {
  rows: DataRow[];

  columns: string[];

  profiles:
    ColumnProfile[];
}) {
  return (
    <div className="mt-8 space-y-10">
      <div>
        <h2 className="text-2xl font-bold">
          Column
          Profiling
        </h2>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-blue-400/15">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-900 text-gray-400">
              <tr>
                <th className="px-5 py-4">
                  Column
                </th>

                <th className="px-5 py-4">
                  Type
                </th>

                <th className="px-5 py-4">
                  Missing
                </th>

                <th className="px-5 py-4">
                  Invalid
                </th>

                <th className="px-5 py-4">
                  Unique
                </th>

                <th className="px-5 py-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {profiles.map(
                (profile) => (
                  <tr
                    key={
                      profile.name
                    }
                    className="border-t border-white/5"
                  >
                    <td className="px-5 py-4 font-medium">
                      {
                        profile.name
                      }
                    </td>

                    <td className="px-5 py-4 text-cyan-300">
                      {
                        profile.type
                      }
                    </td>

                    <td className="px-5 py-4">
                      {
                        profile.missing
                      }{" "}
                      (
                      {profile.missingPercent.toFixed(
                        1
                      )}
                      %)
                    </td>

                    <td className="px-5 py-4">
                      {
                        profile.invalidCount
                      }
                    </td>

                    <td className="px-5 py-4">
                      {
                        profile.unique
                      }
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs ${severityClass(
                          profile.severity
                        )}`}
                      >
                        {
                          profile.severity
                        }
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold">
          Data Preview
        </h2>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-blue-400/15">
          <table className="w-full min-w-max text-left text-sm">
            <thead className="bg-slate-900">
              <tr>
                {columns.map(
                  (column) => (
                    <th
                      key={
                        column
                      }
                      className="px-4 py-4 text-gray-400"
                    >
                      {
                        column
                      }
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {rows
                .slice(0, 10)
                .map(
                  (
                    row,
                    index
                  ) => (
                    <tr
                      key={
                        index
                      }
                      className="border-t border-white/5"
                    >
                      {columns.map(
                        (
                          column
                        ) => (
                          <td
                            key={
                              column
                            }
                            className="max-w-[240px] truncate px-4 py-3 text-gray-300"
                          >
                            {isMissing(
                              row[
                                column
                              ]
                            )
                              ? "NULL"
                              : String(
                                  row[
                                    column
                                  ]
                                )}
                          </td>
                        )
                      )}
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ISSUES
========================================================= */

function Issues({
  issues,
}: {
  issues:
    QualityIssue[];
}) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">
        Detected Quality
        Issues
      </h2>

      {issues.length ===
      0 ? (
        <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-6 text-emerald-300">
          ✓ No major
          issues detected.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {issues.map(
            (issue) => (
              <div
                key={
                  issue.id
                }
                className="rounded-2xl border border-blue-400/15 bg-slate-900/40 p-6"
              >
                <span
                  className={`rounded-full border px-3 py-1 text-xs ${severityClass(
                    issue.severity
                  )}`}
                >
                  {
                    issue.severity
                  }
                </span>

                <h3 className="mt-4 font-semibold">
                  {
                    issue.title
                  }
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {
                    issue.description
                  }
                </p>

                <div className="mt-4 rounded-xl border border-cyan-400/15 bg-cyan-500/5 p-4 text-sm text-gray-300">
                  {
                    issue.recommendation
                  }
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   DATA VISUALIZATIONS
========================================================= */

function DataVisuals({
  rows,
  profiles,
  quality,
}: {
  rows: DataRow[];

  profiles:
    ColumnProfile[];

  quality:
    QualityDimensions;
}) {
  const qualityData = [
    {
      name:
        "Completeness",
      value:
        quality.completeness,
    },
    {
      name:
        "Uniqueness",
      value:
        quality.uniqueness,
    },
    {
      name:
        "Validity",
      value:
        quality.validity,
    },
    {
      name:
        "Consistency",
      value:
        quality.consistency,
    },
    {
      name:
        "Anomaly",
      value:
        quality.anomalyHealth,
    },
  ];

  const missingData =
    profiles
      .filter(
        (profile) =>
          profile.missing >
          0
      )
      .map(
        (profile) => ({
          name:
            profile.name,

          value:
            Number(
              profile.missingPercent.toFixed(
                1
              )
            ),
        })
      );

  const numbers =
    profiles.filter(
      (profile) =>
        profile.type ===
        "Number"
    );

  const scatterData =
    numbers.length >= 2
      ? rows
          .filter(
            (row) =>
              isNumeric(
                row[
                  numbers[0]
                    .name
                ]
              ) &&
              isNumeric(
                row[
                  numbers[1]
                    .name
                ]
              )
          )
          .slice(
            0,
            300
          )
          .map(
            (row) => ({
              x: toNumber(
                row[
                  numbers[0]
                    .name
                ]
              ),

              y: toNumber(
                row[
                  numbers[1]
                    .name
                ]
              ),
            })
          )
      : [];

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <ChartCard
        title="Quality Dimensions"
        subtitle="Quality score components."
      >
        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart
            data={
              qualityData
            }
            layout="vertical"
          >
            <XAxis
              type="number"
              domain={[
                0,
                100,
              ]}
              tick={
                chartTick
              }
            />

            <YAxis
              type="category"
              dataKey="name"
              width={100}
              tick={
                chartTick
              }
            />

            <Tooltip
              contentStyle={
                tooltipStyle
              }
            />

            <Bar
              dataKey="value"
              fill="#22d3ee"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Missing Values"
        subtitle="Missing percentage by affected column."
      >
        {missingData.length ? (
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={
                missingData
              }
            >
              <XAxis
                dataKey="name"
                tick={
                  chartTick
                }
              />

              <YAxis
                tick={
                  chartTick
                }
              />

              <Tooltip
                contentStyle={
                  tooltipStyle
                }
              />

              <Bar
                dataKey="value"
                fill="#22d3ee"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[300px] items-center justify-center text-emerald-300">
            ✓ No missing
            values
          </div>
        )}
      </ChartCard>

      {scatterData.length >
        0 && (
        <ChartCard
          title={`${numbers[0].name} vs ${numbers[1].name}`}
          subtitle="Relationship between detected numeric variables."
        >
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <ScatterChart>
              <XAxis
                type="number"
                dataKey="x"
                tick={
                  chartTick
                }
              />

              <YAxis
                type="number"
                dataKey="y"
                tick={
                  chartTick
                }
              />

              <Tooltip
                contentStyle={
                  tooltipStyle
                }
              />

              <Scatter
                data={
                  scatterData
                }
                fill="#22d3ee"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
      )}
    </div>
  );
}

/* =========================================================
   GENERIC COMPONENTS
========================================================= */

function QualityHeader({
  quality,
  rows,
  columns,
  missingPercent,
  totalMissing,
  duplicates,
  issueCount,
}: {
  quality:
    QualityDimensions;

  rows: number;
  columns: number;

  missingPercent:
    number;

  totalMissing:
    number;

  duplicates:
    number;

  issueCount:
    number;
}) {
  const label =
    quality.overall >=
    90
      ? "Excellent"
      : quality.overall >=
        80
      ? "Good"
      : quality.overall >=
        70
      ? "Needs Attention"
      : "High Risk";

  return (
    <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-cyan-500/5 p-7">
      <div className="grid gap-8 xl:grid-cols-[300px_1fr] xl:items-center">
        <QualityGauge
          score={
            quality.overall
          }
          label={label}
        />

        <div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric
              label="Rows"
              value={String(
                rows
              )}
            />

            <Metric
              label="Columns"
              value={String(
                columns
              )}
            />

            <Metric
              label="Missing"
              value={`${missingPercent.toFixed(
                1
              )}%`}
              helper={`${totalMissing} cells`}
            />

            <Metric
              label="Duplicates"
              value={String(
                duplicates
              )}
              helper={`${issueCount} issues`}
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              [
                "Completeness",
                quality.completeness,
              ],

              [
                "Uniqueness",
                quality.uniqueness,
              ],

              [
                "Validity",
                quality.validity,
              ],

              [
                "Consistency",
                quality.consistency,
              ],

              [
                "Anomaly Health",
                quality.anomalyHealth,
              ],
            ].map(
              ([
                name,
                value,
              ]) => (
                <div
                  key={
                    String(
                      name
                    )
                  }
                  className="rounded-xl border border-white/10 p-3"
                >
                  <div className="text-xs text-gray-500">
                    {name}
                  </div>

                  <div className="mt-1 font-bold">
                    {value}%
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QualityGauge({
  score,
  label,
}: {
  score: number;
  label: string;
}) {
  const radius = 90;

  const total =
    Math.PI * radius;

  const progress =
    (score / 100) *
    total;

  const color =
    score >= 90
      ? "#34d399"
      : score >= 80
      ? "#22d3ee"
      : score >= 70
      ? "#fbbf24"
      : "#f87171";

  return (
    <div className="text-center">
      <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">
        Data Quality
        Score
      </div>

      <div className="relative mx-auto h-[160px] w-[240px]">
        <svg
          viewBox="0 0 220 130"
          className="h-full w-full"
        >
          <path
            d="M20 110 A90 90 0 0 1 200 110"
            fill="none"
            stroke="rgba(148,163,184,.15)"
            strokeWidth="18"
            strokeLinecap="round"
          />

          <path
            d="M20 110 A90 90 0 0 1 200 110"
            fill="none"
            stroke={
              color
            }
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={`${progress} ${total}`}
          />
        </svg>

        <div className="absolute inset-x-0 bottom-0 text-5xl font-bold">
          {score}
          <span className="text-xl text-gray-500">
            /100
          </span>
        </div>
      </div>

      <div className="mt-3 font-semibold">
        {label}
      </div>
    </div>
  );
}

function FileHeader({
  title,
  name,
  size,
  onAnother,
  onClear,
}: {
  title: string;
  name: string;
  size: string;

  onAnother:
    () => void;

  onClear:
    () => void;
}) {
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-blue-400/20 bg-slate-900/40 p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">
          {title}
        </div>

        <h2 className="mt-2 text-xl font-bold">
          {name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {size}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={
            onAnother
          }
          className="rounded-xl border border-blue-400/30 px-4 py-2 text-sm text-blue-300"
        >
          Analyze Another
          File
        </button>

        <button
          type="button"
          onClick={
            onClear
          }
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-400"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <div className="rounded-2xl border border-blue-400/15 bg-slate-950/40 p-5">
      <div className="text-xs uppercase tracking-[0.15em] text-gray-500">
        {label}
      </div>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>

      {helper && (
        <div className="mt-1 text-xs text-gray-500">
          {helper}
        </div>
      )}
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;

  children:
    React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-blue-400/15 bg-slate-900/40 p-6">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {subtitle}
      </p>

      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}

function Privacy() {
  return (
    <div className="mt-10 rounded-2xl border border-emerald-400/15 bg-emerald-500/5 p-5">
      <h3 className="font-semibold text-emerald-300">
        🔒 Privacy &
        Processing
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-400">
        File parsing,
        profiling, scoring
        and visualization
        run in the browser.
        When you explicitly
        use an AI feature,
        DataLens sends a
        limited profile,
        small dataset sample,
        or relevant document
        excerpt to the
        server-side AI API.
      </p>
    </div>
  );
}

function ErrorBox({
  text,
}: {
  text: string;
}) {
  return (
    <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-300">
      {text}
    </div>
  );
}

function severityClass(
  severity: Severity
) {
  if (
    severity === "High"
  ) {
    return "border-red-400/30 bg-red-500/10 text-red-300";
  }

  if (
    severity ===
    "Medium"
  ) {
    return "border-amber-400/30 bg-amber-500/10 text-amber-300";
  }

  if (
    severity === "Low"
  ) {
    return "border-blue-400/30 bg-blue-500/10 text-blue-300";
  }

  return "border-emerald-400/30 bg-emerald-500/10 text-emerald-300";
}

const chartTick = {
  fill: "#94a3b8",
  fontSize: 11,
};

const tooltipStyle = {
  backgroundColor:
    "#0f172a",

  border:
    "1px solid rgba(34,211,238,.25)",

  borderRadius:
    "12px",

  color: "#fff",
};