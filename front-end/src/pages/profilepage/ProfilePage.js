import Layout from "../../components/generallayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import PostCard from "../../components/PostCard";
import ProfileInfoBox from "../../components/profileinfobox";
import Alert from 'react-bootstrap/Alert';
export default function ProfilePage(){
    const data = [
        { id:1, title:"sample title1", link: "sample link1", description:"this is a sample description1"},
        { id:2, title:"sample title2", link: "sample link2", description:"this is a sample description2"},
        { id:3, title:"sample title3", link: "sample link3", description:"this is a sample description3"},
        { id:4, title:"sample title4", link: "sample link4", description:"this is a sample description4"},
        { id:5, title:"sample title5", link: "sample link5", description:"this is a sample description5"}
    ]
    return <>
        <d>
            <NavbarLogged/>
            <ProfileInfoBox/>
            <br/>
            <Layout feedsidebar={<SideBarMenu active="profile"/>}>
                <Alert variant={"dark"}>
                    Recent Posts by you
                </Alert>
                {
                    data.map((item, index)=>{
                        return <><PostCard key={item.id} title={item.title} description={item.description} link={item.link}/><br/></>     
                    })
                }
            </Layout>
        </d>
    </>
}