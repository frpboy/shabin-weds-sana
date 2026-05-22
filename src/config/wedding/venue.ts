const calendarTitle = encodeURIComponent("Wedding Celebration: Muhammed Shabin & Sana Subair");
const calendarDetails = encodeURIComponent(
  "You are joyfully invited to celebrate the wedding of Muhammed Shabin & Sana Subair.\n\nDate: Sunday, July 19, 2026\nTime: 4:30 PM onward IST\nVenue: Shifa Convention Center\nGoogle Maps: https://maps.app.goo.gl/JDr5v3dgUuwPNbnJA\n\nWe look forward to your presence and heartfelt prayers."
);
const calendarLocation = encodeURIComponent("Shifa Convention Center, Perinthalmanna, Kerala");

export const venue = {
  date: "2026-07-19T16:30:00+05:30",
  day: "Sunday",
  time: "4:30 PM onward",
  venue: "Shifa Convention Center",
  address: "Perinthalmanna, Kerala",
  mapsUrl: "https://maps.app.goo.gl/JDr5v3dgUuwPNbnJA",
  calendarUrl: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&dates=20260719T110000Z%2F20260719T160000Z&details=${calendarDetails}&location=${calendarLocation}`,
} as const;
