import React from "react";
import { User } from "../types";

interface ChatsListProps {
  users: User[];
  handleSelectUser: (id: number) => void;
}

const ChatsList: React.FC<ChatsListProps> = ({ users, handleSelectUser }) => {
  return (
    <div className="flex flex-col w-2/3 p-4 bg-gray-200">
      <div className="flex items-center rounded p-4 mb-4 bg-gray-300">
        <img
          src="https://github.com/Jackelus.png"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <h1 className="text-xl font-bold">My Profile</h1>
        <div className="ml-auto">
          <button>
            <svg
              className="h-10 w-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none" />
              <circle
                cx="116"
                cy="116"
                r="84"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="8"
              />
              <line
                x1="175.4"
                y1="175.4"
                x2="224"
                y2="224"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="8"
              />
            </svg>
          </button>
        </div>
      </div>
      <span className="text-left pl-2 text-xl mb-2">Chats</span>
      <div className="flex flex-col gap-1 w-full overflow-y-auto divide-y divide-[#E8506E]">
        {users.map((user) => (
          <div
            key={`user-${user.id}`}
            className="flex items-center p-2 cursor-pointer hover:bg-gray-300  hover:border-[#E8506E] "
            onClick={() => handleSelectUser(user.id)}
          >
            <img
              src={user.userPhotoUrl}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <span className="text-lg">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatsList;
