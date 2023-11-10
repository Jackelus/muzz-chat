import React, { useState } from "react";

type ChatMessage = {
  text: string;
  date: Date;
};

const ChatMessage = ({ text, date }: ChatMessage) => {
  return (
    <div>
      <p>{text}</p>
      <p>{date.toString()}</p>
    </div>
  );
};

export const ChatWindow = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage: ChatMessage = { text: messageInput, date: new Date() };
    setMessages([newMessage, ...messages]);
    setMessageInput("");
  };

  return (
    <>
      <div>ChatWindow</div>
      {messages?.length > 0 &&
        messages.map((msg, index) => (
          <ChatMessage key={index} text={msg.text} date={msg.date} />
        ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={messageInput}
          onChange={(evt) => setMessageInput(evt.target.value)}
        />
        <button className="w-10 h-10" type="submit">
          Send
        </button>
      </form>
    </>
  );
};
