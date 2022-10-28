import Layout from "../../components/generallayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import Alert from 'react-bootstrap/Alert';
import { BackendApi } from "../../config/BackendApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewPostPage(){
    const [data, setData] = useState([]);
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
            }
        });
    },[id]);

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
                    <p><b>Published at:</b>{data.published_at}</p>
                    <br/>
                     <b>Author:</b>{data.user_id}
                    <hr/>
                    <p>{data.description}</p>
                </div>
            </Layout>
        </d>
    </>
}