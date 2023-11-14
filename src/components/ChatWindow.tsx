import React, { useState, useRef } from "react";
import { User, Message } from "../types";
import {
  simulateIncomingMessages,
  genRandomMs,
  dateCalculator,
} from "../helpers/";
import { differenceInSeconds } from "date-fns";

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

const ChatMessage = ({
  text,
  toUserId,
  closeGrouping,
}: {
  text: string;
  toUserId: number;
  closeGrouping: boolean;
}) => {
  const received = toUserId === 1;
  return (
    <div
      className={`message ${closeGrouping ? "mt-1" : "mt-4"} ${
        received ? "left" : "right"
      }`}
    >
      <p className="text-left pl-2">{text}</p>
    </div>
  );
};

const ChatWindow: React.FC<ChatWindowProps> = ({
  user,
  handleUpdateMessages,
}) => {
  const [messageInput, setMessageInput] = useState<string>("");
  const latestSubmission = useRef<{
    userId: number;
    updatedMessages: Message[];
  } | null>(null);

  async function handleIncMessage({
    userId,
    name,
    messages,
  }: {
    userId: number;
    name: string;
    messages: Message[];
  }) {
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
    // randomly delay receiving message from 1-40 seconds
    // check if latest submission is still the same as the current one
    setTimeout(() => {
      if (
        latestSubmission?.current?.userId === userId &&
        latestSubmission?.current.updatedMessages === messages
      ) {
        handleUpdateMessages({ userId, updatedMessages });
      }
    }, genRandomMs());
  }

  return (
    <div className="container w-full">
      {user && (
        <div className="flex justify-center py-4 bg-[#E8506E]">
          <img
            src={user.userPhotoUrl}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
        </div>
      )}
      <div className="messages-container w-full">
        {!user ? (
          <div className="flex flex-col w-full h-full justify-center items-center">
            <svg
              className="h-20 w-20 fill-mm-pink"
              viewBox="0 0 47 48"
              fill="#E8506E"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M39.4135 5.85809C37.1986 5.57021 35.0366 6.10288 32.62 7.52659C29.9704 9.09129 27.5401 11.2259 25.3977 13.8696C24.7299 14.6941 24.1013 15.546 23.4962 16.3978L23.4942 16.3959C22.8891 15.544 22.2644 14.6921 21.5966 13.8696C19.4542 11.2239 17.0239 9.09129 14.3742 7.52659C11.9616 6.10288 9.80154 5.57021 7.58666 5.85809C3.32141 6.40446 0.31341 10.6991 0.176327 14.3631C0.0686185 17.2693 1.24558 19.678 2.13662 21.2369C3.82079 24.1763 6.42537 27.0375 9.74866 29.7948L9.5822 30.2609C8.62654 32.744 8.27208 35.0862 8.74012 37.7476C9.27279 40.7693 11.7716 42.5318 14.809 42.1695C16.5754 41.96 18.0324 41.161 19.3602 40.0545C21.0287 38.6641 22.3407 36.9819 23.4962 35.1783C24.6535 36.9819 25.9637 38.6641 27.6322 40.0545C28.9599 41.161 30.4169 41.96 32.1833 42.1695C35.2207 42.5318 37.7195 40.7693 38.2522 37.7476C38.7202 35.0862 38.3658 32.744 37.4101 30.2609L37.2437 29.7948C40.567 27.0375 43.1715 24.1763 44.8557 21.2369C45.7487 19.678 46.9237 17.2673 46.816 14.3631C46.6867 10.6991 43.6787 6.40446 39.4135 5.85809Z"
              ></path>
            </svg>
            <div>Select a user to chat with</div>
          </div>
        ) : (
          user.messages?.length > 0 &&
          user.messages.map(({ text, date, toUserId, fromUserId }, index) => {
            const prevMsg = user.messages[index - 1] ?? {};
            let closeGrouping;
            let formattedDate;
            if (
              !!prevMsg &&
              differenceInSeconds(date, prevMsg.date) < 20 &&
              index > 0
            ) {
              closeGrouping = prevMsg.fromUserId === fromUserId ? true : false;
            }
            if (prevMsg || index === 0)
              formattedDate = dateCalculator(date, prevMsg.date);

            return (
              <div key={`user-${toUserId}-${index}`} className="flex flex-col">
                {!!formattedDate && <span>{formattedDate}</span>}
                <ChatMessage
                  closeGrouping={closeGrouping ?? false}
                  text={text}
                  toUserId={toUserId}
                />
              </div>
            );
          })
        )}
      </div>
      {user && (
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
            placeholder={`Message ${user?.name ?? "User"}...`}
            value={messageInput}
            onChange={(evt) => setMessageInput(evt.target.value)}
            className="w-full bg-gray-200 rounded-full p-4 pl-6 ml-2 mb-2"
          />
          <button
            className="w-20 rounded-full bg-[#E8506E] mb-2 mr-2 text-white font-bold"
            type="submit"
            disabled={!messageInput}
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};
export default ChatWindow;
