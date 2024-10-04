import { EStorageKeys, TMessage } from "./types";

export async function fetchMessages(count?: number) {
  const params = new URLSearchParams({
    count: String(count) || "1",
  });

  try {
    const result = await fetch(`http://localhost:3000/messages?${params}`);
    const json = await result.json();

    return json?.messages;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMessagesFromStorage() {
  const messagesStored = await chrome.storage.local
    .get([EStorageKeys.MessagesStore])
    .then((result) => result?.[EStorageKeys.MessagesStore]);

  if (messagesStored?.messages) {
    const sortedMessages = messagesStored?.messages?.sort(
      (a: TMessage, b: TMessage) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return sortedMessages;
  }

  return [];
}

export async function saveMessagesToStorage(
  messages: TMessage[],
  useOnlyNewMessages: boolean = false
) {
  const previousMessages = await getMessagesFromStorage();
  const newMessages = useOnlyNewMessages
    ? messages
    : [...previousMessages, ...messages];
  const unreadMessagesCount = getUnreadMessagesCount(newMessages);

  await chrome.storage.local
    .set({
      [EStorageKeys.MessagesStore]: {
        messages: newMessages,
      },
    })
    .then(() => {
      if (unreadMessagesCount > 0) {
        setBadgeProperties({
          backgroundColor: "red",
          color: "white",
          text: `${getUnreadMessagesCount(newMessages)}`,
        });

        return;
      }

      setBadgeProperties({ text: "" });
      console.log("Saved");
    });
}

export function getUnreadMessagesCount(messages: TMessage[]) {
  return messages?.filter((message) => !message.read).length;
}

export function setBadgeProperties({
  backgroundColor,
  color,
  text,
}: {
  backgroundColor?: string;
  color?: string;
  text?: string;
}) {
  if (backgroundColor || backgroundColor?.length === 0) {
    chrome.action.setBadgeBackgroundColor({
      color: backgroundColor,
    });
  }

  if (color || color?.length === 0) {
    chrome.action.setBadgeTextColor({
      color,
    });
  }

  if (text || text?.length === 0) {
    chrome.action.setBadgeText({ text });
  }

  return;
}
