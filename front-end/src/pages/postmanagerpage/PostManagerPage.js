import Layout from "../../components/generallayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import PostManagerTab from "../../components/postmanagertab";
import Button from 'react-bootstrap/Button';

export default function PostManagerPage(){
    return <>
        <d>
            <NavbarLogged/>
            <br/>
            <Layout feedsidebar={<SideBarMenu active="postmanager"/>}>
                <div className="d-grid gap-2">
                    <Button variant="success" size="xs">
                        Create a new post
                    </Button>
                </div>
                <br/>
                <PostManagerTab/>
            </Layout>
        </d>
    </>
}