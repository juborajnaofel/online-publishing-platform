import Layout from "../../components/generallayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import PostCard from "../../components/PostCard";
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from "react";
import { BackendApi } from "../../config/BackendApi";
export default function FeedPage(){
    // const data = [
    //     { id:1, title:"sample title1", link: "sample link1", description:"this is a sample description1"},
    //     { id:2, title:"sample title2", link: "sample link2", description:"this is a sample description2"},
    //     { id:3, title:"sample title3", link: "sample link3", description:"this is a sample description3"},
    //     { id:4, title:"sample title4", link: "sample link4", description:"this is a sample description4"},
    //     { id:5, title:"sample title5", link: "sample link5", description:"this is a sample description5"}
    // ]

    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch(BackendApi.baseurl+'/api/home', {
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
    },[]);

    function refresh(){
        fetch(BackendApi.baseurl+'/api/home', {
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
                alert("Feed refreshed successfully");
            }
        });
    }


    return <>
        <d>
            <NavbarLogged/>
            <br/>
            <Layout feedsidebar={<SideBarMenu active="home"/>}>
                <Alert variant={"dark"}>
                    Posts by others <button onClick={refresh}>Load new posts</button>
                </Alert>

                {
                    data.map((item, index)=>{
                        return <><PostCard key={item.id} title={item.title} description={item.description} link={"B"+item.id}/><br/></>     
                    })
                }
            </Layout>
        </d>
    </>
}