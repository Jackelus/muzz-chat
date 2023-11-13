import React, { useState, useEffect, useCallback, useRef } from "react";
import { User, Message } from "../types";
import { simulateIncomingMessages, genRandomMs } from "../helpers/";

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

const ChatMessage = ({ text, date, toUserId }: Message) => {
  const received = toUserId === 1;
  return (
    <div className={`message ${received ? "left" : "right"}`}>
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
  const latestSubmission = useRef<{
    userId: number;
    updatedMessages: Message[];
  } | null>(null);

  async function handleIncMessage({ userId, name, messages }) {
    console.log({ userId, name, messages });

    const incMessageResponse = await simulateIncomingMessages(name);
    // response from api is an array of 1 message
    const incMessage = incMessageResponse[0].content;
    const newMessage: Message = {
      text: incMessage,
      date: new Date(),
      toUserId: 1, // hardcode to 1 for user in active seesion
      fromUserId: userId,
      read: false,
    };
    const updatedMessages = [...(messages ?? []), newMessage];
    // randomly delay receiving message from 1-5 seconds
    // check if latest submission is still the same as the current one
    setTimeout(() => {
      if (
        latestSubmission.current.userId === userId &&
        latestSubmission.current.updatedMessages === messages
      ) {
        handleUpdateMessages({ userId, updatedMessages });
      }
    }, genRandomMs());
  }

  return (
    <div className="container">
      <div>ChatWindow</div>
      <div className="messages-container w-full">
        {!user ? (
          <div>Select a user to chat with</div>
        ) : (
          user.messages?.length > 0 &&
          user.messages.map(({ text, date, toUserId }, index) => (
            <ChatMessage
              key={`user-${toUserId}-${index}`}
              text={text}
              date={date}
              toUserId={toUserId}
            />
          ))
        )}
      </div>
      <form
        className="flex w-full gap-2"
        onSubmit={async (evt) => {
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
          latestSubmission.current = { userId: user.id, updatedMessages };
          setMessageInput("");
          handleIncMessage({
            userId: user.id,
            name: user.name,
            messages: updatedMessages,
          });
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
