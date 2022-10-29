import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PostCard from './PostCard';
import { useEffect, useState } from 'react';
import { BackendApi } from '../config/BackendApi';
import { useParams } from 'react-router-dom';
import Pagination from './Pagination';

export default function PostManagerTab() {
  let { tab } = useParams();
  const [data_draft, setDraft] = useState([]);
  const [data_published, setDataPublished] = useState([]);
  const [data_scheduled, setDataScheduled] = useState([]);
  const [listchange, setLC] = useState(false);


  //for draft
  const postsPerPage = 3;
  const [curretPageDraft, setCurrentPageDraft] = useState(1);
  const lastPostIndexDraft = curretPageDraft * postsPerPage;
  const firstPostIndexDraft = lastPostIndexDraft - postsPerPage;

  //for scheduled
  const [curretPageScheduled, setCurrentPageScheduled] = useState(1);
  const lastPostIndexScheduled = curretPageScheduled * postsPerPage;
  const firstPostIndexSchedlued = lastPostIndexScheduled - postsPerPage;

  //for published
  const [curretPagePublished, setCurrentPagePublished] = useState(1);
  const lastPostIndexPublished = curretPagePublished * postsPerPage;
  const firstPostIndexPublished = lastPostIndexPublished - postsPerPage;



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


  const currentPostsDrafts = data_draft.map((item, index)=>{
      return <><PostCard triggerchange={listchange} setLC={setLC} id={item.id} draft={true} key={item.id} title={item.title} description={item.description} 
      created_at={ typeof item.created_at === "string"? item.created_at.slice(0,16).replace('T', ' '): "" }/><br/></>    
    }).slice(firstPostIndexDraft, lastPostIndexDraft);


  const currentPostsScheduled = data_scheduled.map((item, index)=>{
        return <><PostCard triggerchange={listchange}  setLC={setLC} id={item.id} key={item.id} title={item.title} description={item.description}
        scheduled_at= {item.scheduled_at}
        created_at={ typeof item.created_at === "string"? item.created_at.slice(0,16).replace('T', ' '): "" }/><br/></>  
    }).slice(firstPostIndexSchedlued, lastPostIndexScheduled);


  const currentPostsPublished = data_published.map((item, index)=>{
    return <><PostCard published_at={item.published_at} triggerchange={listchange}  setLC={setLC} id={item.id} key={item.id} title={item.title} description={item.description}
    created_at={ typeof item.created_at === "string"? item.created_at.slice(0,16).replace('T', ' '): "" }/><br/></>  
    }).slice(firstPostIndexPublished, lastPostIndexPublished);

  return (
    <Tabs
      defaultActiveKey={tab}
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="draft" title="Draft">
        {
            data_draft.length !== 0?
            <>
            {currentPostsDrafts}
            {"Current Page:"+curretPageDraft}<br></br>
            <Pagination totalPosts={data_draft.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPageDraft}/>
            </>
            :
            <>No draft found</>
        }
      </Tab>
      <Tab eventKey="scheduled" title="Scheduled">
            {
                data_scheduled.length !== 0?
                <>
                {currentPostsScheduled}
                {"Current Page:"+curretPageScheduled}<br></br>
                <Pagination totalPosts={data_scheduled.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPageScheduled}/>
                </> 
                :
                <>No scheduled posts found</>
            }
      </Tab>
      <Tab eventKey="published" title="Published">
        {
            data_published.length !== 0?
            <>
            {currentPostsPublished}
            {"Current Page:"+curretPagePublished}<br></br>
            <Pagination totalPosts={data_published.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPagePublished}/>
            </> 
            :
            <>No published posts found</>
        }
      </Tab>
    </Tabs>
  );
}