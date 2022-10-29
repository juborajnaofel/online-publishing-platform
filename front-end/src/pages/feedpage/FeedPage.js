import Layout from "../../components/generallayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import PostCard from "../../components/PostCard";
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from "react";
import { BackendApi } from "../../config/BackendApi";
import Pagination from "../../components/Pagination";
export default function FeedPage(){
    // const data = [
    //     { id:1, title:"sample title1", link: "sample link1", description:"this is a sample description1"},
    //     { id:2, title:"sample title2", link: "sample link2", description:"this is a sample description2"},
    //     { id:3, title:"sample title3", link: "sample link3", description:"this is a sample description3"},
    //     { id:4, title:"sample title4", link: "sample link4", description:"this is a sample description4"},
    //     { id:5, title:"sample title5", link: "sample link5", description:"this is a sample description5"}
    // ]
    
    const [curretPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;
    const lastPostIndex = curretPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;



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

    const currentPosts =    data.map((item, index)=>{
        return <><PostCard total_likes={item.total_likes} total_comments={item.total_comments} feedpage={true} id={item.id} key={item.id} title={item.title} description={item.description} published_at={item.published_at}/><br/></>     
    }).slice(firstPostIndex, lastPostIndex);

    return <>
        <d>
            <NavbarLogged/>
            <br/>
            <Layout feedsidebar={<SideBarMenu active="home"/>}>
                <Alert variant={"dark"}>
                    Posts by others <button onClick={refresh}>Load new posts</button>
                </Alert>

                {currentPosts}
                {"Current Page:"+curretPage}<br></br>
                <Pagination totalPosts={data.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}/>
            </Layout>
        </d>
    </>
}