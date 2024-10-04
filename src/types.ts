export type TMessage = {
  id: string;
  content: string;
  priority: "low" | "medium" | "high";
  timestamp: string;
  read: boolean;
};

export enum EAlarmNames {
  CheckNewMessages = "CHECK_NEW_MESSAGES",
}

export enum EMessageTypes {
  FetchMessages = "FETCH_MESSAGES",
}

export enum EStorageKeys {
  MessagesStore = "MESSAGES_STORE",
}
