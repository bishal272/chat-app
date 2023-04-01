import "./app.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

export default function App() {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved]=useState("");

  const sendMessage = () => {
    socket.emit("message", { message });
  };
  useEffect(() => {
    socket.on("recieved-message", (data) => {
      setMessageRecieved(data.message);
    });
  });
  return (
    <div className="parent">
      <div className="child">
      <input
      
        type="text"
        placeholder="enter message"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button className="sendButton" onClick={sendMessage}>Send</button>
      <h1>messages:</h1>
      {messageRecieved}
      </div>
      
    </div>
  );
}
