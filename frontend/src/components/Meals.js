import React,{useEffect,useContext, useState} from "react";
import AuthContext from "../Context/AuthContext";
import './Slider/Slider.css';
import BtnSlider from './Slider/BtnSlider';
import {LoaderRocket} from './LoaderRocket';
import UserMeal from "./UserMeal";

const Meals = ({mess}) => {

    let members = mess.members ? mess.members : [] 

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== members.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === members.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(members.length)
        }
    }

    return (
        <>
        <div  id="meals">
            <div className="meal_content">
                <p>
                    Here you can see the last added mills and total meal of yours.
                    Also you can see the total spends by meals. <br/><br/>
                    <strong>{mess.name}</strong><br/>
                    Total Meal : <strong>{mess.total_meal}</strong> <br/>
                    Meal Rate : <strong>{mess.meal_rate}</strong> <br/>
                </p>
                <div className="loader">
                    <div className="rocket">
                        {LoaderRocket.map((item,index) => {
                            return(
                                <i key={index} className={item.cName} style={item.style}>{item.icon}</i>
                            )
                        })}
                    </div>
                    <span><i></i></span>
                </div>
            </div>
            
            <div className="container-slider">
                {members.map((obj,index) => {
                    return (
                        <div key={index} className={slideIndex === index + 1 ? "slide active-anim" : "slide"}>
                            <UserMeal obj = {obj} />
                        </div>
                    )
                })}
                <BtnSlider moveSlide={nextSlide} direction={"next"}/>
                <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
            </div>
        </div>
        </>
    )
}

export default Meals;