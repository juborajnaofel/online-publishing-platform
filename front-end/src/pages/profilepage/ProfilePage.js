import Layout from "../../components/generallayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import ProfileInfoBox from "../../components/profileinfobox";
import MembershipAlert from "../../components/membershipAlert";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function ProfilePage(){
    const navigate = useNavigate();
    return <>
        <d>
            <NavbarLogged/>
            <ProfileInfoBox/>
            <br/>
            <Layout feedsidebar={<SideBarMenu active="profile"/>}>
                <div>
                    <Button onClick={()=> navigate("/change-membership")}>Switch Membership plan</Button>
                </div>
                <MembershipAlert/>

            </Layout>
        </d>
    </>
}