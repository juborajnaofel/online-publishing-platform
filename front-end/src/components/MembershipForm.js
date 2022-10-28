import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import Form from 'react-bootstrap/Form';
import { BackendApi } from '../config/BackendApi';
import MembershipAlert from './membershipAlert';

export default function MembershipForm(){
    const [card , setCard] = useState("")

    function updateInfo(type){
        const payload = {
            card_number: card,
            type:type
          }
      
          if(card === '' && type === 'premium'){
            return alert('Card Number field cannot be empty!')
          }


          fetch(BackendApi.baseurl+'/api/user/update-membership', {
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
                    localStorage.setItem("membership", JSON.stringify(data.membership));
                    window.location.reload();
                }
          });
    }

    
    return <>
    <MembershipAlert/>
    {localStorage.getItem("membership") === "null" || JSON.parse(localStorage.getItem("membership"))["type"] === "free" ? 
          <>
            <div>
                <h3>Current membership details</h3>
                <p><b>Expire at:</b> infinity</p>
                <p><b>Type</b>: free</p>
            </div>

            <div>
                <br></br>
                <h2>Get our premium plan:</h2>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Amount(bdt):</Form.Label>
                      <Form.Control type="input" value={0} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Type:</Form.Label>
                      <Form.Control type="input" value={"Annual"} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Card Number:</Form.Label>
                      <Form.Control type="number" onChange={(e)=> setCard(e.target.value)}/>
                  </Form.Group>


            </div>
            <div>
                <Button variant="success" onClick={()=>updateInfo("premium")}>Upgrade Membership</Button>{' '}
            </div>
            </>
            :
            <>
            <div>
                <h3>Current membership details</h3>
                <p><b>Expire at:</b> { JSON.parse(localStorage.getItem("membership"))["expire_at"]==null? "infinity":JSON.parse(localStorage.getItem("membership"))["expire_at"] }</p>
                <p><b>Type</b>: { JSON.parse(localStorage.getItem("membership"))["type"] }</p>
            </div>
            <div>
                <Button variant="warning" onClick={()=>updateInfo("free")}>Revert to Free Membership</Button>{' '}
            </div>
            </>

        }

            <br/>

        </>
}