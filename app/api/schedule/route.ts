import { google } from "googleapis";
import { NextResponse } from "next/server";
import crypto from "crypto";

const OWNER_EMAIL =
  "abhilashjoga1028@gmail.com";

function isWeekend(
  date: Date,
  timeZone: string
) {
  const dayName =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone,
        weekday: "short",
      }
    ).format(date);

  return (
    dayName === "Sat" ||
    dayName === "Sun"
  );
}

function getLocalHourMinute(
  date: Date,
  timeZone: string
) {
  const parts =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    ).formatToParts(date);

  const hour =
    Number(
      parts.find(
        (part) =>
          part.type === "hour"
      )?.value || 0
    );

  const minute =
    Number(
      parts.find(
        (part) =>
          part.type ===
          "minute"
      )?.value || 0
    );

  return {
    hour,
    minute,
  };
}

function formatMeetingDate(
  date: Date,
  timeZone: string
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone,

      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",

      hour: "numeric",
      minute: "2-digit",
      hour12: true,

      timeZoneName: "short",
    }
  ).format(date);
}

/*
  Gmail API expects the complete RFC 2822 email
  encoded using URL-safe Base64.
*/
function createEmailRaw({
  to,
  from,
  subject,
  html,
}: {
  to: string;
  from: string;
  subject: string;
  html: string;
}) {
  const message = [
    `From: Abhilash Portfolio <${from}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "",
    html,
  ].join("\r\n");

  return Buffer.from(
    message
  )
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sendBookingNotification({
  oauth2Client,
  name,
  email,
  company,
  reason,
  startDate,
  timeZone,
  meetLink,
  calendarLink,
}: {
  oauth2Client: InstanceType<
    typeof google.auth.OAuth2
  >;

  name: string;
  email: string;

  company?: string;
  reason?: string;

  startDate: Date;
  timeZone: string;

  meetLink: string | null;
  calendarLink:
    | string
    | null
    | undefined;
}) {
  const gmail =
    google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

  const meetingTime =
    formatMeetingDate(
      startDate,
      timeZone
    );

  const safeCompany =
    company?.trim() ||
    "Not provided";

  const safeReason =
    reason?.trim() ||
    "Not provided";

  const subject =
    `New Portfolio Meeting Booked — ${name}`;

  const html = `
    <div
      style="
        font-family:
          Arial,
          Helvetica,
          sans-serif;
        max-width: 640px;
        margin: 0 auto;
        color: #111827;
        line-height: 1.6;
      "
    >
      <div
        style="
          background: #0f172a;
          padding: 24px;
          border-radius: 16px 16px 0 0;
        "
      >
        <div
          style="
            color: #67e8f9;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 700;
          "
        >
          ABHILASH PORTFOLIO
        </div>

        <h1
          style="
            margin: 8px 0 0;
            color: white;
            font-size: 24px;
          "
        >
          New Meeting Booked
        </h1>
      </div>

      <div
        style="
          border:
            1px solid #e5e7eb;
          border-top: 0;
          padding: 26px;
          border-radius:
            0 0 16px 16px;
          background: white;
        "
      >
        <p
          style="
            margin-top: 0;
            font-size: 16px;
          "
        >
          Someone just scheduled a meeting through your portfolio.
        </p>

        <table
          style="
            width: 100%;
            border-collapse:
              collapse;
            margin-top: 20px;
          "
        >
          <tr>
            <td
              style="
                padding:
                  9px 0;
                color:
                  #6b7280;
                width: 150px;
              "
            >
              Name
            </td>

            <td
              style="
                padding:
                  9px 0;
                font-weight:
                  600;
              "
            >
              ${name}
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:
                  9px 0;
                color:
                  #6b7280;
              "
            >
              Email
            </td>

            <td
              style="
                padding:
                  9px 0;
              "
            >
              <a
                href="mailto:${email}"
              >
                ${email}
              </a>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:
                  9px 0;
                color:
                  #6b7280;
              "
            >
              Company
            </td>

            <td
              style="
                padding:
                  9px 0;
              "
            >
              ${safeCompany}
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:
                  9px 0;
                color:
                  #6b7280;
              "
            >
              Meeting
            </td>

            <td
              style="
                padding:
                  9px 0;
                font-weight:
                  600;
              "
            >
              ${meetingTime}
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:
                  9px 0;
                color:
                  #6b7280;
                vertical-align:
                  top;
              "
            >
              Reason
            </td>

            <td
              style="
                padding:
                  9px 0;
              "
            >
              ${safeReason}
            </td>
          </tr>
        </table>

        ${
          meetLink
            ? `
              <div
                style="
                  margin-top:
                    24px;
                "
              >
                <a
                  href="${meetLink}"
                  style="
                    display:
                      inline-block;
                    padding:
                      12px 18px;
                    background:
                      #2563eb;
                    color:
                      white;
                    text-decoration:
                      none;
                    border-radius:
                      8px;
                    font-weight:
                      600;
                  "
                >
                  Open Google Meet
                </a>
              </div>
            `
            : ""
        }

        ${
          calendarLink
            ? `
              <p
                style="
                  margin-top:
                    18px;
                "
              >
                <a
                  href="${calendarLink}"
                >
                  View in Google Calendar
                </a>
              </p>
            `
            : ""
        }

        <p
          style="
            margin-top:
              28px;
            padding-top:
              18px;
            border-top:
              1px solid #e5e7eb;
            font-size:
              12px;
            color:
              #9ca3af;
          "
        >
          This notification was generated automatically by your portfolio scheduling assistant.
        </p>
      </div>
    </div>
  `;

  const raw =
    createEmailRaw({
      to: OWNER_EMAIL,
      from: OWNER_EMAIL,
      subject,
      html,
    });

  await gmail.users.messages.send({
    userId: "me",

    requestBody: {
      raw,
    },
  });
}

export async function POST(
  req: Request
) {
  try {
    const {
      name,
      email,
      company,
      reason,
      start,
      end,
      timeZone =
        "America/Denver",
    } = await req.json();

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
      !name ||
      !email ||
      !start ||
      !end
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Name, email, start time, and end time are required.",
        },
        {
          status: 400,
        }
      );
    }

    const cleanName =
      String(name)
        .trim()
        .slice(0, 100);

    const cleanEmail =
      String(email)
        .trim()
        .toLowerCase()
        .slice(0, 254);

    const cleanCompany =
      company
        ? String(company)
            .trim()
            .slice(0, 150)
        : "";

    const cleanReason =
      reason
        ? String(reason)
            .trim()
            .slice(0, 1500)
        : "";

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        cleanEmail
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Please provide a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    const startDate =
      new Date(start);

    const endDate =
      new Date(end);

    if (
      Number.isNaN(
        startDate.getTime()
      ) ||
      Number.isNaN(
        endDate.getTime()
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Invalid meeting start or end time.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      endDate <=
      startDate
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Meeting end time must be after the start time.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      startDate <=
      new Date()
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Meetings cannot be scheduled in the past.",
        },
        {
          status: 400,
        }
      );
    }

    const durationMinutes =
      (endDate.getTime() -
        startDate.getTime()) /
      60000;

    if (
      durationMinutes !==
      30
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Portfolio meetings are currently limited to 30 minutes.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      isWeekend(
        startDate,
        timeZone
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Scheduling is available Monday through Friday. Please choose a weekday.",
        },
        {
          status: 400,
        }
      );
    }

    const startLocal =
      getLocalHourMinute(
        startDate,
        timeZone
      );

    const endLocal =
      getLocalHourMinute(
        endDate,
        timeZone
      );

    const startMinutes =
      startLocal.hour *
        60 +
      startLocal.minute;

    const endMinutes =
      endLocal.hour *
        60 +
      endLocal.minute;

    const businessStart =
      9 * 60;

    const businessEnd =
      17 * 60;

    if (
      startMinutes <
        businessStart ||
      endMinutes >
        businessEnd
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Meetings can only be scheduled between 9:00 AM and 5:00 PM Mountain Time.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       GOOGLE AUTH
    ===================================================== */

    const clientId =
      process.env
        .GOOGLE_CLIENT_ID;

    const clientSecret =
      process.env
        .GOOGLE_CLIENT_SECRET;

    const redirectUri =
      process.env
        .GOOGLE_REDIRECT_URI;

    const refreshToken =
      process.env
        .GOOGLE_REFRESH_TOKEN;

    if (
      !clientId ||
      !clientSecret ||
      !redirectUri ||
      !refreshToken
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Google environment variables are missing.",
        },
        {
          status: 500,
        }
      );
    }

    const oauth2Client =
      new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri
      );

    oauth2Client.setCredentials(
      {
        refresh_token:
          refreshToken,
      }
    );

    const calendar =
      google.calendar({
        version: "v3",
        auth: oauth2Client,
      });

    /* =====================================================
       RE-CHECK AVAILABILITY
    ===================================================== */

    const availability =
      await calendar.freebusy.query(
        {
          requestBody: {
            timeMin:
              startDate.toISOString(),

            timeMax:
              endDate.toISOString(),

            timeZone,

            items: [
              {
                id: "primary",
              },
            ],
          },
        }
      );

    const busy =
      availability.data
        .calendars?.primary
        ?.busy || [];

    if (
      busy.length > 0
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "That time is no longer available. Please choose another available time.",
        },
        {
          status: 409,
        }
      );
    }

    /* =====================================================
       EVENT DESCRIPTION
    ===================================================== */

    const descriptionParts =
      [
        "Meeting scheduled through Abhilash Joga's portfolio assistant.",
        "",
        `Visitor: ${cleanName}`,
        `Email: ${cleanEmail}`,
      ];

    if (
      cleanCompany
    ) {
      descriptionParts.push(
        `Company / Organization: ${cleanCompany}`
      );
    }

    if (
      cleanReason
    ) {
      descriptionParts.push(
        "",
        "Reason for connecting:",
        cleanReason
      );
    }

    /* =====================================================
       CREATE CALENDAR EVENT
    ===================================================== */

    const event =
      await calendar.events.insert(
        {
          calendarId:
            "primary",

          conferenceDataVersion:
            1,

          sendUpdates:
            "all",

          requestBody: {
            summary:
              `Connect with Abhilash Joga - ${cleanName}`,

            description:
              descriptionParts.join(
                "\n"
              ),

            start: {
              dateTime:
                startDate.toISOString(),

              timeZone,
            },

            end: {
              dateTime:
                endDate.toISOString(),

              timeZone,
            },

            /*
              Only visitor needs to be listed here.

              You are the organizer because the event
              is created in your primary calendar.
            */
            attendees: [
              {
                email:
                  cleanEmail,

                displayName:
                  cleanName,
              },
            ],

            conferenceData: {
              createRequest: {
                requestId:
                  crypto.randomUUID(),

                conferenceSolutionKey:
                  {
                    type:
                      "hangoutsMeet",
                  },
              },
            },

            /*
              Explicit meeting reminders.
            */
            reminders: {
              useDefault: false,

              overrides: [
                {
                  method:
                    "popup",

                  minutes: 30,
                },

                {
                  method:
                    "email",

                  minutes:
                    24 * 60,
                },
              ],
            },
          },
        }
      );

    const createdEvent =
      event.data;

    const meetLink =
      createdEvent.hangoutLink ||
      createdEvent.conferenceData
        ?.entryPoints?.find(
          (entry) =>
            entry.entryPointType ===
            "video"
        )?.uri ||
      null;

    /* =====================================================
       IMMEDIATE EMAIL TO YOU
    ===================================================== */

    let notificationSent =
      false;

    try {
      await sendBookingNotification(
        {
          oauth2Client,

          name:
            cleanName,

          email:
            cleanEmail,

          company:
            cleanCompany,

          reason:
            cleanReason,

          startDate,

          timeZone,

          meetLink,

          calendarLink:
            createdEvent.htmlLink,
        }
      );

      notificationSent =
        true;
    } catch (
      notificationError
    ) {
      /*
        Important:

        The meeting has already been created.

        Do NOT tell the visitor the booking failed
        just because your internal notification failed.
      */

      console.error(
        "BOOKING EMAIL NOTIFICATION ERROR:",
        notificationError
      );
    }

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Meeting scheduled successfully. A Google Calendar invitation has been sent to the visitor.",

        notificationSent,

        meeting: {
          eventId:
            createdEvent.id,

          title:
            createdEvent.summary,

          start:
            createdEvent.start,

          end:
            createdEvent.end,

          visitor: {
            name:
              cleanName,

            email:
              cleanEmail,

            company:
              cleanCompany ||
              null,
          },

          meetLink,

          calendarLink:
            createdEvent.htmlLink,
        },
      }
    );
  } catch (error) {
    console.error(
      "SCHEDULE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          "Unable to schedule the meeting.",
      },
      {
        status: 500,
      }
    );
  }
}