import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

export const AuthProvider = (props) => {
  const userStored = localStorage.getItem("user");
  const parsedUser = parseJson(userStored);
  console.log(parsedUser);
  const [user, setUser] = useState(parsedUser?.userId || null);
  const val = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={val}>{props.children}</AuthContext.Provider>
  );
};