import Layout from "../../components/generallayout";
import SideBarMenu from "../../components/SideBarMenu";
import NavbarLogged from "../../components/NavbarLogged";
import Alert from 'react-bootstrap/Alert';

export default function ChangeMembershipPage(){
    return <>
        <d>
            <NavbarLogged/>
            <br/>
            <Layout feedsidebar={<SideBarMenu active="changemembership"/>}>
                <Alert variant={"dark"}>
                    Write something
                </Alert>
            </Layout>
        </d>
    </>
}