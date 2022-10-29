import Layout from "../../components/generallayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import Alert from 'react-bootstrap/Alert';
import { BackendApi } from "../../config/BackendApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Comments from "../../components/Comments";

export default function ViewPostPage(){
    const [data, setData] = useState([]);
    const {id} = useParams();
    const [triggerChange, setTriggerChange] = useState(false)
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
            }
        });
    },[id, triggerChange]);

    function like(){
        const payload = {
            isLiked: data.isLiked,
            post_id: id,
          }
      


          fetch(BackendApi.baseurl+'/api/user/like-toggle', {
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
                setTriggerChange(!triggerChange);
            }
          });
    }

    return <>
        <d>
            <NavbarLogged/>
            <br/>
            <Layout feedsidebar={<SideBarMenu active="changemembership"/>}>
                <Alert variant={"dark"}>
                    View Post
                </Alert>
                <br></br>
                <div>
                    <h1>{data.title}</h1>
                    <p><b>Published at: </b>{data.published_at}</p>
                    <br/>
                     <b>Author: </b>{data.author}
                    <hr/>
                    <p>{data.description}</p>
                    <span> <b>{data.total_comments}</b> Comments and </span>{"\u00A0"}  
                    <span> <b>{data.total_likes}</b>Likes </span> 
                    <Button size="sm" onClick={like}> {data.isLiked? 'Liked': 'Like'} </Button>
                    <Comments post_id={id}/>
                </div>
            </Layout>
        </d>
    </>
}