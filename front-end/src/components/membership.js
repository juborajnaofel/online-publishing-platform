import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

export default function MembershipCard(){
    return (
      <Card.Text>
        Membership: {"\u00A0"}      
        { localStorage.getItem("membership") === "null" || JSON.parse(localStorage.getItem("membership"))["type"] === "free" ? <Badge bg="warning" text="dark">Free</Badge>:<Badge bg="success" text="light">Premium</Badge> }
      </Card.Text>
    );
}