import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { MongoContext } from "../context/mongo-context";
import FilterPill from "./filter-pill";
import LoginForm from "./login-form";
const ArtItem = React.lazy(() => import("./art-item"));
const FilterPanel = React.lazy(() => import("./filter-panel"));

function ArtWorks(props) {
  const [artWorks, setArtWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(0);
  const {
    user,
    addToImageMap,
    filters,
    email,
    password,
    setEmail,
    setPassword,
    onSubmit,
  } = useContext(MongoContext);

  const getArtWorks = (page) => {
    const andw = [];
    filters.forEach((value, key) => {
      if (value.length > 0) {
        andw.push({ [key]: { $in: value } });
      }
    });
    const queryObj = {
      $and: andw,
    };

    if (user) {
      setLoading(true);
      try {
        user.functions
          .fetchByPage("", page, andw.length ? queryObj : {})
          .then((resp) => {
            const result = resp?.result.map((x) => {
              return { ...x, _id: x._id.toString() };
            });
            if (result.length < 10) {
              setHasNextPage(false);
            }
            setLoading(false);
            if (page > 0) {
              setArtWorks([...artWorks, ...result]);
            } else {
              setArtWorks([...result]);
            }
            result.forEach((artwork) => {
              addToImageMap(artwork._id, artwork);
            });
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleScroll = (e) => {
    if (
      hasNextPage &&
      user &&
      !loading &&
      Math.abs(
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
      ) < 2
    ) {
      setPage(page + 1);
      getArtWorks(page + 1);
      console.log("Page No ", page + 1);
    }
  };

  useEffect(() => {
    getArtWorks(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setPage(0);
    setHasNextPage(true);
    setArtWorks([]);
    getArtWorks(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return !user ? (
    <LoginForm
      onEmailChange={(e) => setEmail(e.target.value)}
      email={email}
      onPassWordChange={(e) => setPassword(e.target.value)}
      password={password}
      onSubmit={onSubmit}
    />
  ) : (
    <>
      <Col xs={12}>
        {filters?.get("_id")?.map((x) => (
          <FilterPill value={x} k="_id" />
        ))}
      </Col>
      <Col xs={12} md={3}>
        <FilterPanel />
      </Col>
      <Col
        xs={12}
        md={9}
        className="overflow-auto bg-dark art-works thin-scroll p-4"
        onScroll={handleScroll}
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
    </>
  );
}

export default ArtWorks;
