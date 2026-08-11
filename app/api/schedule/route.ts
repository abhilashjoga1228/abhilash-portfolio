import { google } from "googleapis";
import { NextResponse } from "next/server";
import crypto from "crypto";

function isWeekend(date: Date, timeZone: string) {
  const dayName = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  }).format(date);

  return dayName === "Sat" || dayName === "Sun";
}

function getLocalHourMinute(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === "hour")?.value || 0);
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value || 0
  );

  return {
    hour,
    minute,
  };
}

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      company,
      reason,
      start,
      end,
      timeZone = "America/Denver",
    } = await req.json();

    if (!name || !email || !start || !end) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, start time, and end time are required.",
        },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid meeting start or end time.",
        },
        { status: 400 }
      );
    }

    if (endDate <= startDate) {
      return NextResponse.json(
        {
          success: false,
          error: "Meeting end time must be after the start time.",
        },
        { status: 400 }
      );
    }

    if (startDate <= new Date()) {
      return NextResponse.json(
        {
          success: false,
          error: "Meetings cannot be scheduled in the past.",
        },
        { status: 400 }
      );
    }

    const durationMinutes =
      (endDate.getTime() - startDate.getTime()) / 60000;

    if (durationMinutes !== 30) {
      return NextResponse.json(
        {
          success: false,
          error: "Portfolio meetings are currently limited to 30 minutes.",
        },
        { status: 400 }
      );
    }

    if (isWeekend(startDate, timeZone)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Scheduling is available Monday through Friday. Please choose a weekday.",
        },
        { status: 400 }
      );
    }

    const startLocal = getLocalHourMinute(startDate, timeZone);
    const endLocal = getLocalHourMinute(endDate, timeZone);

    const startMinutes =
      startLocal.hour * 60 + startLocal.minute;

    const endMinutes =
      endLocal.hour * 60 + endLocal.minute;

    const businessStart = 9 * 60;
    const businessEnd = 17 * 60;

    if (
      startMinutes < businessStart ||
      endMinutes > businessEnd
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Meetings can only be scheduled between 9:00 AM and 5:00 PM Mountain Time.",
        },
        { status: 400 }
      );
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (
      !clientId ||
      !clientSecret ||
      !redirectUri ||
      !refreshToken
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Google Calendar environment variables are missing.",
        },
        { status: 500 }
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    /*
      Re-check availability immediately before creating the event.
      This helps prevent double-booking if two visitors select the same slot.
    */
    const availability = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        timeZone,

        items: [
          {
            id: "primary",
          },
        ],
      },
    });

    const busy =
      availability.data.calendars?.primary?.busy || [];

    if (busy.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "That time is no longer available. Please choose another available time.",
        },
        { status: 409 }
      );
    }

    const descriptionParts = [
      "Meeting scheduled through Abhilash Joga's portfolio assistant.",
      "",
      `Visitor: ${name}`,
      `Email: ${email}`,
    ];

    if (company) {
      descriptionParts.push(`Company / Organization: ${company}`);
    }

    if (reason) {
      descriptionParts.push("", "Reason for connecting:", reason);
    }

    const event = await calendar.events.insert({
      calendarId: "primary",

      conferenceDataVersion: 1,

      sendUpdates: "all",

      requestBody: {
        summary: `Connect with Abhilash Joga - ${name}`,

        description: descriptionParts.join("\n"),

        start: {
          dateTime: startDate.toISOString(),
          timeZone,
        },

        end: {
          dateTime: endDate.toISOString(),
          timeZone,
        },

        attendees: [
          {
            email,
            displayName: name,
          },
          {
           email: "abhilashjoga1028@gmail.com",
           displayName: "Abhilash Joga",
         },
       ],

        conferenceData: {
          createRequest: {
            requestId: crypto.randomUUID(),

            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
          },
        },

        reminders: {
          useDefault: true,
        },
      },
    });

    const createdEvent = event.data;

    const meetLink =
      createdEvent.hangoutLink ||
      createdEvent.conferenceData?.entryPoints?.find(
        (entry) => entry.entryPointType === "video"
      )?.uri ||
      null;

    return NextResponse.json({
      success: true,

      message:
        "Meeting scheduled successfully. A Google Calendar invitation has been sent to the visitor.",

      meeting: {
        eventId: createdEvent.id,

        title: createdEvent.summary,

        start: createdEvent.start,

        end: createdEvent.end,

        visitor: {
          name,
          email,
          company: company || null,
        },

        meetLink,

        calendarLink: createdEvent.htmlLink,
      },
    });
  } catch (error) {
    console.error("SCHEDULE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to schedule the meeting.",
      },
      { status: 500 }
    );
  }
}