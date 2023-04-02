import { useMemo } from "react";
import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { ToastContainer } from "react-toastify";
import * as Realm from "realm-web";
import "./App.css";
import ArtWorks from "./components/art-works";
import LogoutBtn from "./components/logout-btn";
import { MongoContextProvider } from "./context/mongo-context";
import logo from "./logo.svg";

function App() {
  const mongoRealm = useMemo(
    () => new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID }),
    []
  );

  return (
    <Container fluid className="app-page bg-dark">
      <MongoContextProvider app={mongoRealm}>
        <Navbar
          expand="lg"
          bg="dark"
          variant="dark"
          className="justify-content-evenly"
        >
          <Container className="font-monospace m-1 p-2 d-flex">
            <span>
              <img src={logo} alt="art logo" />
              <span className="text-white p-1">Art works</span>
            </span>
            <LogoutBtn />
          </Container>
        </Navbar>
        <Row className="justify-content-md-center">
          <ArtWorks />
        </Row>
        <ToastContainer autoClose={2000} />
      </MongoContextProvider>
    </Container>
  );
}

export default App;
