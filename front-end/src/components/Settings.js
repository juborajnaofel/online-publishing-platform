import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BackendApi } from '../config/BackendApi';

export default function Settings(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passwordold, setOldPassword] = useState(""); 
    const [password, setNewPassword] = useState(""); 
    const [passwordconf, setConfPassword] = useState(""); 

    useEffect(()=>{
        setName(JSON.parse(localStorage.getItem("userdata"))["name"]);
        setEmail(JSON.parse(localStorage.getItem("userdata"))["email"]);
    }, []);

    function getName(e){
        setName(e.target.value);
    }
    function getEmail(e){
        setEmail(e.target.value);
    }
    function getPassword(e){
        setNewPassword(e.target.value);
    }
    function getOldPassword(e){
        setOldPassword(e.target.value);
    }
    function getConfPassword(e){
        setConfPassword(e.target.value);
    }


    function updateInfo(){
        const payload = {
            name: name,
            email: email
          }
      
          if(name === ''){
            return alert('Name field cannot be empty!')
          }
          if(email === ''){
            return alert('Email field cannot be empty!')
          }


          fetch(BackendApi.baseurl+'/api/user/update', {
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
                    localStorage.setItem("userdata", JSON.stringify(data.data));
                    window.location.reload();
                }
          });
    }
    function updatePassword(){
        const payload = {
            old_password: passwordold,
            new_password: password
          }
      
          if(password === ''){
            return alert('New password field cannot be empty!')
          }
          if(passwordold === ''){
            return alert('Old field cannot be empty!')
          }
          if(passwordconf === ''){
            return alert('Confirm password field cannot be empty!')
          }
          if(passwordconf !== password){
            return alert('New and Confirm password Mismatch!')
          }


          fetch(BackendApi.baseurl+'/api/user/update-password', {
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
                }
          });    
    }

    
    return <>
            <div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="input" onChange={getName} defaultValue={name}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" onChange={getEmail} defaultValue={email}/>
                </Form.Group>
            </div>
            <div>
                <Button variant="secondary" onClick={updateInfo}>Update Information</Button>{' '}
            </div>
            <br/>
            <br/>

            <div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Old Password:</Form.Label>
                    <Form.Control type="password" onChange={getOldPassword}/>
                </Form.Group>


                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>New Password:</Form.Label>
                    <Form.Control type="password" onChange={getPassword}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Confirm New Password:</Form.Label>
                    <Form.Control type="password" onChange={getConfPassword}/>
                </Form.Group>
            </div>
            <div>
                <Button variant="secondary" onClick={updatePassword}>Update Password</Button>{' '}
            </div>

        </>
}