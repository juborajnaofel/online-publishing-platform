import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PostCard from './PostCard';
import { useEffect, useState } from 'react';
import { BackendApi } from '../config/BackendApi';
export default function PostManagerTab() {
  
  const [data_draft, setDraft] = useState([]);
  const [data_published, setDataPublished] = useState([]);
  const [data_scheduled, setDataScheduled] = useState([]);

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
  },[]);


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
  },[]);
  


  return (
    <Tabs
      defaultActiveKey="draft"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="draft" title="Draft">
        {
            data_draft.map((item, index)=>{
                return <><PostCard key={item.id} title={item.title} description={item.description} link={item.link}/><br/></>    
            })
        }
      </Tab>
      <Tab eventKey="scheduled" title="Scheduled">
            {
                data_scheduled.map((item, index)=>{
                    return <><PostCard key={item.id} title={item.title} description={item.description} link={item.link}/><br/></>    
                })
            }
      </Tab>
      <Tab eventKey="published" title="Published">
        {
            data_published.map((item, index)=>{
                return <><PostCard key={item.id} title={item.title} description={item.description} link={item.link}/><br/></>    
            })
        }
      </Tab>
    </Tabs>
  );
}