import React,{useState} from "react";
import GetUsername from './GetUsername';

const MealSheet = () => {
    const [monthView,setMonthView] = useState(() => localStorage.getItem('monthview') ? JSON.parse(localStorage.getItem('monthview')) : null)
    const [mealsheet,setMealSheet] = useState(monthView.mealsheet)
    let mess =  JSON.parse(localStorage.getItem('mess'))
    let dates = mealsheet.map(item => Object.keys(item))
    let members = mess.members

    return (
        <>
        {mealsheet ? 
        <div className="datesheet">
            <p>Date</p>
            {members.map((id,index) => {
                return(
                    <p key={index}><GetUsername member={id}/></p>
                )
            })}
        </div>
        :null}
        {mealsheet ?  <> {mealsheet.map((date,index)=>{
            return(
                <div className="datesheet" key={index}>
                    <p>{dates[index]}</p>
                    {dates[index].map((item,i) => {
                        return(
                            <p key={i}>
                            {date[item].map((value,j) => {
                                return(
                                    <input key={j} defaultValue={value.todays_meal}></input>
                                )
                            })}
                            </p>
                        )
                    })}
                </div>
            )
        })}</>
        : null}
        </>
    )
}

export default MealSheet;