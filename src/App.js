import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import ArtWorks from "./components/art-works";
import { MongoContextProvider } from "./context/mongo-context";

function App() {
  return (
    <MongoContextProvider>
      <Container fluid className="app-page bg-dark">
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container className="font-monospace m-1 p-3">
            <span className="text-bg-danger">Art works</span>
          </Container>
        </Navbar>
        <Row className="justify-content-md-center">
          <ArtWorks />
        </Row>
      </Container>
    </MongoContextProvider>
  );
}

export default App;
