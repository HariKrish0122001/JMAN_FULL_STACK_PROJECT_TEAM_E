import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Complaint from "../user_component/complaint";


function Usernavbar({username}) {
    const navigate=useNavigate();
    const handleLogout = ()=> {
        localStorage.removeItem('jwtToken');
        navigate('/')
    }
    return (
        <>
            <div className="sidebar">
                <p className='welcomeAdmin'> Welcome <br/><strong>{username}</strong></p>
                <Complaint />
                <div className="logout-btn-div">
                    <button className='logOut' onClick={handleLogout}>Logout <i class="logout fa-solid fa-arrow-right-from-bracket"></i></button>
                </div>
            </div>
        </>
    )
}

export default Usernavbar;