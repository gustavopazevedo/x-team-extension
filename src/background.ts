import { fetchMessages, saveMessagesToStorage } from "./services";
import { EAlarmNames, TMessage } from "./types";

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason !== "install") return;

  const messages: TMessage[] = await fetchMessages(5);

  if (messages.length) {
    saveMessagesToStorage(messages);
  }

  await chrome.alarms.create(EAlarmNames.CheckNewMessages, {
    periodInMinutes: 1,
  });
});

chrome.alarms.onAlarm.addListener(async ({ name }) => {
  const alarms = {
    [EAlarmNames.CheckNewMessages]: async () => {
      const messages = await fetchMessages();
      saveMessagesToStorage(messages);
      return true;
    },
  }![name as EAlarmNames];

  await alarms();
});
