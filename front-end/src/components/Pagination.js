export default function Pagination({totalPosts, postsPerPage,setCurrentPage}){
    let pages = [];

    for(let i=1;i <= Math.ceil(totalPosts/postsPerPage) ;i++){
        pages.push(i);
    }
    return (
        <>
            {pages.map((item,index)=>{
                return <><button key={index} onClick={()=> setCurrentPage(item)}>{ item }</button>{"\u00A0"}</>;
            })}
            <br/>
            <br/>

        </>
    )
}