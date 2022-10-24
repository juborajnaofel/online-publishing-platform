import FeedLayout from "../../components/Feedlayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import PostCard from "../../components/PostCard";

export default function FeedPage(){
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
            <br/>
            <FeedLayout feedsidebar={<SideBarMenu/>}>
                {
                    data.map((item, index)=>{
                        return <><PostCard key={item.id} title={item.title} description={item.description} link={item.link}/><br/></>     
                    })
                }
            </FeedLayout>
        </d>
    </>
}