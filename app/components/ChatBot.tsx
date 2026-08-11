"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Check,
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

export default function ChatBot() {
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: `Hi 👋 I'm Abhilash AI.

I can help you explore:

• Experience & career background  
• Technical skills & technologies  
• Projects and case studies  
• Job fit analysis  
• Cloud and migration experience  
• Certifications  
• **Schedule a 30-minute meeting with Abhilash**

For the fastest direct response, you can also reach Abhilash through **LinkedIn or email**.

Share a job description, ask about his experience, or ask me to schedule a meeting!`,
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, availableSlots, scheduleStep]);

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

  function resetScheduling() {
    setScheduleStep("idle");
    setBooking(initialBooking);
    setAvailableSlots([]);
  }

  function startScheduling() {
    setAvailableSlots([]);
    setBooking(initialBooking);
    setScheduleStep("name");

    addAIMessage(`Absolutely — I can help coordinate a **30-minute meeting with Abhilash**.

For the fastest direct response, you can also contact him through **LinkedIn or email**.

I'll collect a few details and then check his Google Calendar.

**First, what is your name?**`);
  }

  async function loadAvailability(date: string) {
    setLoading(true);
    setAvailableSlots([]);

    try {
      const response = await fetch("/api/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          timeZone: "America/Denver",
          meetingDurationMinutes: 30,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        addAIMessage(
          data.message ||
            data.error ||
            "I couldn't find availability for that date."
        );

        setScheduleStep("date");
        return;
      }

      const slots: AvailableSlot[] = data.availableSlots || [];

      if (slots.length === 0) {
        addAIMessage(`Abhilash doesn't currently have an available 30-minute slot on **${
          booking.dateDisplay || formatFriendlyDate(date)
        }**.

Please choose another weekday.`);

        setScheduleStep("date");
        return;
      }

      setAvailableSlots(slots);
      setScheduleStep("slot");

      addAIMessage(`I found available times for **${
        booking.dateDisplay || formatFriendlyDate(date)
      }**.

All times below are shown in **Mountain Time (MT)**.

Please select a 30-minute slot.`);
    } catch (error) {
      console.error("AVAILABILITY ERROR:", error);

      addAIMessage(
        "Sorry, I couldn't check Abhilash's calendar right now. You can still contact him directly through LinkedIn or email."
      );

      setScheduleStep("idle");
    } finally {
      setLoading(false);
    }
  }

  function selectSlot(slot: AvailableSlot) {
    setBooking((prev) => ({
      ...prev,
      start: slot.start,
      end: slot.end,
      displayTime: slot.display,
    }));

    setAvailableSlots([]);
    setScheduleStep("confirm");

    addUserMessage(slot.display);

    addAIMessage(`Please confirm the meeting details:

**Name:** ${booking.name}  
**Email:** ${booking.email}  
**Company:** ${booking.company || "Not provided"}  
**Reason:** ${booking.reason || "Not provided"}  
**Date:** ${booking.dateDisplay || booking.date}  
**Time:** ${slot.display} Mountain Time  
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
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: booking.name,
          email: booking.email,
          company: booking.company,
          reason: booking.reason,
          start: booking.start,
          end: booking.end,
          timeZone: "America/Denver",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (response.status === 409) {
          addAIMessage(`That time is no longer available.

Please choose another date and I'll check Abhilash's calendar again.`);

          setScheduleStep("date");

          setBooking((prev) => ({
            ...prev,
            date: "",
            dateDisplay: "",
            start: "",
            end: "",
            displayTime: "",
          }));

          return;
        }

        addAIMessage(
          data.error ||
            "I couldn't schedule the meeting. Please try again or contact Abhilash directly through LinkedIn or email."
        );

        return;
      }

      const meetLink = data.meeting?.meetLink || null;
      const calendarLink = data.meeting?.calendarLink || null;

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

Thank you for reaching out!

While you're here, feel free to explore **Abhilash's case studies, projects, experience, and technical background**.

You can also use the links below to view his **resume**, connect on **LinkedIn**, or send him an **email**.

Have a great day!`);

      resetScheduling();
    } catch (error) {
      console.error("SCHEDULE ERROR:", error);

      addAIMessage(`Sorry, something went wrong while scheduling the meeting.

Please contact Abhilash directly through **LinkedIn or email**, or try again.`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSchedulingInput(userMessage: string) {
    const value = userMessage.trim();

    if (!value) return;

    if (scheduleStep === "name") {
      setBooking((prev) => ({
        ...prev,
        name: value,
      }));

      addUserMessage(value);

      setScheduleStep("email");

      addAIMessage(
        `Thanks, ${value}. What is the best **email address** for the calendar invitation?`
      );

      return;
    }

    if (scheduleStep === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(value)) {
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

      setScheduleStep("company");

      addAIMessage(`What company or organization are you with?

If this doesn't apply, type **Skip**.`);

      return;
    }

    if (scheduleStep === "company") {
      const company =
        value.toLowerCase() === "skip" ? "" : value;

      setBooking((prev) => ({
        ...prev,
        company,
      }));

      addUserMessage(value);

      setScheduleStep("reason");

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

    if (scheduleStep === "reason") {
      const reason =
        value.toLowerCase() === "skip" ? "" : value;

      setBooking((prev) => ({
        ...prev,
        reason,
      }));

      addUserMessage(value);

      setScheduleStep("date");

      addAIMessage(`Great. What day would you prefer?

You can say things like:

• **Today**
• **Tomorrow**
• **Friday**
• **Next Monday**
• **August 14**
• **2026-08-14**

Scheduling is available **Monday through Friday, 9:00 AM–5:00 PM Mountain Time**.`);

      return;
    }

    if (scheduleStep === "date") {
      const parsedDate = parseNaturalDate(value);

      if (!parsedDate) {
        addAIMessage(`I couldn't understand that date.

You can say:

• **Today**
• **Tomorrow**
• **Friday**
• **Next Monday**
• **August 14**
• **2026-08-14**

Which day would you prefer?`);

        return;
      }

      const friendlyDate = formatFriendlyDate(parsedDate);

      const parsedDateObject = new Date(
        `${parsedDate}T12:00:00`
      );

      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const comparisonDate = new Date(parsedDateObject);

      comparisonDate.setHours(0, 0, 0, 0);

      if (comparisonDate < today) {
        addUserMessage(value);

        addAIMessage(`That date has already passed.

Please choose **today or a future weekday**.`);

        return;
      }

      setBooking((prev) => ({
        ...prev,
        date: parsedDate,
        dateDisplay: friendlyDate,
      }));

      addUserMessage(value);

      setScheduleStep("dateConfirm");

      addAIMessage(`You selected:

📅 **${friendlyDate}**

Is this the correct date?`);

      return;
    }
  }

  function confirmSelectedDate() {
    if (!booking.date) {
      setScheduleStep("date");

      addAIMessage(
        "Please choose a date again."
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
      "No, choose another date"
    );

    setBooking((prev) => ({
      ...prev,
      date: "",
      dateDisplay: "",
    }));

    setScheduleStep("date");

    addAIMessage(`No problem. What day would you prefer?

You can say **today**, **tomorrow**, **Friday**, **next Monday**, or enter a specific date.`);
  }

  async function sendMessage(question?: string) {
    const userMessage = question || input;

    if (!userMessage.trim()) return;

    setInput("");

    if (userMessage === "📅 Schedule a Meeting") {
      addUserMessage(
        "I'd like to schedule a meeting with Abhilash."
      );

      startScheduling();

      return;
    }

    if (scheduleStep !== "idle") {
      if (
        scheduleStep === "slot" ||
        scheduleStep === "confirm" ||
        scheduleStep === "dateConfirm"
      ) {
        return;
      }

      await handleSchedulingInput(userMessage);

      return;
    }

    const lower = userMessage.toLowerCase();

    const schedulingIntent =
      lower.includes("schedule") ||
      lower.includes("book a meeting") ||
      lower.includes("book meeting") ||
      lower.includes("set up a meeting") ||
      lower.includes("setup a meeting") ||
      lower.includes("meet with abhilash") ||
      lower.includes("speak with abhilash");

    if (schedulingIntent) {
      addUserMessage(userMessage);

      startScheduling();

      return;
    }

    addUserMessage(userMessage);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

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
      console.error("CHAT ERROR:", error);

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

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
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
      >
        {open ? (
          <X size={28} />
        ) : (
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
        )}
      </button>

      {open && (
        <div
          className={`
            fixed
            z-50
            flex
            flex-col
            overflow-hidden
            border
            border-blue-400/20
            bg-slate-950
            shadow-2xl
            transition-all
            duration-300
            rounded-3xl

            ${
              expanded
                ? "bottom-6 right-6 h-[90vh] w-[1100px] max-w-[calc(100vw-3rem)]"
                : "bottom-24 right-6 h-[85vh] w-[520px] max-w-[calc(100vw-2rem)]"
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
              p-5
            "
          >
            <img
              src="/abhilash.jpg"
              alt="Abhilash"
              className="
                h-16
                w-16
                rounded-full
                border
                border-blue-400
                object-cover
              "
            />

            <div>
              <h3 className="font-bold text-blue-400">
                Abhilash AI
              </h3>

              <p className="text-xs text-gray-400">
                Portfolio, Job Fit & Scheduling Assistant
              </p>

              <p className="text-xs text-green-400">
                ● Online
              </p>
            </div>

            <div className="ml-auto flex gap-2">
              <button
                onClick={() =>
                  setExpanded(!expanded)
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
              >
                {expanded ? (
                  <Minimize2 size={16} />
                ) : (
                  <Maximize2 size={16} />
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
            <p
              className="
                mb-3
                text-xs
                font-semibold
                text-blue-400
              "
            >
              Try asking
            </p>

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              {suggestedQuestions.map(
                (question) => (
                  <button
                    key={question}
                    onClick={() =>
                      sendMessage(question)
                    }
                    disabled={loading}
                    className={`
                      rounded-full
                      border
                      px-3
                      py-2
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

            <div
              className="
                mt-3
                rounded-lg
                bg-blue-500/10
                p-2
                text-xs
                text-blue-300
              "
            >
              🎯 Paste a Data/Analytics job description for a match score
              <br />
              📅 I can also help schedule a 30-minute meeting with Abhilash
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
              (message, index) => (
                <div
                  key={index}
                  className={`
                    rounded-xl
                    p-3
                    text-base
                    leading-relaxed
                    break-words

                    ${
                      message.role === "user"
                        ? "ml-8 bg-blue-600 text-white"
                        : "mr-8 bg-slate-800 text-gray-200"
                    }
                  `}
                >
                  <ReactMarkdown>
                    {message.text}
                  </ReactMarkdown>
                </div>
              )
            )}

            {scheduleStep ===
              "dateConfirm" && (
              <div
                className="
                  mr-8
                  flex
                  flex-wrap
                  gap-2
                "
              >
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
                    px-5
                    py-3
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
                  Yes, Check Availability
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
                    px-5
                    py-3
                    text-sm
                    text-gray-300
                    hover:bg-slate-800
                  "
                >
                  Choose Another Date
                </button>
              </div>
            )}

            {scheduleStep ===
              "slot" &&
              availableSlots.length >
                0 && (
                <div
                  className="
                    mr-8
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
                      gap-2
                      text-sm
                      font-semibold
                      text-cyan-300
                    "
                  >
                    <Calendar
                      size={16}
                    />
                    Available Times
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
                      (slot) => (
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

                  <p
                    className="
                      mt-3
                      text-xs
                      text-gray-500
                    "
                  >
                    Mountain Time •
                    30-minute meeting
                  </p>
                </div>
              )}

            {scheduleStep ===
              "confirm" && (
              <div
                className="
                  mr-8
                  flex
                  flex-wrap
                  gap-2
                "
              >
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
                    px-5
                    py-3
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
                  onClick={() => {
                    setScheduleStep(
                      "date"
                    );

                    setAvailableSlots(
                      []
                    );

                    setBooking(
                      (prev) => ({
                        ...prev,
                        date: "",
                        dateDisplay:
                          "",
                        start: "",
                        end: "",
                        displayTime:
                          "",
                      })
                    );

                    addAIMessage(
                      "No problem. Please choose another date."
                    );
                  }}
                  className="
                    rounded-lg
                    border
                    border-gray-600
                    px-5
                    py-3
                    text-sm
                    text-gray-300
                    hover:bg-slate-800
                  "
                >
                  Choose Another Time
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
                Abhilash AI is working...
              </div>
            )}

            <div ref={messagesEndRef} />
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
              <Calendar size={13} />
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
                  ? "Today, tomorrow, Friday..."
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
                flex-1
                rounded-xl
                bg-slate-800
                px-4
                py-4
                text-sm
                text-white
                outline-none
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