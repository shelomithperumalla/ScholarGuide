/**
 * Calendar Sync Utilities
 * Helps users add scholarship deadlines to Google Calendar or download .ics files
 * for Apple Calendar, Outlook, and other calendar apps.
 */

// Parse a deadline string (e.g. "31 Jul 2026", "2026-07-31") to a Date object
export function parseDeadline(deadlineStr) {
  if (!deadlineStr) return null;
  const date = new Date(deadlineStr);
  if (isNaN(date.getTime())) return null;
  return date;
}

// Format a Date as YYYYMMDD (all-day calendar format, avoids timezone issues)
function formatDateAllDay(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

// Get the next day as YYYYMMDD (calendar end dates are exclusive)
function nextDay(date) {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return formatDateAllDay(d);
}

// Build a description string with scholarship details
function buildDescription(scholarship) {
  const parts = [`Scholarship: ${scholarship.name}`];
  if (scholarship.amount) parts.push(`Amount: ${scholarship.amount}`);
  if (scholarship.institutedBy) parts.push(`Instituted by: ${scholarship.institutedBy}`);
  if (scholarship.applyUrl) parts.push(`Apply here: ${scholarship.applyUrl}`);
  return parts.join('\n');
}

// Generate a Google Calendar "Add Event" URL (opens Google Calendar with pre-filled event)
export function generateGoogleCalendarUrl(scholarship) {
  const date = parseDeadline(scholarship.deadline);
  if (!date) return null;

  const start = formatDateAllDay(date);
  const end = nextDay(date);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Deadline: ${scholarship.name}`,
    dates: `${start}/${end}`,
    details: buildDescription(scholarship),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Escape special characters for ICS format
function escapeICS(text) {
  return (text || '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

// Generate ICS file content for one or more scholarships
export function generateICSContent(scholarships) {
  const valid = scholarships.filter((s) => parseDeadline(s.deadline));
  if (valid.length === 0) return null;

  const now = new Date();
  const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  let lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ScholarGuide//Calendar Sync//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  valid.forEach((s) => {
    const date = parseDeadline(s.deadline);
    const start = formatDateAllDay(date);
    const end = nextDay(date);

    lines = [
      ...lines,
      'BEGIN:VEVENT',
      `UID:${s.id || Date.now()}-${escapeICS(s.name)}@scholarguide`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end}`,
      `SUMMARY:Deadline: ${escapeICS(s.name)}`,
      `DESCRIPTION:${escapeICS(buildDescription(s))}`,
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: ${escapeICS(s.name)} deadline tomorrow!`,
      'END:VALARM',
      'END:VEVENT',
    ];
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

// Download an ICS file with the given scholarships' deadlines
export function downloadICSFile(scholarships, filename = 'scholarship-deadlines.ics') {
  const content = generateICSContent(scholarships);
  if (!content) return false;

  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}

// Check if a scholarship has a valid (parseable) deadline
export function hasValidDeadline(scholarship) {
  return parseDeadline(scholarship.deadline) !== null;
}