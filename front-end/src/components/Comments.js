import { useEffect, useState } from "react";
import { BackendApi } from "../config/BackendApi";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
export default function Comments({post_id}){
    const [data, setData] = useState([]);
    const [comment, setComment] = useState("");
    function getComment(e){
        setComment(e.target.value);
    }


    useEffect(()=>{
        fetch(BackendApi.baseurl+'/api/post/'+post_id+'/comments', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("token") 
        },
        }).then((response) => response.json())
        .then((data) => {
            if(data.success === true){
                setData(data.comments);
            }
        });
    },[]);    

    function comment_submit(){
      const payload = {
        comment: comment,
        commenter_id: JSON.parse(localStorage.getItem('userdata'))['id'],
        post_id: post_id
      }
  
      if(comment === ''){
        return alert('Comment field cannot be empty!')
      }

      fetch(BackendApi.baseurl+'/api/post/comment', {
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
          window.location.reload();
        }else{
          alert(data.msg);
        }
      });
    }


    return <div>
        <hr/>        
        <h3>Comments</h3>
        <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="input" placeholder="Enter your Comment.." onChange={getComment} />
                </Form.Group>
                <Button variant="success" onClick={comment_submit}>Submit Comment</Button>{' '}<br/><br/>
        </Form>
        {data.map((item, index)=>{
            return <Alert key={index} variant={'primary'}><b>{item.commenter+":"}</b><br></br>{item.comment}</Alert>
        })}
    </div>
}