import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BackendApi } from '../config/BackendApi';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfPassword] = useState("");

    const userCtx = useContext(UserContext);
    
    function getPass(event) {
        setPassword(event.target.value)
    }

    function getConfPass(event) {
        setConfPassword(event.target.value)
    }

    function getName(event) {
        setName(event.target.value)
    }

    function getEmail(event) {
        setEmail(event.target.value)
    }

    function register(){
        const payload = {
            email: email,
            password: password,
            name: name
          }
          if(name === ''){
            return alert('Email field cannot be empty!')
          }
          if(password === ''){
            return alert('Passaword field cannot be empty!')
          }
          if(email === ''){
            return alert('Email field cannot be empty!')
          }
          if(confirm_password === ''){
            return alert('Confirm Passaword field cannot be empty!')
          }
          if(confirm_password !== password){
            return alert('Password and confirm password mismatch!')
          }

          fetch(BackendApi.baseurl+'/api/register', {
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
                    <h3>Create an account</h3>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control type="input" placeholder="Enter Name" onChange={getName}/>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={getEmail}/>
                            <Form.Text className="text-muted"> We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="New Password" onChange={getPass}/>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicPasswordConf">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="New Password" onChange={getConfPass}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPasswordConf">
                        <Form.Text className="text-muted"> Your Current Membership is a <b>free membership</b> where you cannot schedule posts and you can only create 2 posts daily.<br/></Form.Text> 
                        <Form.Text>User having <b>premium membership</b> can create and schedule unlimited posts.<br/></Form.Text>
                        <Form.Text>You can upgrade to <b>premium membership</b> from your profile settings after completing resgistration.<br/></Form.Text>
                        </Form.Group>

                        <Button variant="primary" onClick={register}>
                            Register
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <p>Already have an account? <Link to="/">Login here</Link></p>
                </Card.Footer>
            </Card>
        </Col>
      </Row>
    </Container>
  );
}