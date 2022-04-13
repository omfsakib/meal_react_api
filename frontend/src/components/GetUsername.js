import React,{useEffect,useContext,useState} from "react";
import AuthContext from "../Context/AuthContext";

const Username = ({member}) => {

    let {authTokens} =useContext(AuthContext)
    const [user,setUser] = useState([])

    useEffect(() => {
        getUser()
    },[])

    let getUser = async()=>{
        let response = await fetch(`/api/username/${member}`,{
            method:'GET',
            headers:{
               'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            }
        })
        let data = await response.json()
        setUser(data)
    }

    return(
        <>{user.username}</>
    )
}

export default Username;