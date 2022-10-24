import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
export default function SideBarMenu() {
  return (
    <Card style={{ maxWidth:"100%" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
      <Card.Body>
        <Card.Title>I.E.U. Juboraj Naofel</Card.Title>
        <Card.Text>
          Membership: {"\u00A0"}      
          { false ? <Badge bg="warning" text="dark">Free</Badge>:<Badge bg="success" text="light">Premium</Badge> }
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><Link to="/">Home</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/">Profile</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/">Post Manager</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/">Settings</Link></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <ListGroup.Item><Link to="/">Logout</Link></ListGroup.Item>
      </Card.Body>
    </Card>
  );
}