import React, { useState } from "react";
import { User, Message } from "../App";

interface ChatWindowProps {
  user: User | null;
  handleUpdateMessages: ({
    userId,
    updatedMessages,
  }: {
    userId: number;
    updatedMessages: Message[];
  }) => void;
}

const ChatMessage = ({ text, date }: Message) => {
  return (
    <div className="message right">
      <p>{text}</p>
    </div>
  );
};

const ChatWindow: React.FC<ChatWindowProps> = ({
  user,
  handleUpdateMessages,
}) => {
  // const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");

  return (
    <div className="container">
      <div>ChatWindow</div>
      <div className="messages-container w-full">
        {user.messages?.length > 0 &&
          user.messages.map((msg, index) => (
            <ChatMessage key={index} text={msg.text} date={msg.date} />
          ))}
      </div>
      <form
        className="flex w-full gap-2"
        onSubmit={(evt) => {
          evt.preventDefault();
          const newMessage: Message = {
            text: messageInput,
            date: new Date(),
            toUserId: user.id,
            fromUserId: 1,
            read: false,
          };
          const updatedMessages = [...user.messages, newMessage];
          handleUpdateMessages({ userId: user.id, updatedMessages });
          setMessageInput("");
        }}
      >
        <input
          type="text"
          placeholder={`Message ${user?.name ?? "User"}`}
          value={messageInput}
          onChange={(evt) => setMessageInput(evt.target.value)}
          className="w-full"
        />
        <button className="w-20 rounded-full" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
export default ChatWindow;
