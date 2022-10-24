import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function PostCard(props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
            {props.description}
        </Card.Text>
        <Button variant="primary">{props.link}</Button>
      </Card.Body>
    </Card>
  );
}