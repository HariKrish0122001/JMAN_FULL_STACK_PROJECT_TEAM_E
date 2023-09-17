import React, { useState } from "react";
import './requests.scss'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';
import { useRef } from 'react';



export default function Viewrequests({ user }) {

    const form = useRef();
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    }

    const handleShow = () => {
        setShowModal(true);
    }

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_203o8iw', 'template_o91f0iq', form.current, '9rndwk3q5_ec5AzuH').then(
            (result) => {
                console.log(result.text);
            },
            (error) => {
                console.log(error.text);
            }
        );
    }
    const row = () => {
        return (
            <>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
            </>
        )
    }
    return (
        <>
            <button className="complaint" onClick={handleShow}>
                View Requests
            </button>
            <Modal show={showModal} onHide={handleClose} className="complaint">

                <table className="table table-hover table-bordered results" id="allTrainings">
                    <thead>
                        <tr>

                            <th >Request Id</th>
                            <th >User Name</th>
                            <th>User Email </th>
                            <th >Message </th>

                        </tr>
                        <tr className="warning no-result">
                            <td colspan="4"><i className="fa fa-warning"></i> No result</td>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <Users usersData={userdata} searchQuery={searchQuery} handleRegister={handleRegister} /> */}
                        {row()}
                    </tbody>
                </table>

            </Modal>
        </>
    );
}




