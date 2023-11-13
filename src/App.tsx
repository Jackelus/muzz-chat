import { useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import ChatsList from "./components/ChatsList";
import { Message, User, State } from "./types";
import sampleUsers from "./sampleUsers.json";

function reducer(
  state: State,
  {
    type,
    payload,
  }: {
    type: string;
    payload: {
      id?: number;
      updatedUser?: User;
      userId: number;
      messages: Message[];
    };
  }
) {
  switch (type) {
    case "selectUser":
      return {
        ...state,
        selectedUser: payload.id,
      };
    case "updateMessages": {
      const updatedUsers = state.users.map((user) => {
        if (user.id === payload.userId) {
          return {
            ...user,
            messages: payload.messages,
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
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    selectedUser: "",
    users: sampleUsers,
  });

  function handleSelectUser(userId: number) {
    dispatch({ type: "selectUser", payload: { id: userId } });
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
    state.users.find((user: User) => user.id === state.selectedUser) ?? {};

  return (
    <>
      <Header />
      <div className="flex w-full">
        <ChatsList users={state.users} handleSelectUser={handleSelectUser} />
        <ChatWindow
          user={selectedUser}
          handleUpdateMessages={handleUpdateMessages}
        />
      </div>
    </>
  );
}
export default App;
