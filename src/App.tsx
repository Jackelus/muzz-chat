import { useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import ChatsList from "./components/ChatsList";

export type Message = {
  text: string;
  date: Date;
  read: boolean;
  fromUserId: number;
  toUserId: number;
};

export type User = {
  name: string;
  id: number;
  userPhotoUrl: string;
  messages: Message[];
};

type State = {
  selectedUser: string;
  users: User[];
};

const mockUsers: User[] = [
  {
    id: 2,
    name: "Ada Lovelace",
    userPhotoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Ada_Byron_daguerreotype_by_Antoine_Claudet_1843_or_1850_-_cropped.png/250px-Ada_Byron_daguerreotype_by_Antoine_Claudet_1843_or_1850_-_cropped.png",
    messages: [],
  },
  {
    id: 3,
    name: "Albert Einstein",
    userPhotoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/250px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg",
    messages: [],
  },
  {
    id: 4,
    name: "Tim Berners-Lee",
    userPhotoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg/250px-Sir_Tim_Berners-Lee_%28cropped%29.jpg",
    messages: [],
  },
];

// for the updatemsgs, could use array methods to find user and spread new messages array.
// need to sort how to populates users on inital render

function reducer(
  state: State,
  { type, payload }: { type: string; payload: Record<string, any> }
) {
  switch (type) {
    case "selectUser":
      return {
        ...state,
        selectedUser: state.selectedUser === payload.id ? "" : payload.id,
      };
    case "updateMessages":
      return {
        ...state,
        users: [
          ...state.users.filter((user) => user.id !== payload.id),
          payload.updatedUser,
        ],
      };

    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    selectedUser: "",
    users: mockUsers,
  });

  console.log({ state });

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

  return (
    <>
      <Header />
      <div className="flex w-full">
        <ChatsList users={state.users} handleSelectUser={handleSelectUser} />
        <ChatWindow
          user={state.selectedUser ?? null}
          handleUpdateMessages={handleUpdateMessages}
        />
      </div>
    </>
  );
}
export default App;

// message state to look something like this:
// { user: { name: "John", id: 1, photo: "url" }, messages: [{ text: "hello", date: "2021-01-01" }] }
// state for sent messages to look something like this:

// TODO: not sure below will work as won't be sure of previous date
// unless way to comapre keys of object date and filter to get only within last hour.

// messages: { Sun 12 Nov 19.42: [
// { fromUser: 1, text: "hello", date: "2021-01-01" },
// { fromUser: 2, text: "hello you there", date: "2021-01-01" },]
// Mon 13 Nov 19.42: [
// { fromUser: 1, text: "hello", date: "2021-01-01" },
// { fromUser: 2, text: "hello you there", date: "2021-01-01" },]
// }

// { toUser: 1, text: "hello", date: "2021-01-01" }

// update state with new messages from mock user
// update state with new messages from user

// mock users for programming quotes api:
// ["Ada Lovelace", "Albert Einstein", "Tim Berners-Lee" ]

//To get author's image:
// https://en.wikipedia.org/w/api.php?action=query&titles=Fred%20Brooks&prop=pageimages&format=json&pithumbsize=250

// GET /quotes/author/{author}
// This endpoint returns a random programming quote from the specified author.

// fetch('http://programming-quotes-api.herokuapp.com/quotes/author/Steve%20Jobs')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

// muzz pink #E8506E
