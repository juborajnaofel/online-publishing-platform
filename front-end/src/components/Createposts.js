import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BackendApi } from '../config/BackendApi';
import { useNavigate } from 'react-router-dom';
import MembershipAlert from './membershipAlert';
export default function CreatePostForm(){
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [dt, setDt] = useState("");


    const navigate = useNavigate();


    function getDt(e){
      setDt(e.target.value)
    }
    function save_draft(){
        const payload = {
            title: title,
            description: des
          }
      
          if(title === ''){
            return alert('Title field cannot be empty!')
          }
          if(des === ''){
            return alert('Description field cannot be empty!')
          }


          fetch(BackendApi.baseurl+'/api/post/save-draft', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("token") 
            },
            body: JSON.stringify(payload)
          }).then((response) => response.json())
          .then((data) => {
            if(data.success === true){
              navigate('/posts-manager');
            }
          });
    }

    function publish_now(){
        const payload = {
            title: title,
            description: des
          }
      
          if(title === ''){
            return alert('Title field cannot be empty!')
          }
          if(des === ''){
            return alert('Description field cannot be empty!')
          }


          fetch(BackendApi.baseurl+'/api/post/publish', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+localStorage.getItem("token") 
            },
            body: JSON.stringify(payload)
          }).then((response) => response.json())
          .then((data) => {
            if(data.success === true){
              navigate('/posts-manager');
            }
          });
    }
    function schedule_post(){
      const payload = {
        title: title,
        description: des,
        datetime:dt
      }
  
      if(title === ''){
        return alert('Title field cannot be empty!')
      }
      if(des === ''){
        return alert('Description field cannot be empty!')
      }
      if(dt === ''){
        return alert('Datetime field cannot be empty!')
      }


      fetch(BackendApi.baseurl+'/api/post/schedule', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem("token") 
        },
        body: JSON.stringify(payload)
      }).then((response) => response.json())
      .then((data) => {
        if(data.success === true){
          navigate('/posts-manager');
        }
      });
    } 

    function getTitle(event){
        setTitle(event.target.value)
    }

    function getDescription(event){
        setDes(event.target.value)
    }



    return <>
            <div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="input" placeholder="Enter your post title here..." onChange={getTitle} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" onChange={getDescription}  placeholder="Enter your post description here..."  rows={12} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>preferred time to publish:</Form.Label>
                    <Form.Control  onChange={getDt} type="datetime-local"/>
                </Form.Group>
            </div>
            <div>
                <Button variant="secondary" onClick={save_draft}>Save Draft</Button>{' '}
                <Button variant="success" onClick={schedule_post}>Schedule Publish</Button>{' '}
                <Button variant="success" onClick={publish_now}>Publish Now</Button>{' '}
            </div>
            <br/>
            <MembershipAlert/>
        </>
}