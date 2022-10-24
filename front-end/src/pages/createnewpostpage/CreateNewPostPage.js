import Layout from "../../components/generallayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import Alert from 'react-bootstrap/Alert';
import CreatePostForm from "../../components/Createposts";

export default function CreateNewPostPage(){
    return <>
        <d>
            <NavbarLogged/>
            <br/>
            <Layout feedsidebar={<SideBarMenu active="createnew"/>}>
                <Alert variant={"dark"}>
                    Write something
                </Alert>
                <CreatePostForm/>
            </Layout>
        </d>
    </>
}