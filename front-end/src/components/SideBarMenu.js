import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
export default function SideBarMenu(props) {
  return (
    <Card style={{ maxWidth:"100%" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
      {props.active !== 'profile' && 
      <Card.Body>
        <Card.Title>I.E.U. Juboraj Naofel</Card.Title>
        <Card.Text>
          Membership: {"\u00A0"}      
          { false ? <Badge bg="warning" text="dark">Free</Badge>:<Badge bg="success" text="light">Premium</Badge> }
        </Card.Text>
      </Card.Body>
      }
      <ListGroup className="list-group-flush">
        <ListGroup.Item><Link className={ props.active === "home"?'activemenulink':'menulink' } to="/">Home</Link></ListGroup.Item>
        <ListGroup.Item><Link className={ props.active === "profile"?'activemenulink':'menulink' } to="/profile">Profile</Link></ListGroup.Item>
        <ListGroup.Item><Link className={ props.active === "createnew"?'activemenulink':'menulink' } to="/create-new-post">Create a Post</Link></ListGroup.Item>
        <ListGroup.Item><Link className={ props.active === "postmanager"?'activemenulink':'menulink' } to="/posts-manager">Post Manager</Link></ListGroup.Item>
        <ListGroup.Item><Link className={ props.active === "settings"?'activemenulink':'menulink' } to="/settings">Settings</Link></ListGroup.Item>
        <ListGroup.Item><Link className={ props.active === "changemembership"?'activemenulink':'menulink' } to="/change-membership">Switch Membership plan</Link></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <ListGroup.Item><Link className='menulink' to="/">Logout</Link></ListGroup.Item>
      </Card.Body>
    </Card>
  );
}