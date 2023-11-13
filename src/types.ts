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

export type State = {
  selectedUser: string;
  users: User[];
};
