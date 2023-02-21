import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import Row from "react-bootstrap/Row";

function ArtItem(props) {
  return (
    <Row className="shadow p-3 my-2 art-item" data-key={props._id}>
      <Col xs={12} md={4}>
        <Figure>
          <Figure.Image
            className="img-fluid-h"
            width={400}
            src={props.image_url}
            alt={props.title}
          />
          <Figure.Caption>{props.title}</Figure.Caption>
          <Figure.Caption>{props.artist_name}</Figure.Caption>
          <Figure.Caption>{props.auction_name}</Figure.Caption>
        </Figure>
      </Col>
      <Col className="p-1">
        <Row>
          {[1, 2, 3, 4].map((x) => (
            <Col xs={3} key={x + "similar-image"}>
              <Figure>
                <Figure.Image
                  className="img-fluid-h"
                  src={props[`s${x}_image_uri`]}
                  alt={props.title}
                  loading="lazy"
                />
              </Figure>
            </Col>
          ))}
        </Row>
        <Row>
          {[5, 6, 7].map((x) => (
            <Col xs={3} key={x + "similar-image"}>
              <Figure>
                <Figure.Image
                  className="img-fluid-h"
                  src={props[`s${x}_image_uri`]}
                  alt={props.title}
                  loading="lazy"
                />
              </Figure>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default ArtItem;
