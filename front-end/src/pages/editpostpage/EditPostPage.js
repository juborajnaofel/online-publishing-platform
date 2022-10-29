import Layout from "../../components/generallayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import Alert from 'react-bootstrap/Alert';
import EditPostForm from "../../components/EditPostForm";

export default function EditPostPage(){
    return <>
        <d>
            <NavbarLogged/>
            <br/>
            <Layout feedsidebar={<SideBarMenu active="createnew"/>}>
                <Alert variant={"dark"}>
                    Edit Post
                </Alert>
                <EditPostForm/>
            </Layout>
        </d>
    </>
}