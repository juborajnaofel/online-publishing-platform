import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BackendApi } from '../config/BackendApi';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    function getPass(event) {
        setPassword(event.target.value)
    }

    function getEmail(event) {
        setEmail(event.target.value)
    }


    function login() {
        const payload = {
          email: email,
          password: password
        }
    
        if(email === ''){
          return alert('Email field cannot be empty!')
        }
        if(password === ''){
          return alert('Passaword field cannot be empty!')
        }
        fetch(BackendApi.baseurl+'/api/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }).then((response) => response.json())
        .then((data) => {
          if(data.success === true){
            localStorage.setItem("token", data.token);
            localStorage.setItem("islogged", true);
            userCtx.setlogin_trigger();
            navigate('/');
          }
        });
    }


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
                            <Form.Control type="email" placeholder="Enter email" onChange={getEmail}/>
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={getPass} />
                        </Form.Group>

                        <Button variant="primary" onClick={login}>
                            Login
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <p>Dont have an account? <Link to="/register">Register here</Link></p>
                </Card.Footer>
            </Card>
        </Col>
      </Row>
    </Container>
  );
}