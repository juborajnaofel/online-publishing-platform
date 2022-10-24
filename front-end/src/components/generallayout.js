import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Layout(props) {
  return (
    <Container>
      <Row>
        <Col sm={9}>
            {props.children}
        </Col>
        <Col sm={3}>
            {props.feedsidebar}
        </Col>
      </Row>
    </Container>
  );
}