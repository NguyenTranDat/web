import React, { useState, useEffect } from 'react';
import { getUserID } from "./consequence";

export const UserIDContext = React.createContext(null);

function UserID({ children }) {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getUserID();
      setUserID(res);
    }

    fetchData();
  }, []);

  return (
    <UserIDContext.Provider value={userID}>
      {children}
    </UserIDContext.Provider>
  );
}

export default UserID;
