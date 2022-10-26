import Card from 'react-bootstrap/Card';
import MembershipCard from './membership';


export default function ProfileInfoBox() {
  return (
    <Card style={{ width: '100%', textAlign: "center" }}>
      <Card.Body>
        <Card.Title>{JSON.parse(localStorage.getItem("userdata"))["name"]}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{JSON.parse(localStorage.getItem("userdata"))["email"]}</Card.Subtitle>
        <MembershipCard/>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
  );
}