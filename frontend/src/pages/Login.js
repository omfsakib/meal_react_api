import React, { useContext } from "react";
import video from '../images & videos/video.mp4';
import mask from '../images & videos/mask.jpg';
import {Link} from 'react-router-dom';
import AuthContext from "../Context/AuthContext";

const Login = () => {

    let {loginUser} = useContext(AuthContext)

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
            <div className="page">
            <div className="container">
                <div className="left">
                    <div className="login">
                        <div className="eula">
                            By logging in you agree to the ridiculously long terms that you didn't bother to read. <br/>
                            Didn't have an account? <Link to="/signup">Signup</Link>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="form">
                        <form onSubmit={loginUser}>
                            <label htmlFor="email">Username</label>
                            <input className="login_form" type="text" id="username" placeholder="Enter Username" name="username"/>
                            <label htmlFor="password">Password</label>
                            <input className="login_form" type="password"  id="password" placeholder="Enter Password" name="password"/>
                            <input type="submit" id="submit" value="Submit"/>
                        </form>
                        
                        <p className="error"></p>
                    </div>
                    
                </div>
            </div>
        </div>
        </section>
        </>
    )
}
export default Login;