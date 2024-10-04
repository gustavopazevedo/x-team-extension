import { Header, MessageList } from "@/components";
import { useState } from "react";

function App() {
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  return (
    <div className="w-screen bg-white">
      <Header {...{ unreadMessagesCount }} />
      <MessageList
        onUpdateUnreadMessages={(count) => setUnreadMessagesCount(count)}
      />
    </div>
  );
}

export default App;
