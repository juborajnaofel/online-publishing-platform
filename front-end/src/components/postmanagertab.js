import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PostCard from './PostCard';
import Alert from 'react-bootstrap/Alert';
export default function PostManagerTab() {
    const data = [
        { id:1, title:"sample title1", link: "sample link1", description:"this is a sample description1"},
        { id:2, title:"sample title2", link: "sample link2", description:"this is a sample description2"},
        { id:3, title:"sample title3", link: "sample link3", description:"this is a sample description3"},
        { id:4, title:"sample title4", link: "sample link4", description:"this is a sample description4"},
        { id:5, title:"sample title5", link: "sample link5", description:"this is a sample description5"}
    ]
  return (
    <Tabs
      defaultActiveKey="draft"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="draft" title="Draft">
        <Alert variant={"dark"}>
            Your posts
        </Alert>
        {
            data.map((item, index)=>{
                return <><PostCard key={item.id} title={item.title} description={item.description} link={item.link}/><br/></>    
            })
        }
      </Tab>
      <Tab eventKey="scheduled" title="Scheduled">
        <Alert variant={"dark"}>
                Your posts
            </Alert>
            {
                data.map((item, index)=>{
                    return <><PostCard key={item.id} title={item.title} description={item.description} link={item.link}/><br/></>    
                })
            }
      </Tab>
      <Tab eventKey="published" title="Published">
        <Alert variant={"dark"}>
            Your posts
        </Alert>
        {
            data.map((item, index)=>{
                return <><PostCard key={item.id} title={item.title} description={item.description} link={item.link}/><br/></>    
            })
        }
      </Tab>
    </Tabs>
  );
}