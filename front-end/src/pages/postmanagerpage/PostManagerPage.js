import Layout from "../../components/generallayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import PostManagerTab from "../../components/postmanagertab";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function PostManagerPage(){
    const navigate = useNavigate();
    return <>
        <d>
            <NavbarLogged/>
            <br/>
            <Layout feedsidebar={<SideBarMenu active="postmanager"/>}>
                <div className="d-grid gap-2">
                    <Button variant="success" size="xs" onClick={()=> navigate('/create-new-post')}>
                        Create a new post
                    </Button>
                </div>
                <br/>
                <PostManagerTab/>
            </Layout>
        </d>
    </>
}