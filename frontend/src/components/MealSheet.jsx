import React,{useState} from "react";

const MealSheet = () => {
    const [monthView,setMonthView] = useState(() => localStorage.getItem('monthview') ? JSON.parse(localStorage.getItem('monthview')) : null)
    const [mealsheet,setMealSheet] = useState(monthView.mealsheet)

    return (
        <>
        {mealsheet ?  <> {mealsheet.map((date,index)=>{
            return(
                <div className="datesheet" key={index}>
                    <p>Date : {Object.keys(mealsheet[index])[0]}</p>
                    {console.log(mealsheet[index])}
                </div>
            )
        })}</>
        : null}
        </>
    )
}

export default MealSheet;