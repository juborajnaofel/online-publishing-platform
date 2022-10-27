import Layout from "../../components/generallayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import Alert from 'react-bootstrap/Alert';
import MembershipForm from "../../components/MembershipForm";

export default function ChangeMembershipPage(){
    return <>
        <d>
            <NavbarLogged/>
            <br/>
            <Layout feedsidebar={<SideBarMenu active="changemembership"/>}>
                <Alert variant={"dark"}>
                    Choose your membership
                </Alert>
                <br></br>
                <MembershipForm/>
            </Layout>
        </d>
    </>
}