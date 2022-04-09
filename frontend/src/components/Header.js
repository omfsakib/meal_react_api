import React, { useState } from "react";
import * as Icon from "react-icons/bs";
import * as AiIcon from "react-icons/ai";
import { NavbarItems } from "./NavbarItems";
import { Link } from 'react-router-dom';


const Header = () => {


    const [showMenu,setShowMenu] = useState(false)

    const [dayNightMenu , setDayNightMenu] = useState(false)
    
    const MenuToggle = () =>{
        showMenu ? setShowMenu(false) : setShowMenu(true);

    }
    const DayNight = () =>{
        dayNightMenu ? setDayNightMenu(false) : setDayNightMenu(true);
        if (!dayNightMenu) {
            document.body.classList.add('dark')
        }else if (dayNightMenu) {
            document.body.classList.remove('dark')
        }
    }
    return (
        <>
            <header className={dayNightMenu? 'dark' : ''}>
                <a href="/" className="logo">Meal Manager</a>
                <div className="rightSide">
                    <div className="btns dayNight">
                        {
                            dayNightMenu? <Icon.BsSun onClick={DayNight}/>: <Icon.BsMoon onClick={DayNight}/>
                        }
                        
                    </div>
                    <div className="btns menuToggle">
                        {
                            showMenu? <AiIcon.AiOutlineClose onClick={MenuToggle}/>: <AiIcon.AiOutlineMenu onClick={MenuToggle}/>
                        }
                        
                        
                    </div>
                </div>
            </header>
            <nav className={showMenu? 'navigation active' : 'navigation'}>
                <ul className="nav-menu-items">
                    {NavbarItems.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to = {item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Header;