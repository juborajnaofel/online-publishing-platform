import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function CreatePostForm(){
    return <>
            <div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="input" placeholder="Enter your post title here..." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea"  placeholder="Enter your post description here..."  rows={12} />
                </Form.Group>
            </div>
            <div>
                <Button variant="secondary">Save Draft</Button>{' '}
                <Button variant="success">Schedule Publish</Button>{' '}
                <Button variant="success">Publish Now</Button>{' '}
            </div>
        </>
}