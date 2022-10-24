import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

export default function ProfileInfoBox() {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>I.E.U. Juboraj Naofel</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">sample@gmail.com</Card.Subtitle>
        <Card.Text>
          Membership: {"\u00A0"}      
          { false ? <Badge bg="warning" text="dark">Free</Badge>:<Badge bg="success" text="light">Premium</Badge> }
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}