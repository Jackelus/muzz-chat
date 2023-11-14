import { format, isToday, isYesterday, differenceInHours } from "date-fns";

export function genRandomMs() {
  // Returns a random number between 0 and 35 seconds, in milliseconds
  return Math.floor(Math.random() * 35000);
}

export function dateCalculator(msgDate: Date, lastMsgDate: Date) {
  const diffInHours = differenceInHours(msgDate, lastMsgDate);
  if (diffInHours < 1) {
    return false;
  } else if (isToday(msgDate)) {
    return format(msgDate, "'Today' h:mm a");
  } else if (isYesterday(msgDate)) {
    return format(msgDate, "'Yesterday' h:mm a");
  } else {
    return format(msgDate, "EEE d MMM h:mm a");
  }
}

export function simulateIncomingMessages(authorName: string) {
  const authorNameUrl = authorName.replace(/ /g, "%20");
  return fetch(`https://api.quotable.io/quotes/random?author=${authorNameUrl}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}
