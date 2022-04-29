import React,{useContext,useState} from "react";
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import BtnSlider from './Slider/BtnSlider';
import AuthContext from "../Context/AuthContext";
import UserDeposits from "./UserDeposits";
import { getDepositData } from "./DepositFetch";
import GetUsername from './GetUsername';

const Deposits = () => {

    let {authTokens} =useContext(AuthContext)
    let mess =  JSON.parse(localStorage.getItem('mess'))
    let total_deposits = 0

    const [deposits,setDeposits] = useState(() => localStorage.getItem('deposits') ? JSON.parse(localStorage.getItem('deposits')) : null)
    
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

    deposits.map((deposit) => {
        total_deposits += parseInt(deposit.amount)
    })

    let updateData = () => {
        setTimeout(() => {
            getDepositData({mess,authTokens}).then(r => { setDeposits(r) })
         }, 500);
    }


    
    return (
        <>
        <div  id="deposits">
            <div className="container-slider">
                {members.map((obj,index) => {
                    return (
                        <div key={index} className={slideIndex === index + 1 ? "slide active-anim" : "slide"}>
                            <UserDeposits obj = {obj} dataUpdate={updateData}/>
                        </div>
                    )
                })}
                <BtnSlider moveSlide={nextSlide} direction={"next"}/>
                <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
            </div>
            <div className="single-deposits">
                <div className="deposits">
                    <p><strong>Member</strong></p>
                    <p><strong>Deposit for</strong></p>
                    <p><strong>Amount</strong></p>
                </div>
                {deposits.map((deposit,index) =>{
                    return(
                        <div className="deposits" key={index}>
                            <p><GetUsername member={deposit.user}/></p>
                            <p>{deposit.deposit_for}</p>
                            <p>{deposit.amount}</p>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default Deposits;