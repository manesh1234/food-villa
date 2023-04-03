import { useState } from "react";

const Section = ({ title, description, isVisible, setisVisible }) => {
    return (
        <div style={{ border: "2px solid black", margin: 30 }}>
            <h1>{title}</h1>
            <button onClick={setisVisible}>{isVisible?"Hide":"show"}</button>
            {
                isVisible && <p>{description}</p>
            }
        </div>
    )
}



const About = () => {
    const [isVisible, setIsVisible] = useState('');
    return (
        <div>
            <h1>About us Page</h1>
            <Section title={"about food villa"} description={"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."}
                isVisible={isVisible==='about'}
                setisVisible={()=>{
                    setIsVisible(isVisible==='about'?'':'about');
                }}/>
            <Section title={"team food villa"} description={"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."}
                isVisible={isVisible==='team'}
                setisVisible={()=>{
                    setIsVisible(isVisible==='team'?'':'team');
                }}/>
            <Section title={"careers"} description={"careers of food villa"}
                isVisible={isVisible==='careers'}
                setisVisible={()=>{
                    setIsVisible(isVisible==='careers'?'':'careers');
                }}/>
        </div>
    )
}

export default About;