import localForage from "localforage";
import { createContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Realm from "realm-web";

export const MongoContext = createContext(null);

export const MongoContextProvider = ({ children, app: mongoRealm }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAnon, setIsAnon] = useState(true);
  const [signInBtn, setSignInBtn] = useState(false);

  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [filters, setFilters] = useState(new Map());

  const updateUser = (u) => {
    if (u) {
      u.apiKeys.create("myApiKey").then((x) =>
        localForage
          .setItem(process.env.REACT_APP_USER_STORE_KEY, x)
          .catch(function (err) {
            console.log(err);
          })
      );

      u.functions.isUserAdmin().then((d) => {
        setIsAnon(!d.result?.name || d.result.name == null);
        console.log(d.result.name);
        setIsAdmin(d.result.role === "admin");
      });
      setUser(u);
    } else {
      setUser("");
    }
    setLoading(false);
  };

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const credentials = Realm.Credentials.emailPassword(email, password);
      toast("Logging in!");
      mongoRealm
        .logIn(credentials)
        .then(updateUser)
        .catch((err) => {
          console.log(err);
          mongoRealm.emailPasswordAuth
            .registerUser({ email, password })
            .then(() => {
              console.log("Looks like you have no account. Signing you up!");

              //   const c = Realm.Credentials.emailPassword(email, password);
              //   mongoRealm
              //     .logIn(c)
              //     .then(updateUser)
              //     .catch((e) => console.log(e));
            });
        });
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };

  const addToImageMap = (id, value) => {
    localForage.setItem(id, value).catch(function (err) {
      console.log(err);
    });
  };

  const getImageData = (id) => {
    localForage
      .getItem(id)
      .then(function (value) {
        return value;
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    localForage
      .getItem(process.env.REACT_APP_USER_STORE_KEY)
      .then(function (value) {
        if (value) {
          const c = Realm.Credentials.apiKey(value.key);
          mongoRealm.logIn(c).then(updateUser);
        } else {
          if (!signInBtn) {
            const c = Realm.Credentials.anonymous();
            mongoRealm
              .logIn(c)
              .then(updateUser)
              .catch((e) => console.log(e));
          }
        }
      })
      .catch(function (err) {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner variant="border" size="sm"></Spinner>;
  }

  return (
    <MongoContext.Provider
      value={{
        user,
        getImageData,
        addToImageMap,
        filters,
        setFilters,
        email,
        password,
        setEmail,
        setPassword,
        onSubmit,
        isAdmin,
        mongoRealm,
        setUser,
        isAnon,
        setSignInBtn,
      }}
    >
      {children}
    </MongoContext.Provider>
  );
};
