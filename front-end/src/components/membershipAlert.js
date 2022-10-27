import Alert from 'react-bootstrap/Alert';
export default function MembershipAlert(){
    
    
    return <>{
        localStorage.getItem("membership") === "null" || JSON.parse(localStorage.getItem("membership"))["type"] === "free" ? 

        <Alert variant={"warning"}>
        Currently You are using Free membership plan,<br/>
        1. You are limited with only 2 posts daily<br/>
        2. You cannot schedule your posts <br/><br/>

        Grab our premium membership today and remove all these limitations!!
       </Alert>
       :
       <Alert variant={"success"}>
       Currently You are using Paid membership plan, Every feature is unlocked to you!!<br/>

       However you can switch to our free plan anytime!! In a free plan,<br></br>
       1. You are limited with only 2 posts daily<br/>
       2. You cannot schedule your posts <br/><br/>
    </Alert>
   }</>
}