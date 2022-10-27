import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PostCard from './PostCard';
import { useEffect, useState } from 'react';
import { BackendApi } from '../config/BackendApi';
import { useParams } from 'react-router-dom';

export default function PostManagerTab() {
  let { tab } = useParams();
  const [data_draft, setDraft] = useState([]);
  const [data_published, setDataPublished] = useState([]);
  const [data_scheduled, setDataScheduled] = useState([]);
  const [listchange, setLC] = useState(false);
  useEffect(()=>{
    fetch(BackendApi.baseurl+'/api/posts/draft', {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token") 
    },
    }).then((response) => response.json())
    .then((data) => {
        if(data.success === true){
            setDraft(data.data);
        }
    });
  },[listchange]);


  useEffect(()=>{
    fetch(BackendApi.baseurl+'/api/posts/published', {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token") 
    },
    }).then((response) => response.json())
    .then((data) => {
        if(data.success === true){
            setDataPublished(data.data);
        }
    });
  },[listchange]);
  

  useEffect(()=>{
    fetch(BackendApi.baseurl+'/api/posts/scheduled', {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token") 
    },
    }).then((response) => response.json())
    .then((data) => {
        if(data.success === true){
            setDataScheduled(data.data);
        }
    });
  },[listchange]);


  return (
    <Tabs
      defaultActiveKey={tab}
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="draft" title="Draft">
        {
            data_draft.map((item, index)=>{
      
                return <><PostCard triggerchange={listchange} setLC={setLC} id={item.id} draft={true} key={item.id} title={item.title} description={item.description} 
                created_at={ typeof item.created_at === "string"? item.created_at.slice(0,16).replace('T', ' '): "" }/><br/></>    
            })
        }
      </Tab>
      <Tab eventKey="scheduled" title="Scheduled">
            {
                data_scheduled.map((item, index)=>{
                    return <><PostCard triggerchange={listchange}  setLC={setLC} id={item.id} key={item.id} title={item.title} description={item.description}
                    scheduled_at= {item.scheduled_at}
                    created_at={ typeof item.created_at === "string"? item.created_at.slice(0,16).replace('T', ' '): "" }/><br/></>  
                })
            }
      </Tab>
      <Tab eventKey="published" title="Published">
        {
            data_published.map((item, index)=>{
                return <><PostCard triggerchange={listchange}  setLC={setLC} id={item.id} key={item.id} title={item.title} description={item.description}
                created_at={ typeof item.created_at === "string"? item.created_at.slice(0,16).replace('T', ' '): "" }/><br/></>  
            })
        }
      </Tab>
    </Tabs>
  );
}