import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export default function LoginForm() {
  return (
    <Container fluid className='vertical-center'>
      <Row>
        <Col style={{
            display: "flex",
            margin: "0 auto",
            justifyContent: "center"
        }}>
            <Card style={{maxWidth: 700}}>
                <Card.Header className='text-center'>
                    <h3>Login</h3>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <p>Dont have an account? create here.</p>
                </Card.Footer>
            </Card>
        </Col>
      </Row>
    </Container>
  );
}