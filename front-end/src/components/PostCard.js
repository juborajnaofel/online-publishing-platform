import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { BackendApi } from '../config/BackendApi';

export default function PostCard(props) {
  const navigate = useNavigate();
  
  function publish(id){
      fetch(BackendApi.baseurl+'/api/post/publish-created/'+id, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem("token") 
        },
      }).then((response) => response.json())
      .then((data) => {
        if(data.success === true){
          props.setLC(!props.triggerchange);
          alert(data.msg)
        }else{
          alert(data.msg);
        }
      });
  }

  function deletePost(id){
    if(window.confirm("Are you sure you want to delete this?")){
      fetch(BackendApi.baseurl+'/api/post/delete/'+id, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem("token") 
        },
      }).then((response) => response.json())
      .then((data) => {
        if(data.success === true){
          props.setLC(!props.triggerchange);
          alert(data.msg)
        }else{
          alert(data.msg);
        }
      });
    }
  }

  function view(id){
     navigate("/view/"+id);
  }

  function editpost(id){
    navigate("/edit/"+id);
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {
            props.scheduled_at && 
             <>Scheduled at: {props.scheduled_at}<br/></>
          }{
            props.published_at && 
            <>Published at: {props.published_at}<br/></>
          }
          {props.description.slice(0, 200)+"..."}{"\u00A0"}  <br/><br/><Button size='sm' variant="dark" onClick={()=> view(props.id)}>Read more</Button> 
        </Card.Text>
          {!(props.feedpage) && 
            <Card.Text>
              {
                props.draft && 
                  <Button size='sm' variant="primary" onClick={()=> publish(props.id)}>Publish</Button> 
              }{"\u00A0"}  
              {
                <>
                  <Button size='sm' variant="secondary" onClick={()=> editpost(props.id)}>Edit</Button>{"\u00A0"}  
                  <Button size='sm' variant="danger" onClick={()=> deletePost(props.id)}>Delete</Button>
                </>
              }
            </Card.Text>
          }
          {/* <Card.Text>
            <Button variant="dark" onClick={()=> deletePost(props.id)}>Like</Button>
          </Card.Text> */}

        {/* <Button variant="primary">{props.link}</Button> */}
      </Card.Body>
    </Card>
  );
}