import React, { useState } from "react";
import './requests.scss'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef } from 'react';
import adminApiService from "../../../services/admin/adminservice";
import { ToastContainer, toast } from "react-toastify";



export default function Viewrequests({ user }) {

    const form = useRef();
    const [showModal, setShowModal] = useState(false);
    const [reqData,setReqdata]=useState([])

    const fetchdata=async()=>{
        const requestList=await adminApiService.requestList().then((response)=>{
            if(response.data.message==='Request fetched success'){
               setReqdata(response.data.data)
            }
            else{
                toast.error("Failed to Fetch")
            }
            
        })

    }
    const handleClose = () => {
        setShowModal(false);
    }

    const handleShow = () => {
        fetchdata()
        setShowModal(true);
    }
    

    const row = () => {
        return reqData.map(request=>(
            <tr key={request.id}>
               
                <td>{request.name}</td>
                <td>{request.mail}</td>
                <td>{request.request}</td>
            </tr>)
        )
    }
    return (
        <>
            <button className="complaint" onClick={handleShow}>
                Requests <i class="fa-regular fa-comment"></i>
            </button>
            <ToastContainer/>
            <Modal show={showModal} onHide={handleClose} className="complaint">

                <table className="table table-hover table-bordered results" id="allTrainings">
                    <thead>
                        <tr>
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