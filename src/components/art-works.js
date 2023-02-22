import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import * as Realm from "realm-web";
import { MongoContext } from "../context/mongo-context";
const ArtItem = React.lazy(() => import("./art-item"));

function ArtWorks(props) {
  const [artWorks, setArtWorks] = useState([]);
  const [height, setHeight] = useState(window.innerHeight - 80);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { id: APP_ID } = useContext(MongoContext);
  const app = Realm.App.getApp(APP_ID);

  const getArtWorks = (page) => {
    setLoading(true);
    try {
      app.logIn(Realm.Credentials.anonymous()).then((user) => {
        user.functions.fetchByPage(page).then((resp) => {
          setLoading(false);
          setArtWorks([...artWorks, ...resp.result]);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = (e) => {
    if (
      !loading &&
      Math.abs(
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
      ) < 1
    ) {
      setPage(page + 1);
      getArtWorks(page + 1);
      console.log(loading, page + 1);
    }
  };

  useEffect(() => {
    getArtWorks(page);
    window.addEventListener("resize", documentHeight);
    documentHeight();
  }, []);

  const documentHeight = () => {
    setHeight(window.innerHeight - 80);
  };

  return (
    <Col
      className="overflow-auto bg-dark art-works p-4"
      onScroll={handleScroll}
      style={{ height }}
    >
      {artWorks.map((element) => (
        <ArtItem key={element._id} {...element} />
      ))}
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="light" />
        </Row>
      ) : null}
    </Col>
  );
}

export default ArtWorks;
