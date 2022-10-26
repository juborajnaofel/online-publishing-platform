import Layout from "../../components/generallayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import ProfileInfoBox from "../../components/profileinfobox";
import MembershipAlert from "../../components/membershipAlert";

export default function ProfilePage(){

    return <>
        <d>
            <NavbarLogged/>
            <ProfileInfoBox/>
            <br/>
            <Layout feedsidebar={<SideBarMenu active="profile"/>}>
                <MembershipAlert/>
            </Layout>
        </d>
    </>
}