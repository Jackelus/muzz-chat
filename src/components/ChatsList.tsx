import React from "react";
import { User } from "../App";

interface ChatsListProps {
  users: User[];
  handleSelectUser: (id: number) => void;
}

const ChatsList: React.FC<ChatsListProps> = ({ users, handleSelectUser }) => {
  return (
    <div className="flex flex-col w-2/3 p-4 bg-gray-200">
      {users.map((user) => (
        <div
          key={`user-${user.id}`}
          className="flex items-center mb-4 cursor-pointer hover:bg-gray-300"
          onClick={() => handleSelectUser(user.id)}
        >
          <img
            src={user.userPhotoUrl}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <span className="text-lg">{user.name}</span>
          {/* <div>{user.lastMsg}</div> */}
          {/* <div>{user.read}</div> */}
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
