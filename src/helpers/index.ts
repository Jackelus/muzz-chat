export function genRandomMs() {
  // Returns a random number between 0 and 10 seconds, in milliseconds
  return Math.floor(Math.random() * 1e4);
}

function prettifyDate(timestamp) {
  // Returns the date in hh:mm am/pm format
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(timestamp).toLocaleTimeString("en-US", options);
}

export function simulateIncomingMessages(authorName: string) {
  const authorNameUrl = authorName.replace(/ /g, "%20");
  return fetch(`https://api.quotable.io/quotes/random?author=${authorNameUrl}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}
