import { useState, useEffect } from "react";
import Message from "../Message/Message";
import { EAlarmNames, TMessage } from "@/types";
import {
  getMessagesFromStorage,
  getUnreadMessagesCount,
  saveMessagesToStorage,
} from "@/services";

type TMessageListProps = {
  onUpdateUnreadMessages?: (count: number) => void;
};

const MessageList = ({ onUpdateUnreadMessages }: TMessageListProps) => {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [messagesChecked, setMessagesChecked] = useState<string[]>([]);

  const handleOnChangeMessage = (id: string) => {
    const newMessagesChecked: string[] = [...messagesChecked];

    if (newMessagesChecked.includes(id)) {
      setMessagesChecked(
        newMessagesChecked.filter((messageId) => id !== messageId)
      );
      return;
    }

    newMessagesChecked.push(id);

    setMessagesChecked(newMessagesChecked);
  };

  const handleMarkAsRead = () => {
    const newMessages = structuredClone(messages);

    messagesChecked.forEach((messageId) => {
      const messageIndex = newMessages.findIndex(
        (message) => message.id === messageId
      );

      newMessages[messageIndex].read = true;
    });

    if (typeof onUpdateUnreadMessages === "function") {
      onUpdateUnreadMessages(getUnreadMessagesCount(newMessages));
    }

    saveMessagesToStorage(newMessages, true);
    setMessagesChecked([]);
    setMessages(newMessages);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && messages) {
      const messagesChecked = messages?.map((message) => message?.id);

      setMessagesChecked([...messagesChecked]);
      return;
    }

    setMessagesChecked([]);
  };

  const getAndSetMessagesFromStorage = async () => {
    const messagesOnStorage = await getMessagesFromStorage();
    if (messagesOnStorage.length > 0) {
      setMessages(messagesOnStorage);

      if (typeof onUpdateUnreadMessages === "function") {
        onUpdateUnreadMessages(getUnreadMessagesCount(messagesOnStorage));
      }
      return;
    }

    return;
  };

  const hasMessagesChecked = () => {
    return messagesChecked?.length > 0;
  };

  useEffect(() => {
    getAndSetMessagesFromStorage();
  }, []);

  useEffect(() => {
    (async () => {
      const checkNewMessagesAlarm = await chrome.alarms.get(
        EAlarmNames.CheckNewMessages
      );

      const scheduledTime = new Date().getTime();
      const currentTime = new Date(
        checkNewMessagesAlarm.scheduledTime
      ).getTime();

      const timeDifferenceInMs = scheduledTime - currentTime;

      setTimeout(async () => {
        await getAndSetMessagesFromStorage();
      }, timeDifferenceInMs);
    })();
  }, [messages]);

  return (
    <div className="w-full">
      <div className="flex w-full justify-between border-b border-b-neutral-300 p-4">
        <label className="flex items-center gap-x-2 text-sm">
          <span className="flex">
            <input
              type="checkbox"
              checked={messagesChecked?.length === messages?.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </span>
          Select all
        </label>
        {hasMessagesChecked() && (
          <button className="text-sm" onClick={() => handleMarkAsRead()}>
            Mark as read
          </button>
        )}
      </div>
      <div className="w-full overflow-y-scroll" style={{ maxHeight: "485px" }}>
        {messages?.map((message) => (
          <Message
            key={message?.id}
            checked={messagesChecked.includes(message?.id)}
            {...message}
            onChange={() => handleOnChangeMessage(message.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
