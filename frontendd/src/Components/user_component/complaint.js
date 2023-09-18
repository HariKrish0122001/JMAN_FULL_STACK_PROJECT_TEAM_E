import React, { useState } from "react";
import './style.scss'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';
import { useRef } from 'react';
import userapiService from "../../services/user/userservice";
import { toast } from "react-toastify";



export default function Complaint({user}) {
    const form = useRef();
    console.log("asdasdadsaffdvsdfgbmsdgjso",user)
    const [showModal, setShowModal] = useState(false);
    const username=user.user.data.name
    const mail=user.user.data.mail
    const [request,setRequest]=useState()

    const handleClose = () => {
        setShowModal(false);
    }

    const handleShow = () => {
        setShowModal(true);
    }

    const sendEmail =async (e) => {
        e.preventDefault();
        debugger
        emailjs.sendForm('service_203o8iw', 'template_o91f0iq', form.current, '9rndwk3q5_ec5AzuH').then(
            (result) => {
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            }
        );
        const send_db=await userapiService.feedback({username,mail,request}).then((response)=>{
            
            if(response.data==="Request sent successfully"){
                toast.success("Request Submitted")
            }
            else{
                toast.error("Failed to submit your request")
            }
        })
        
    }

    return (
        <>
            <button className="complaint" onClick={handleShow}>
                Request <i class="fa-regular fa-thumbs-up"></i>
            </button>
            <Modal show={showModal} onHide={handleClose} className="complaint">
                <form ref={form} onSubmit={sendEmail}>
                        <div className="column">
                            <label>Name <span className='reqfield'> * </span></label>
                            <input className="complaintname" type="text" name="user_name"  required value={username} disabled/>
                        </div>
                        <div className="column">
                            <label>Email <span className='reqfield'> * </span></label>
                            <input className="complaintemail" type="email" name="user_email" value={mail} required disabled/>
                        </div>
                    <div className="row">
                        <label>Message <span className='reqfield'> * </span></label>
                        <textarea className="complaintmessage" name="message"  onChange={(e)=>{
                            setRequest(e.target.value)
                        }} required/>
                    </div>
                    <div className="row">
                        <input type="submit" value="Send" />
                    </div>
                </form>

            </Modal>
        </>
    );
}



