import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BackendApi } from '../config/BackendApi';

export default function PostCard(props) {
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

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
            {props.description}
        </Card.Text>
        <Card.Text>
            Created at: {props.created_at}
        </Card.Text>
        {
          props.scheduled_at && 
          <Card.Text>
            Scheduled at: {props.scheduled_at}
          </Card.Text>
        }
          <Card.Text>
            {
              props.draft && 
                <Button variant="primary" onClick={()=> publish(props.id)}>Publish</Button> 
            }{"\u00A0"}  

            <Button variant="danger" onClick={()=> deletePost(props.id)}>Delete</Button>
          </Card.Text>

        {/* <Button variant="primary">{props.link}</Button> */}
      </Card.Body>
    </Card>
  );
}