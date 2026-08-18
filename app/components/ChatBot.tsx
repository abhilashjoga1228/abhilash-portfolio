"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Send,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "ai";
  text: string;
};

type AvailableSlot = {
  start: string;
  end: string;
  display: string;
};

type ScheduleStep =
  | "idle"
  | "name"
  | "email"
  | "company"
  | "reason"
  | "date"
  | "dateConfirm"
  | "slot"
  | "confirm";

type BookingDetails = {
  name: string;
  email: string;
  company: string;
  reason: string;
  date: string;
  dateDisplay: string;
  start: string;
  end: string;
  displayTime: string;
};

const suggestedQuestions = [
  "Adobe Experience",
  "Technical Skills",
  "Projects",
  "🎯 Analyze Job Match",
  "📅 Schedule a Meeting",
];

const initialBooking: BookingDetails = {
  name: "",
  email: "",
  company: "",
  reason: "",
  date: "",
  dateDisplay: "",
  start: "",
  end: "",
  displayTime: "",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDateYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatFriendlyDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function parseNaturalDate(input: string): string | null {
  const value = input.trim().toLowerCase();

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const today = new Date();

  if (value === "today" || value === "tdy") {
    return formatDateYYYYMMDD(today);
  }

  if (
    value === "tomorrow" ||
    value === "tommorow" ||
    value === "tomorow" ||
    value === "tmrw" ||
    value === "tmr"
  ) {
    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    return formatDateYYYYMMDD(tomorrow);
  }

  const weekdays: Record<string, number> = {
    sunday: 0,
    sun: 0,
    monday: 1,
    mon: 1,
    tuesday: 2,
    tue: 2,
    tues: 2,
    wednesday: 3,
    wed: 3,
    thursday: 4,
    thu: 4,
    thurs: 4,
    friday: 5,
    fri: 5,
    saturday: 6,
    sat: 6,
  };

  if (value in weekdays) {
    const targetDay = weekdays[value];
    const currentDay = today.getDay();

    let daysAhead = (targetDay - currentDay + 7) % 7;

    if (daysAhead === 0) {
      daysAhead = 7;
    }

    const targetDate = new Date(today);

    targetDate.setDate(today.getDate() + daysAhead);

    return formatDateYYYYMMDD(targetDate);
  }

  if (value.startsWith("next ")) {
    const weekday = value.replace("next ", "").trim();

    if (weekday in weekdays) {
      const targetDay = weekdays[weekday];
      const currentDay = today.getDay();

      let daysAhead = (targetDay - currentDay + 7) % 7;

      if (daysAhead === 0) {
        daysAhead = 7;
      }

      const targetDate = new Date(today);

      targetDate.setDate(today.getDate() + daysAhead);

      return formatDateYYYYMMDD(targetDate);
    }
  }

  const parsedDate = new Date(input);

  if (!Number.isNaN(parsedDate.getTime())) {
    return formatDateYYYYMMDD(parsedDate);
  }

  return null;
}

function isSkipValue(value: string) {
  const normalized = value.trim().toLowerCase();

  return [
    "skip",
    "skp",
    "sklip",
    "skip it",
    "na",
    "n/a",
  ].includes(normalized);
}

export default function ChatBot() {
  function trackEvent(
    eventName: string,
    params: Record<string, string> = {}
  ) {
    if (typeof window === "undefined") return;

    const gtag = (
      window as typeof window & {
        gtag?: (
          command: string,
          eventName: string,
          params?: Record<string, string>
        ) => void;
      }
    ).gtag;

    if (typeof gtag === "function") {
      gtag("event", eventName, params);
    }
  }

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [scheduleStep, setScheduleStep] =
    useState<ScheduleStep>("idle");

  const [booking, setBooking] =
    useState<BookingDetails>(initialBooking);

  const [availableSlots, setAvailableSlots] =
    useState<AvailableSlot[]>([]);

  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();

    return new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: `Hi 👋 I'm Abhilash AI.

I can help with **experience, skills, projects, job-fit analysis, and meeting scheduling**.

Choose a quick action above or ask me anything about Abhilash.`,
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, availableSlots, scheduleStep]);

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDay = new Date(year, month, 1);

    const lastDate = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const days: Array<Date | null> = [];

    for (
      let i = 0;
      i < firstDay.getDay();
      i++
    ) {
      days.push(null);
    }

    for (
      let day = 1;
      day <= lastDate;
      day++
    ) {
      days.push(
        new Date(
          year,
          month,
          day
        )
      );
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  }, [calendarMonth]);

  function addAIMessage(text: string) {
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text,
      },
    ]);
  }

  function addUserMessage(text: string) {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);
  }

  function resetCalendarToCurrentMonth() {
    const now = new Date();

    setCalendarMonth(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      )
    );
  }

  function resetScheduling() {
    setScheduleStep("idle");
    setBooking(initialBooking);
    setAvailableSlots([]);
    resetCalendarToCurrentMonth();
  }

  function startScheduling() {
    trackEvent("meeting_schedule_start", {
      location: "chatbot",
    });

    setAvailableSlots([]);
    setBooking(initialBooking);
    resetCalendarToCurrentMonth();
    setScheduleStep("name");

    addAIMessage(`Absolutely — I can help coordinate a **30-minute meeting with Abhilash**.

I'll collect a few details and then show you a calendar where you can select a date.

**First, what is your name?**`);
  }

  function isPastDate(date: Date) {
    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const comparison = new Date(date);

    comparison.setHours(
      0,
      0,
      0,
      0
    );

    return comparison < today;
  }

  function isWeekend(date: Date) {
    const day = date.getDay();

    return day === 0 || day === 6;
  }

  function isSelectedDate(date: Date) {
    return booking.date === formatDateYYYYMMDD(date);
  }

  function isToday(date: Date) {
    const today = new Date();

    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  }

  function canGoPreviousMonth() {
    const now = new Date();

    const currentMonthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    return calendarMonth > currentMonthStart;
  }

  function previousMonth() {
    if (!canGoPreviousMonth()) return;

    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() - 1,
        1
      )
    );
  }

  function nextMonth() {
    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() + 1,
        1
      )
    );
  }

  function selectCalendarDate(date: Date) {
    if (
      isPastDate(date) ||
      isWeekend(date)
    ) {
      return;
    }

    const formattedDate =
      formatDateYYYYMMDD(date);

    const friendlyDate =
      formatFriendlyDate(formattedDate);

    setBooking((prev) => ({
      ...prev,
      date: formattedDate,
      dateDisplay: friendlyDate,
      start: "",
      end: "",
      displayTime: "",
    }));

    addUserMessage(friendlyDate);

    setScheduleStep("dateConfirm");

    addAIMessage(`You selected:

📅 **${friendlyDate}**

Would you like me to check Abhilash's Google Calendar for available times?`);
  }

  async function loadAvailability(date: string) {
    setLoading(true);
    setAvailableSlots([]);

    try {
      const response = await fetch(
        "/api/availability",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            date,
            timeZone:
              "America/Denver",
            meetingDurationMinutes:
              30,
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        addAIMessage(
          data.message ||
            data.error ||
            "I couldn't find availability for that date."
        );

        setScheduleStep("date");

        return;
      }

      const slots: AvailableSlot[] =
        data.availableSlots || [];

      if (slots.length === 0) {
        addAIMessage(`Abhilash doesn't currently have an available 30-minute slot on **${
          booking.dateDisplay ||
          formatFriendlyDate(date)
        }**.

Please choose another weekday from the calendar.`);

        setBooking((prev) => ({
          ...prev,
          date: "",
          dateDisplay: "",
          start: "",
          end: "",
          displayTime: "",
        }));

        setScheduleStep("date");

        return;
      }

      setAvailableSlots(slots);

      setScheduleStep("slot");

      addAIMessage(`I found available times for **${
        booking.dateDisplay ||
        formatFriendlyDate(date)
      }**.

All times below are shown in **Mountain Time (MT)**.

Please select a 30-minute slot.`);
    } catch (error) {
      console.error(
        "AVAILABILITY ERROR:",
        error
      );

      addAIMessage(
        "Sorry, I couldn't check Abhilash's calendar right now. You can still contact him directly through LinkedIn or email."
      );

      setScheduleStep("idle");
    } finally {
      setLoading(false);
    }
  }

  function selectSlot(
    slot: AvailableSlot
  ) {
    setBooking((prev) => ({
      ...prev,
      start: slot.start,
      end: slot.end,
      displayTime: slot.display,
    }));

    setAvailableSlots([]);

    setScheduleStep("confirm");

    addUserMessage(
      slot.display
    );

    addAIMessage(`Please confirm the meeting details:

**Name:** ${booking.name}  
**Email:** ${booking.email}  
**Company:** ${
      booking.company ||
      "Not provided"
    }  
**Reason:** ${
      booking.reason ||
      "Not provided"
    }  
**Date:** ${
      booking.dateDisplay ||
      booking.date
    }  
**Time:** ${
      slot.display
    } Mountain Time  
**Duration:** 30 minutes

If everything looks correct, click **Confirm Meeting** below.

The selected time will be checked again before the meeting is created.`);
  }

  async function confirmBooking() {
    if (
      !booking.name ||
      !booking.email ||
      !booking.date ||
      !booking.start ||
      !booking.end
    ) {
      addAIMessage(
        "Some booking information is missing. Please start the scheduling process again."
      );

      resetScheduling();

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/schedule",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: booking.name,
            email: booking.email,
            company:
              booking.company,
            reason:
              booking.reason,
            start:
              booking.start,
            end:
              booking.end,
            timeZone:
              "America/Denver",
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        if (
          response.status === 409
        ) {
          addAIMessage(`That time is no longer available.

Please select another date from the calendar and I'll check again.`);

          setScheduleStep("date");

          setAvailableSlots([]);

          setBooking(
            (prev) => ({
              ...prev,
              date: "",
              dateDisplay: "",
              start: "",
              end: "",
              displayTime: "",
            })
          );

          return;
        }

        addAIMessage(
          data.error ||
            "I couldn't schedule the meeting. Please try again or contact Abhilash directly through LinkedIn or email."
        );

        return;
      }

      trackEvent("meeting_scheduled", {
        location: "chatbot",
        duration: "30_minutes",
      });

      const meetLink =
        data.meeting
          ?.meetLink || null;

      const calendarLink =
        data.meeting
          ?.calendarLink || null;

      addAIMessage(`✅ **Meeting scheduled successfully!**

📅 **${booking.dateDisplay}**  
🕒 **${booking.displayTime} Mountain Time**  
⏱️ **Duration:** 30 minutes

A Google Calendar invitation has been sent to:

**${booking.email}**

${
  meetLink
    ? `🎥 **Google Meet:** ${meetLink}`
    : "The meeting details are included in the calendar invitation."
}

${
  calendarLink
    ? `📆 **Calendar Event:** ${calendarLink}`
    : ""
}

Abhilash will also have the meeting on his calendar.

Thank you for reaching out!`);

      resetScheduling();
    } catch (error) {
      console.error(
        "SCHEDULE ERROR:",
        error
      );

      addAIMessage(`Sorry, something went wrong while scheduling the meeting.

Please contact Abhilash directly through **LinkedIn or email**, or try again.`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSchedulingInput(
    userMessage: string
  ) {
    const value =
      userMessage.trim();

    if (!value) return;

    if (
      scheduleStep === "name"
    ) {
      setBooking((prev) => ({
        ...prev,
        name: value,
      }));

      addUserMessage(value);

      setScheduleStep(
        "email"
      );

      addAIMessage(
        `Thanks, ${value}. What is the best **email address** for the calendar invitation?`
      );

      return;
    }

    if (
      scheduleStep === "email"
    ) {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailPattern.test(
          value
        )
      ) {
        addAIMessage(
          "Please enter a valid email address so Google Calendar can send you the invitation."
        );

        return;
      }

      setBooking((prev) => ({
        ...prev,
        email: value,
      }));

      addUserMessage(value);

      setScheduleStep(
        "company"
      );

      addAIMessage(`What company or organization are you with?

If this doesn't apply, type **Skip**.`);

      return;
    }

    if (
      scheduleStep ===
      "company"
    ) {
      const company =
        isSkipValue(value)
          ? ""
          : value;

      setBooking((prev) => ({
        ...prev,
        company,
      }));

      addUserMessage(value);

      setScheduleStep(
        "reason"
      );

      addAIMessage(`What would you like to connect with Abhilash about?

For example:

• Data Engineer opportunity  
• Microsoft Fabric role  
• Consulting / collaboration  
• Networking  
• Project discussion

You can also type **Skip**.`);

      return;
    }

    if (
      scheduleStep ===
      "reason"
    ) {
      const reason =
        isSkipValue(value)
          ? ""
          : value;

      setBooking((prev) => ({
        ...prev,
        reason,
      }));

      addUserMessage(value);

      resetCalendarToCurrentMonth();

      setScheduleStep("date");

      addAIMessage(`Great. Please choose a date from the **calendar below**.

Available scheduling:

**Monday–Friday**  
**9:00 AM–5:00 PM Mountain Time**

Past dates and weekends are disabled.

You can also type a date such as **tomorrow**, **Friday**, or **August 14**.`);

      return;
    }

    if (
      scheduleStep ===
      "date"
    ) {
      const parsedDate =
        parseNaturalDate(
          value
        );

      if (!parsedDate) {
        addAIMessage(`I couldn't understand that date.

Please choose a date from the calendar below or type something like **tomorrow**, **Friday**, or **August 14**.`);

        return;
      }

      const parsedDateObject =
        new Date(
          `${parsedDate}T12:00:00`
        );

      const today =
        new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      const comparisonDate =
        new Date(
          parsedDateObject
        );

      comparisonDate.setHours(
        0,
        0,
        0,
        0
      );

      if (
        comparisonDate <
        today
      ) {
        addUserMessage(
          value
        );

        addAIMessage(
          "That date has already passed. Please choose today or a future weekday."
        );

        return;
      }

      if (
        isWeekend(
          parsedDateObject
        )
      ) {
        addUserMessage(
          value
        );

        addAIMessage(
          "Scheduling is available Monday through Friday. Please choose a weekday."
        );

        return;
      }

      const friendlyDate =
        formatFriendlyDate(
          parsedDate
        );

      setBooking((prev) => ({
        ...prev,
        date: parsedDate,
        dateDisplay:
          friendlyDate,
      }));

      addUserMessage(value);

      setScheduleStep(
        "dateConfirm"
      );

      addAIMessage(`You selected:

📅 **${friendlyDate}**

Would you like me to check availability?`);

      return;
    }
  }

  function confirmSelectedDate() {
    if (!booking.date) {
      setScheduleStep(
        "date"
      );

      addAIMessage(
        "Please choose a date from the calendar again."
      );

      return;
    }

    addUserMessage(
      "Yes, check availability"
    );

    loadAvailability(
      booking.date
    );
  }

  function changeSelectedDate() {
    addUserMessage(
      "Change date"
    );

    setBooking((prev) => ({
      ...prev,
      date: "",
      dateDisplay: "",
      start: "",
      end: "",
      displayTime: "",
    }));

    setAvailableSlots([]);

    setScheduleStep(
      "date"
    );

    addAIMessage(
      "No problem. Please choose another date from the calendar below."
    );
  }

  async function sendMessage(
    question?: string
  ) {
    const userMessage =
      question || input;

    if (
      !userMessage.trim()
    ) {
      return;
    }

    setInput("");

    if (
      userMessage ===
      "📅 Schedule a Meeting"
    ) {
      addUserMessage(
        "I'd like to schedule a meeting with Abhilash."
      );

      startScheduling();

      return;
    }

    if (
      scheduleStep !==
      "idle"
    ) {
      if (
        scheduleStep ===
          "slot" ||
        scheduleStep ===
          "confirm" ||
        scheduleStep ===
          "dateConfirm"
      ) {
        return;
      }

      await handleSchedulingInput(
        userMessage
      );

      return;
    }

    const lower =
      userMessage.toLowerCase();

    const schedulingIntent =
      lower.includes(
        "schedule"
      ) ||
      lower.includes(
        "book a meeting"
      ) ||
      lower.includes(
        "book meeting"
      ) ||
      lower.includes(
        "set up a meeting"
      ) ||
      lower.includes(
        "setup a meeting"
      ) ||
      lower.includes(
        "meet with abhilash"
      ) ||
      lower.includes(
        "speak with abhilash"
      );

    if (
      schedulingIntent
    ) {
      addUserMessage(
        userMessage
      );

      startScheduling();

      return;
    }

    addUserMessage(
      userMessage
    );

    setLoading(true);

    try {
      const response =
        await fetch(
          "/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              message:
                userMessage,
            }),
          }
        );

      const data =
        await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",

          text:
            data.answer ||
            "Sorry, I am unable to answer right now.",
        },
      ]);
    } catch (error) {
      console.error(
        "CHAT ERROR:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const monthTitle =
    new Intl.DateTimeFormat(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    ).format(
      calendarMonth
    );

  return (
    <>
      {!open && (
        <button
          onClick={() => {
            trackEvent("chatbot_open", {
              location: "floating_button",
            });
            setOpen(true);
          }}
          className="
            fixed
            bottom-6
            right-6
            z-50
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-blue-600
            shadow-[0_0_30px_rgba(59,130,246,0.6)]
            transition
            hover:scale-105
          "
          aria-label="Open Abhilash AI assistant"
        >
          <img
            src="/abhilash.jpg"
            alt="Abhilash"
            className="
              h-14
              w-14
              rounded-full
              object-cover
            "
          />
        </button>
      )}

      {open && (
        <div
          className={`
            fixed
            z-50
            flex
            flex-col
            overflow-hidden
            rounded-3xl
            border
            border-blue-400/20
            bg-slate-950
            shadow-2xl
            transition-all
            duration-300

            ${
              expanded
                ? "bottom-4 right-4 h-[86vh] w-[calc(100vw-2rem)] max-w-[900px] sm:bottom-6 sm:right-6"
                : "bottom-4 right-4 h-[min(650px,calc(100vh-2rem))] w-[calc(100vw-2rem)] sm:bottom-6 sm:right-6 sm:w-[430px]"
            }
          `}
        >
          <div
            className="
              flex
              items-center
              gap-3
              border-b
              border-white/10
              p-4
            "
          >
            <img
              src="/abhilash.jpg"
              alt="Abhilash"
              className="
                h-11
                w-11
                rounded-full
                border
                border-blue-400
                object-cover
              "
            />

            <div className="min-w-0">
              <h3 className="font-bold text-blue-400">
                Abhilash AI
              </h3>

              <p className="truncate text-xs text-gray-400">
                Portfolio, Job Fit & Scheduling Assistant
              </p>

              <p className="text-xs text-green-400">
                ● Online
              </p>
            </div>

            <div className="ml-auto flex gap-2">
              <button
                onClick={() =>
                  setExpanded(
                    !expanded
                  )
                }
                className="
                  rounded-lg
                  border
                  border-blue-400/30
                  p-2
                  text-blue-300
                  hover:bg-blue-600
                  hover:text-white
                "
                aria-label={
                  expanded
                    ? "Minimize assistant"
                    : "Expand assistant"
                }
              >
                {expanded ? (
                  <Minimize2
                    size={16}
                  />
                ) : (
                  <Maximize2
                    size={16}
                  />
                )}
              </button>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="
                  rounded-lg
                  border
                  border-blue-400/30
                  p-2
                  text-blue-300
                  hover:bg-blue-600
                  hover:text-white
                "
                aria-label="Close assistant"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div
            className="
              border-b
              border-white/10
              p-3
            "
          >
            <p className="mb-2 text-xs font-semibold text-blue-400">
              Try asking
            </p>

            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map(
                (question) => (
                  <button
                    key={question}
                    onClick={() =>
                      sendMessage(
                        question
                      )
                    }
                    disabled={
                      loading
                    }
                    className={`
                      rounded-full
                      border
                      px-3
                      py-1.5
                      text-xs
                      transition

                      ${
                        question ===
                        "🎯 Analyze Job Match"
                          ? "border-blue-500 bg-blue-600 text-white"
                          : question ===
                            "📅 Schedule a Meeting"
                          ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-600 hover:text-white"
                          : "border-blue-400/30 bg-slate-900 text-blue-300 hover:bg-blue-600 hover:text-white"
                      }
                    `}
                  >
                    {question}
                  </button>
                )
              )}
            </div>
          </div>

          <div
            className="
              min-h-0
              flex-1
              space-y-3
              overflow-y-auto
              p-4
            "
          >
            {messages.map(
              (
                message,
                index
              ) => (
                <div
                  key={index}
                  className={`
                    rounded-xl
                    p-3
                    text-sm
                    leading-6
                    break-words

                    ${
                      message.role ===
                      "user"
                        ? "ml-8 bg-blue-600 text-white"
                        : "mr-8 bg-slate-800 text-gray-200"
                    }
                  `}
                >
                  <ReactMarkdown>
                    {
                      message.text
                    }
                  </ReactMarkdown>
                </div>
              )
            )}

            {scheduleStep ===
              "date" && (
              <div
                className="
                  rounded-2xl
                  border
                  border-cyan-400/20
                  bg-slate-900
                  p-4
                "
              >
                <div
                  className="
                    mb-4
                    flex
                    items-center
                    justify-between
                  "
                >
                  <button
                    onClick={
                      previousMonth
                    }
                    disabled={
                      !canGoPreviousMonth()
                    }
                    className="
                      rounded-lg
                      border
                      border-blue-400/20
                      p-2
                      text-blue-300
                      transition
                      hover:bg-blue-600
                      hover:text-white
                      disabled:cursor-not-allowed
                      disabled:opacity-25
                    "
                  >
                    <ChevronLeft
                      size={18}
                    />
                  </button>

                  <div className="text-center">
                    <p className="font-semibold text-white">
                      {
                        monthTitle
                      }
                    </p>

                    <p className="text-[11px] text-gray-500">
                      Select a
                      weekday
                    </p>
                  </div>

                  <button
                    onClick={
                      nextMonth
                    }
                    className="
                      rounded-lg
                      border
                      border-blue-400/20
                      p-2
                      text-blue-300
                      transition
                      hover:bg-blue-600
                      hover:text-white
                    "
                  >
                    <ChevronRight
                      size={18}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {WEEKDAYS.map(
                    (weekday) => (
                      <div
                        key={
                          weekday
                        }
                        className="
                          py-1
                          text-center
                          text-[11px]
                          font-semibold
                          text-gray-500
                        "
                      >
                        {
                          weekday
                        }
                      </div>
                    )
                  )}

                  {calendarDays.map(
                    (
                      date,
                      index
                    ) => {
                      if (!date) {
                        return (
                          <div
                            key={`blank-${index}`}
                            className="aspect-square"
                          />
                        );
                      }

                      const disabled =
                        isPastDate(
                          date
                        ) ||
                        isWeekend(
                          date
                        );

                      const selected =
                        isSelectedDate(
                          date
                        );

                      const today =
                        isToday(
                          date
                        );

                      return (
                        <button
                          key={formatDateYYYYMMDD(
                            date
                          )}
                          type="button"
                          disabled={
                            disabled
                          }
                          onClick={() =>
                            selectCalendarDate(
                              date
                            )
                          }
                          className={`
                            aspect-square
                            rounded-lg
                            text-xs
                            font-medium
                            transition

                            ${
                              selected
                                ? "bg-blue-600 text-white ring-2 ring-cyan-400"
                                : today &&
                                  !disabled
                                ? "border border-cyan-400/60 bg-cyan-500/10 text-cyan-200"
                                : disabled
                                ? "cursor-not-allowed text-gray-700"
                                : "border border-white/5 bg-slate-800 text-gray-200 hover:border-cyan-400 hover:bg-cyan-500/15 hover:text-white"
                            }
                          `}
                        >
                          {
                            date.getDate()
                          }
                        </button>
                      );
                    }
                  )}
                </div>

                <div
                  className="
                    mt-4
                    flex
                    items-start
                    gap-2
                    rounded-lg
                    bg-slate-950/70
                    p-3
                    text-xs
                    text-gray-400
                  "
                >
                  <Calendar
                    size={14}
                    className="mt-0.5 shrink-0 text-cyan-400"
                  />

                  <span>
                    Monday–Friday
                    • 9:00
                    AM–5:00 PM
                    Mountain Time.
                    Available times
                    are checked
                    after you select
                    a date.
                  </span>
                </div>
              </div>
            )}

            {scheduleStep ===
              "dateConfirm" && (
              <div className="mr-8 flex flex-wrap gap-2">
                <button
                  onClick={
                    confirmSelectedDate
                  }
                  disabled={
                    loading
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-green-600
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    hover:bg-green-700
                    disabled:opacity-50
                  "
                >
                  <Check
                    size={16}
                  />
                  Check
                  Availability
                </button>

                <button
                  onClick={
                    changeSelectedDate
                  }
                  disabled={
                    loading
                  }
                  className="
                    rounded-lg
                    border
                    border-gray-600
                    px-4
                    py-2.5
                    text-sm
                    text-gray-300
                    hover:bg-slate-800
                  "
                >
                  Choose Another
                  Date
                </button>
              </div>
            )}

            {scheduleStep ===
              "slot" &&
              availableSlots.length >
                0 && (
                <div
                  className="
                    rounded-xl
                    border
                    border-cyan-400/20
                    bg-slate-900
                    p-4
                  "
                >
                  <div
                    className="
                      mb-3
                      flex
                      items-center
                      justify-between
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-cyan-300
                      "
                    >
                      <Calendar
                        size={16}
                      />

                      Available
                      Times
                    </div>

                    <button
                      onClick={
                        changeSelectedDate
                      }
                      disabled={
                        loading
                      }
                      className="
                        shrink-0
                        rounded-lg
                        border
                        border-cyan-400/40
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-cyan-300
                        transition
                        hover:bg-cyan-600
                        hover:text-white
                        disabled:opacity-50
                      "
                    >
                      ← Change Date
                    </button>
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-2
                      sm:grid-cols-3
                    "
                  >
                    {availableSlots.map(
                      (
                        slot
                      ) => (
                        <button
                          key={
                            slot.start
                          }
                          onClick={() =>
                            selectSlot(
                              slot
                            )
                          }
                          className="
                            rounded-lg
                            border
                            border-blue-400/30
                            bg-blue-500/10
                            px-3
                            py-2
                            text-sm
                            text-blue-200
                            transition
                            hover:border-cyan-400
                            hover:bg-cyan-500/20
                            hover:text-white
                          "
                        >
                          {
                            slot.display
                          }
                        </button>
                      )
                    )}
                  </div>

                  <p className="mt-3 text-xs text-gray-500">
                    Mountain Time •
                    30-minute
                    meeting
                  </p>
                </div>
              )}

            {scheduleStep ===
              "confirm" && (
              <div className="mr-8 flex flex-wrap gap-2">
                <button
                  onClick={
                    confirmBooking
                  }
                  disabled={
                    loading
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-green-600
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    hover:bg-green-700
                    disabled:opacity-50
                  "
                >
                  <Check
                    size={16}
                  />
                  Confirm Meeting
                </button>

                <button
                  onClick={
                    changeSelectedDate
                  }
                  disabled={
                    loading
                  }
                  className="
                    rounded-lg
                    border
                    border-gray-600
                    px-4
                    py-2.5
                    text-sm
                    text-gray-300
                    hover:bg-slate-800
                  "
                >
                  Change Date /
                  Time
                </button>
              </div>
            )}

            {loading && (
              <div
                className="
                  mr-8
                  rounded-xl
                  bg-slate-800
                  p-3
                  text-sm
                  text-gray-300
                "
              >
                Abhilash AI is
                working...
              </div>
            )}

            <div
              ref={
                messagesEndRef
              }
            />
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-2
              px-3
              pb-2
            "
          >
            <a
              href="/Abhilash_Joga_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("resume_click", {
                  location: "chatbot",
                  destination: "/Abhilash_Joga_Resume.pdf",
                })
              }
              className="
                rounded-lg
                bg-blue-600
                px-3
                py-2
                text-xs
                text-white
              "
            >
              📄 Resume
            </a>

            <a
              href="https://www.linkedin.com/in/jogaabhilash/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("linkedin_click", {
                  location: "chatbot",
                  destination:
                    "https://www.linkedin.com/in/jogaabhilash/",
                })
              }
              className="
                rounded-lg
                border
                border-blue-400/40
                px-3
                py-2
                text-xs
                text-blue-300
              "
            >
              🔗 LinkedIn
            </a>

            <a
              href="mailto:abhilashjoga1028@gmail.com"
              onClick={() =>
                trackEvent("email_click", {
                  location: "chatbot",
                  destination: "mailto",
                })
              }
              className="
                rounded-lg
                border
                border-blue-400/40
                px-3
                py-2
                text-xs
                text-blue-300
              "
            >
              ✉️ Email
            </a>

            <button
              onClick={() => {
                if (
                  scheduleStep ===
                  "idle"
                ) {
                  addUserMessage(
                    "I'd like to schedule a meeting."
                  );

                  startScheduling();
                }
              }}
              disabled={
                scheduleStep !==
                  "idle" ||
                loading
              }
              className="
                flex
                items-center
                gap-1
                rounded-lg
                border
                border-cyan-400/40
                px-3
                py-2
                text-xs
                text-cyan-300
                hover:bg-cyan-600
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <Calendar
                size={13}
              />

              Schedule Meeting
            </button>
          </div>

          <div
            className="
              flex
              gap-2
              border-t
              border-white/10
              p-3
            "
          >
            <input
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key ===
                    "Enter" &&
                  scheduleStep !==
                    "slot" &&
                  scheduleStep !==
                    "confirm" &&
                  scheduleStep !==
                    "dateConfirm"
                ) {
                  sendMessage();
                }
              }}
              disabled={
                loading ||
                scheduleStep ===
                  "slot" ||
                scheduleStep ===
                  "confirm" ||
                scheduleStep ===
                  "dateConfirm"
              }
              placeholder={
                scheduleStep ===
                "name"
                  ? "Enter your name..."
                  : scheduleStep ===
                    "email"
                  ? "Enter your email..."
                  : scheduleStep ===
                    "company"
                  ? "Company or type Skip..."
                  : scheduleStep ===
                    "reason"
                  ? "Reason for connecting..."
                  : scheduleStep ===
                    "date"
                  ? "Or type tomorrow, Friday..."
                  : scheduleStep ===
                    "dateConfirm"
                  ? "Confirm the date above..."
                  : scheduleStep ===
                    "slot"
                  ? "Select a time above..."
                  : scheduleStep ===
                    "confirm"
                  ? "Confirm the meeting above..."
                  : "Ask about Abhilash..."
              }
              className="
                min-w-0
                flex-1
                rounded-xl
                bg-slate-800
                px-4
                py-3
                text-sm
                text-white
                outline-none
                placeholder:text-gray-500
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            />

            <button
              onClick={() =>
                sendMessage()
              }
              disabled={
                loading ||
                scheduleStep ===
                  "slot" ||
                scheduleStep ===
                  "confirm" ||
                scheduleStep ===
                  "dateConfirm"
              }
              className="
                rounded-xl
                bg-blue-600
                px-4
                text-white
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
              aria-label="Send message"
            >
              <Send
                size={18}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}