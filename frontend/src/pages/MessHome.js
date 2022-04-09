import React,{useContext, useEffect, useState} from "react";
import video from '../images & videos/video.mp4';
import mask from '../images & videos/mask.jpg';
import AuthContext from "../Context/AuthContext";
import { HomeItems } from "../components/HomeItems";
import { Link } from "react-router-dom";


const MessHome = () => {
    
    let {logoutUser,authTokens} =useContext(AuthContext)
    let [mess,setMess] = useState([])

    let time = new Date().toLocaleTimeString();

    const [ctime, setTime] = useState(time);
    const UpdateTime = () => {
        time = new Date().toLocaleTimeString();
        setTime(time);
    }

    setInterval(UpdateTime,1000)

    useEffect(() => {
        getMess()
    },[])
    let getMess = async()=>{
        let response = await fetch('/api/mess/',{
            method:'GET',
            headers:{
               'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            }
        })
        let data = await response.json()
        setMess(data)
        if(response.status === 200) {
            localStorage.setItem('mess',JSON.stringify(data))
        }else{
            alert('Something went wrong')
        }
    }
    
    return (
        <>
        <section className="main">
            <video 
                src={video} 
                muted
                autoPlay={"autoplay"}
                preload="auto"
                loop
                >
                </video>
            <img src={mask} className="mask" alt="mask"/>
            <h2 key={mess.id}>{mess.name}</h2>

            <p className="copyrightText">{ctime}</p>

            <ul className="sci">
            {HomeItems.map((item, index) => {
                        return (
                            <li key={index} >
                                {item.path === '/login' ? <Link onClick={logoutUser} to = {item.path}>
                                    {item.icon}
                                </Link> : <Link to = {item.path}>
                                    {item.icon}
                                </Link>}
                                
                            </li>
                        )
                    })}
            </ul>
            
        </section>
        </>
    )
}

export default MessHome;