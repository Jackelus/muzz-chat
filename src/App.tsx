import { useReducer, Reducer } from "react";
import "./App.css";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import ChatsList from "./components/ChatsList";
import { Message, User, State, Action } from "./types";
import sampleUsers from "./sampleUsers.json";

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "selectUser":
      return {
        ...state,
        selectedUser: action.payload.userId,
      };
    case "updateMessages": {
      const updatedUsers = state.users.map((user) => {
        if (user.id === action.payload.userId) {
          return {
            ...user,
            messages: action.payload.messages ?? [],
          };
        }
        return user;
      });
      return {
        ...state,
        users: updatedUsers,
      };
    }

    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    selectedUser: 0,
    users: sampleUsers,
  });

  function handleSelectUser(userId: number) {
    dispatch({ type: "selectUser", payload: { userId } });
  }

  function handleUpdateMessages({
    userId,
    updatedMessages,
  }: {
    userId: number;
    updatedMessages: Message[];
  }) {
    dispatch({
      type: "updateMessages",
      payload: { userId, messages: updatedMessages },
    });
  }

  const selectedUser =
    state.users.find((user: User) => user.id === state.selectedUser) ?? null;

  return (
    <div>
      <Header />
      <div className="flex gap-2 rounded w-full">
        <ChatsList users={state.users} handleSelectUser={handleSelectUser} />
        <ChatWindow
          user={selectedUser}
          handleUpdateMessages={handleUpdateMessages}
        />
      </div>
    </div>
  );
}

export default App;
