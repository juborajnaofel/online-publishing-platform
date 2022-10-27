import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { BackendApi } from '../config/BackendApi';
import MembershipCard from './membership';

export default function SideBarMenu(props) {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  function logout(){
    fetch(BackendApi.baseurl+'/api/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token") 
      }
    }).then((response) => response.json())
    .then((data) => {
      if(data.success === true){
        localStorage.setItem("islogged", "false")
        userCtx.setlogin_trigger();
        navigate('/');
      }
    });
  }


  return (
    <Card style={{ maxWidth:"100%" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
      {props.active !== 'profile' && 
      <Card.Body>
        <Card.Title>{JSON.parse(localStorage.getItem("userdata"))["name"]}</Card.Title>
        <MembershipCard/>
      </Card.Body>
      }
      <ListGroup className="list-group-flush">
        <ListGroup.Item><Link className={ props.active === "home"?'activemenulink':'menulink' } to="/">Home</Link></ListGroup.Item>
        <ListGroup.Item><Link className={ props.active === "profile"?'activemenulink':'menulink' } to="/profile">Profile</Link></ListGroup.Item>
        <ListGroup.Item><Link className={ props.active === "createnew"?'activemenulink':'menulink' } to="/create-new-post">Create a Post</Link></ListGroup.Item>
        <ListGroup.Item><Link className={ props.active === "postmanager"?'activemenulink':'menulink' } to="/posts-manager/draft">Post Manager</Link></ListGroup.Item>
        <ListGroup.Item><Link className={ props.active === "settings"?'activemenulink':'menulink' } to="/settings">Settings</Link></ListGroup.Item>
        <ListGroup.Item><Link className={ props.active === "changemembership"?'activemenulink':'menulink' } to="/change-membership">Switch Membership plan</Link></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <ListGroup.Item><Link className='menulink'  onClick={logout}>Logout</Link></ListGroup.Item>
      </Card.Body>
    </Card>
  );
}