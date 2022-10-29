import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BackendApi } from '../config/BackendApi';
import { useNavigate } from 'react-router-dom';
import MembershipAlert from './membershipAlert';
import { useParams } from 'react-router-dom';

export default function EditPostForm(){
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const navigate = useNavigate();

    const [post_data, setData] = useState([]);
    const {id} = useParams();

    useEffect(()=>{
        fetch(BackendApi.baseurl+'/api/view-a-post/'+id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("token") 
        },
        }).then((response) => response.json())
        .then((data) => {
            if(data.success === true){
                setData(data.data);
                setTitle(data.data.title);
                setDes(data.data.des);
            }
        });
    },[id]);



    function save(){
        const payload = {
            id: id,
            title: title,
            description: des
          }
      
          if(title === ''){
            return alert('Title field cannot be empty!')
          }
          if(des === ''){
            return alert('Description field cannot be empty!')
          }


          fetch(BackendApi.baseurl+'/api/update-a-post', {
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
              if(post_data.status === 'published'){
                navigate('/posts-manager/published');
              }else if(post_data.status === 'scheduled'){
                navigate('/posts-manager/scheduled');
              }else{
                navigate('/posts-manager/draft');
              }
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
                    <Form.Control type="input" placeholder="Enter your post title here..." onChange={getTitle} defaultValue={post_data.title}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" onChange={getDescription}  placeholder="Enter your post description here..."  rows={12} defaultValue={post_data.description} />
                </Form.Group>
            </div>
            <div>
                <Button variant="secondary" onClick={save}>Save</Button>
            </div>
            <br/>
            <MembershipAlert/>
        </>
}