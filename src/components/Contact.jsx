import { arr } from '../Constants';
const Contact = () => {
    console.log(arr);
    let op = "";
    arr.forEach((str)=>{
        op += '"' + str.substring(0,str.length-1) + '",';
    })
    return (
        <div>
            <h1>Contact Page</h1>
            <p>under Development coming soon🚀</p>
            <h4>{op}</h4>
        </div>
    )
}

export default Contact;