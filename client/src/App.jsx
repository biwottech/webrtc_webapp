import { Routes, Route } from "react-router-dom";
import Lobby from "./components/Lobby";
import Room from "./components/Room";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

