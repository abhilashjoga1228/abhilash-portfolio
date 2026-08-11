import { google } from "googleapis";
import { NextResponse } from "next/server";

type BusySlot = {
  start?: string | null;
  end?: string | null;
};

const SCHEDULING_TIME_ZONE = "America/Denver";

const BUSINESS_START_HOUR = 9;
const BUSINESS_END_HOUR = 17;

function overlapsBusy(
  slotStart: Date,
  slotEnd: Date,
  busySlots: BusySlot[]
) {
  return busySlots.some((busy) => {
    if (!busy.start || !busy.end) {
      return false;
    }

    const busyStart = new Date(busy.start);
    const busyEnd = new Date(busy.end);

    return (
      slotStart < busyEnd &&
      slotEnd > busyStart
    );
  });
}

/*
  Returns calendar information for a date
  using the specified IANA timezone.

  This prevents the server's own timezone
  from affecting weekday calculations.
*/
function getDatePartsInTimeZone(
  date: Date,
  timeZone: string
) {
  const parts =
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(date);

  const getPart = (type: string) =>
    parts.find(
      (part) => part.type === type
    )?.value;

  return {
    year: Number(getPart("year")),
    month: Number(getPart("month")),
    day: Number(getPart("day")),
    weekday: getPart("weekday"),
    hour: Number(getPart("hour")),
    minute: Number(getPart("minute")),
    second: Number(getPart("second")),
  };
}

/*
  Calculates the timezone offset for a
  specific instant.

  America/Denver automatically resolves to:

  MDT = UTC-06:00
  MST = UTC-07:00

  depending on the requested date.
*/
function getTimeZoneOffsetMinutes(
  date: Date,
  timeZone: string
) {
  const parts =
    getDatePartsInTimeZone(
      date,
      timeZone
    );

  const asUTC = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );

  return (
    (asUTC - date.getTime()) /
    (60 * 1000)
  );
}

/*
  Converts a wall-clock time such as:

  2026-08-14 09:00 America/Denver

  into the correct UTC Date.

  This automatically handles daylight
  saving time.
*/
function mountainDateTimeToUtc(
  dateString: string,
  hour: number,
  minute = 0
) {
  const [year, month, day] =
    dateString.split("-").map(Number);

  /*
    Create an initial UTC guess using
    the requested local clock values.
  */
  const initialGuess = new Date(
    Date.UTC(
      year,
      month - 1,
      day,
      hour,
      minute,
      0
    )
  );

  let offsetMinutes =
    getTimeZoneOffsetMinutes(
      initialGuess,
      SCHEDULING_TIME_ZONE
    );

  let utcDate = new Date(
    initialGuess.getTime() -
      offsetMinutes * 60 * 1000
  );

  /*
    Check the offset again using the
    resulting instant.

    This second pass handles dates close
    to daylight-saving transitions.
  */
  const correctedOffsetMinutes =
    getTimeZoneOffsetMinutes(
      utcDate,
      SCHEDULING_TIME_ZONE
    );

  if (
    correctedOffsetMinutes !==
    offsetMinutes
  ) {
    offsetMinutes =
      correctedOffsetMinutes;

    utcDate = new Date(
      initialGuess.getTime() -
        offsetMinutes * 60 * 1000
    );
  }

  return utcDate;
}

function isWeekend(dateString: string) {
  const noonUtc =
    mountainDateTimeToUtc(
      dateString,
      12,
      0
    );

  const weekday =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone:
          SCHEDULING_TIME_ZONE,
        weekday: "short",
      }
    ).format(noonUtc);

  return (
    weekday === "Sat" ||
    weekday === "Sun"
  );
}

function isValidCalendarDate(
  dateString: string
) {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})$/.exec(
      dateString
    );

  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const testDate = new Date(
    Date.UTC(
      year,
      month - 1,
      day
    )
  );

  return (
    testDate.getUTCFullYear() ===
      year &&
    testDate.getUTCMonth() ===
      month - 1 &&
    testDate.getUTCDate() === day
  );
}

function isPastDate(
  dateString: string
) {
  const now = new Date();

  const todayInMountain =
    getDatePartsInTimeZone(
      now,
      SCHEDULING_TIME_ZONE
    );

  const todayString = [
    todayInMountain.year,
    String(
      todayInMountain.month
    ).padStart(2, "0"),
    String(
      todayInMountain.day
    ).padStart(2, "0"),
  ].join("-");

  return dateString < todayString;
}

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const {
      date,
      meetingDurationMinutes = 30,
    } = body;

    /*
      Always use Abhilash's scheduling
      timezone server-side.

      Do not let a visitor override the
      calendar timezone.
    */
    const timeZone =
      SCHEDULING_TIME_ZONE;

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          error:
            "date is required in YYYY-MM-DD format.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      typeof date !== "string" ||
      !isValidCalendarDate(date)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid date. Use YYYY-MM-DD.",
        },
        {
          status: 400,
        }
      );
    }

    /*
      Do not return availability for
      dates that have already passed.
    */
    if (isPastDate(date)) {
      return NextResponse.json(
        {
          success: false,
          date,
          timeZone,
          availableSlots: [],
          message:
            "That date has already passed. Please choose today or a future weekday.",
        },
        {
          status: 400,
        }
      );
    }

    /*
      Monday-Friday only.
    */
    if (isWeekend(date)) {
      return NextResponse.json({
        success: false,
        date,
        timeZone,
        availableSlots: [],
        message:
          "Scheduling is available Monday through Friday. Please choose a weekday.",
      });
    }

    /*
      Validate meeting duration.
    */
    if (
      typeof meetingDurationMinutes !==
        "number" ||
      meetingDurationMinutes < 15 ||
      meetingDurationMinutes > 60
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Meeting duration must be between 15 and 60 minutes.",
        },
        {
          status: 400,
        }
      );
    }

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
      console.error(
        "Missing Google Calendar environment variables."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Calendar configuration is unavailable.",
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

    oauth2Client.setCredentials({
      refresh_token:
        refreshToken,
    });

    const calendar =
      google.calendar({
        version: "v3",
        auth: oauth2Client,
      });

    /*
      Create 9:00 AM and 5:00 PM
      America/Denver times.

      These are automatically converted
      to the correct UTC instants.

      Summer:
      America/Denver = MDT / UTC-06

      Winter:
      America/Denver = MST / UTC-07
    */
    const dayStart =
      mountainDateTimeToUtc(
        date,
        BUSINESS_START_HOUR,
        0
      );

    const dayEnd =
      mountainDateTimeToUtc(
        date,
        BUSINESS_END_HOUR,
        0
      );

    const timeMin =
      dayStart.toISOString();

    const timeMax =
      dayEnd.toISOString();

    /*
      Ask Google Calendar which periods
      are already busy.
    */
    const response =
      await calendar.freebusy.query({
        requestBody: {
          timeMin,
          timeMax,
          timeZone,

          items: [
            {
              id: "primary",
            },
          ],
        },
      });

    const primaryCalendar =
      response.data.calendars
        ?.primary;

    if (!primaryCalendar) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to read calendar availability.",
        },
        {
          status: 500,
        }
      );
    }

    if (
      primaryCalendar.errors &&
      primaryCalendar.errors
        .length > 0
    ) {
      console.error(
        "GOOGLE CALENDAR ERRORS:",
        primaryCalendar.errors
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Google Calendar returned an availability error.",
        },
        {
          status: 500,
        }
      );
    }

    const busySlots =
      primaryCalendar.busy || [];

    const availableSlots: {
      start: string;
      end: string;
      display: string;
    }[] = [];

    let currentStart =
      new Date(dayStart);

    /*
      Generate meeting slots from
      9 AM through 5 PM.

      Example for 30 minutes:

      9:00
      9:30
      10:00
      ...
      4:30
    */
    while (
      currentStart < dayEnd
    ) {
      const currentEnd =
        new Date(
          currentStart.getTime() +
            meetingDurationMinutes *
              60 *
              1000
        );

      if (
        currentEnd > dayEnd
      ) {
        break;
      }

      const isBusy =
        overlapsBusy(
          currentStart,
          currentEnd,
          busySlots
        );

      /*
        If checking today's availability,
        don't offer slots that have
        already started.
      */
      const isInPast =
        currentStart <=
        new Date();

      if (
        !isBusy &&
        !isInPast
      ) {
        availableSlots.push({
          start:
            currentStart.toISOString(),

          end:
            currentEnd.toISOString(),

          display:
            currentStart.toLocaleTimeString(
              "en-US",
              {
                timeZone,
                hour: "numeric",
                minute: "2-digit",
              }
            ),
        });
      }

      currentStart =
        new Date(
          currentStart.getTime() +
            meetingDurationMinutes *
              60 *
              1000
        );
    }

    return NextResponse.json({
      success: true,

      date,

      timeZone,

      meetingDurationMinutes,

      schedulingRules: {
        days:
          "Monday-Friday",

        startTime:
          "9:00 AM",

        endTime:
          "5:00 PM",

        timeZone:
          "America/Denver",

        duration:
          `${meetingDurationMinutes} minutes`,
      },

      availableSlots,

      busy:
        busySlots.map(
          (slot) => ({
            start:
              slot.start,

            end:
              slot.end,
          })
        ),
    });
  } catch (error) {
    console.error(
      "AVAILABILITY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to check calendar availability.",
      },
      {
        status: 500,
      }
    );
  }
}