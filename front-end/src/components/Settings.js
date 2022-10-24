import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Settings(){
    return <>
            <div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="input"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email"/>
                </Form.Group>
            </div>
            <div>
                <Button variant="secondary">Update Information</Button>{' '}
            </div>
            <br/>
            <br/>

            <div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Old Password:</Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>


                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>New Password:</Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Confirm New Password:</Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>
            </div>
            <div>
                <Button variant="secondary">Update Password</Button>{' '}
            </div>

        </>
}