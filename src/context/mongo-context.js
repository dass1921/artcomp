import { createContext, useEffect, useState } from "react";
import * as Realm from "realm-web";
const APP_ID = "artcomp-github-cwvac";
export const MongoContext = createContext(null);
const mongoRealm = new Realm.App({ id: APP_ID });
const credentials = Realm.Credentials.anonymous();
export const MongoContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      mongoRealm.logIn(credentials).then((u) => setUser(u));
    } catch (err) {
      console.error("Failed to log in", err);
    }
  }, []);

  return (
    <MongoContext.Provider value={{ id: APP_ID }}>
      {children}
    </MongoContext.Provider>
  );
};
