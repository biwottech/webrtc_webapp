import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { useAuth } from "../context/AuthProvider";
import ContactList from "./ContactList";
import Chat from "./Chat";

export default function Lobby() {
  const [userDetail, setUserDetail] = useState({
    email: "",
    room: "",
  });
  const [activeComponent, setActiveComponent] = useState('chat');
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);

  const socket = useSocket();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setUserDetail(prev => ({
      ...prev,
      email: user ? user : ""
    }))
  }, [user]);

  const handleUserDetail = (e) => {
    setUserDetail({
      ...userDetail,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", userDetail);
      console.log(userDetail)
    },
    [socket, userDetail]
  );

  const handleJoinRoom = useCallback((data) => {
    const { room } = data;
    navigate(`/room/${room}`);
  }, [navigate])

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => socket.off("room:join", handleJoinRoom);
  }, [socket, handleJoinRoom])

  const handleContactClick = (contact) => {
    setActiveContact(contact);
    setActiveComponent('chat');
    console.log(contact)
  };

  const handleSendMessage = (contact, text) => {
    const newMessage = { sender: 'You', text, contactId: contact.id };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex h-screen">
      <h2 className="font-semibold text-lg mb-4">Lobby</h2>

      <ContactList onContactClick={handleContactClick} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="room">Room ID</label>
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full p-2 mb-4 border rounded"
          id="room"
          value={userDetail.room}
          onChange={handleUserDetail}
        />
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="flex-1">
        {activeComponent === 'chat' && (
          <Chat contact={activeContact} messages={messages} onSendMessage={handleSendMessage} />
        )}
      </div>
    </div>
  );
}
