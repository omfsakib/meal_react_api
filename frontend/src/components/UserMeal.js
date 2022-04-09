import React,{useEffect,useContext, useState} from "react";
import AuthContext from "../Context/AuthContext";
import * as FaIcons from 'react-icons/fa';
import MessHome from "../pages/MessHome";

const UserMeal = ({obj}) => {


    let {authTokens} =useContext(AuthContext)
    const [meal,setMeal] = useState([])

    useEffect(() => {
        getMeal()
    },[])

    let getMeal = async()=>{
        const response = await fetch(`/api/meal/${obj}`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            }
        })
        let data = await response.json()
        setMeal(data)
    }

    let updateMeal = async () => {
        fetch(`/api/update/meal/${meal.id}`,{
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ String(authTokens.access)
            },
            body: JSON.stringify(meal)
        })
    }

    let handleSubmit = () => {
        updateMeal()
    }
    let handleOnChange = (e) =>{
        if(!e.target.value){
            setMeal({...meal, 
                'todays_meal': 0 ,
                'total_meal': parseInt(meal.total_meal) - parseInt(meal.todays_meal)
            })
        }
        else{
            setMeal({...meal, 
                'total_meal': ( parseInt(meal.total_meal) + (parseInt(e.target.value)) - parseInt(meal.todays_meal)),
                'todays_meal': parseInt(e.target.value), 
            })
            
        }
        
    }
    return (
        <>
        <div className="card">
            <div className="icon">
                <img src={meal.profile_pic} />
            </div>
            <div className="con">
                <h2>{meal.user}</h2>
                <p>Todays Meal : </p><input  onChange={(e) => {handleOnChange(e)}} defaultValue={meal.todays_meal}/> <br/>
                <p>Total Meals : {meal.total_meal}</p><br/>
                <p>Spends : {meal.person_spend}</p><br/>
                <p onClick={handleSubmit}>Done <FaIcons.FaCheck/></p>
            </div>
        </div>
        </>
    )
}

export default UserMeal;