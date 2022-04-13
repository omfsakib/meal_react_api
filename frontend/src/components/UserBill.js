import React,{useState} from "react";
import CheckDeposit from "./CheckDeposit";

const UserBill = ({bill}) => {
    const [ubill,setUBill] = useState(bill)
    let mess =  JSON.parse(localStorage.getItem('mess'))
    let members = mess.members
    let deposit_for = bill.bill_on
    return(
        <>
            <p>{ubill.bill_on}</p>
            {members.map((member,i) => {
                return(
                    <CheckDeposit key={i} member = {member} deposit_for ={deposit_for}/>
                )
            })}
        </>
    )
}

export default UserBill;