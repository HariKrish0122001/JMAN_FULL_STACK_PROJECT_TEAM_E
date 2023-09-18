import React, { useState, useEffect, useMemo } from 'react'
import Users from './Users';
import './style.scss'
import { Navigate, useLocation } from 'react-router-dom';
import Navbar from '../user_component/usernavbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import View_trainings from './view_trainings';
import { useNavigate } from 'react-router-dom';


function UserForm() {
    const [searchQuery, setSearchQuery] = useState('');
    const [userdata, setUserdata] = useState([]);
    const [traindata, setTraindata] = useState([]);
    const [id, setId] = useState('');
    const [updateduser, Setupdateduser] = useState();
    const [updatedtraininguser, Setupdatedtraininguser] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const { user_id } = location.state;
    const [selectedColumn, setSelectedColumn] = useState('');
 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = userdata.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(userdata.length / itemsPerPage);

    const userValidation = async () => {
        const jwt = localStorage.getItem('jwtToken');

        if (!jwt) {
            toast.error('Unauthorized access');
            navigate('/');
        } else {
            // setuserAuthenticated(true);
        }
    };

    const getUserdata = async () => {
        try {
            setId(user_id);
            const req = await fetch(`http://localhost:5000/users/get/${user_id}`);
            const resData = await req.json();
            if (resData.length > 0) {
                setUserdata(resData);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getregisteredUserdata = async () => {
        try {
            setId(user_id);
            const req = await fetch(`http://localhost:5000/users/view_trainings/${user_id}`);
            const resData = await req.json();
            if (resData.length > 0) {
                setTraindata(resData);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUserdata();
        getregisteredUserdata();
        userValidation();
    }, [updatedtraininguser, updateduser]);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            toast.error('Unauthorized access');
            navigate('/');
        }
    }, []);

    const handleRegister = async (index) => {
        const updatedUsersData = [...userdata];
        const userData = updatedUsersData[index];

        if (userData.no_of_seats > 0) {
            const confirmation = window.confirm('Do you want to register?');

            if (confirmation) {
                userData.no_of_seats -= 1;
                userData.register = true;
                try {
                    const reg_train = await axios.post('http://localhost:5000/users/register', {
                        training_id: userData.id,
                        user_id: id, //static
                    });
                    console.log(reg_train.data.message);
                    const updatedUsersData = [...userdata];
                    updatedUsersData[index] = userData;
                    updatedUsersData.splice(index, 1);
                    toast.success('Registration successful');
                    setUserdata(updatedUsersData);
                    Setupdateduser(userdata);
                } catch (error) {
                    toast.error('Error registering user:', error);
                }
            }
        }
    };


    const handleUnregister = async (index) => {
        const updatedUsersData = [...traindata];
        const userData = updatedUsersData[index];

        const confirmation = window.confirm('Do you want to unregister?');

        if (confirmation) {
            try {
                const unregister = await axios.put('http://localhost:5000/users/unregister', {
                    training_id: userData.id,
                    user_id: id,
                });
                const updatedUsersData = [...traindata];
                updatedUsersData[index] = userData;
                updatedUsersData.splice(index, 1);
                toast.info('Training unregistered successfully');
                setTraindata(updatedUsersData);
                Setupdatedtraininguser(traindata);
            } catch (error) {
                console.log('error from db');
            }
        }
    };

   

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={currentPage === i ? "active-page" : "inactive-page"}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div>
            <div className='title'>
                <h1>Learning and Development</h1>
            </div>
            <div className="for w-100">
                <div className="container-fluid">
                    <Navbar />
                    <ToastContainer />
                    <React.Fragment>
                        <div class="accordion" id="accordionPanelsStayOpenExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                    <button
                                        class="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseOne"
                                        aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseOne"
                                    >
                                        <strong>Available Trainings </strong>
                                    </button>
                                </h2>

                                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="accordion-body">
                                            <div className="form-group pull-right">
                                                <input
                                                    id="search"
                                                    type="text"
                                                    className="search form-control"
                                                    placeholder="  Search Training name"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                ></input>
                                            </div>
                                            

                                        <div className="table-responsive table-responsive-sm">
                                            <table className="table table-hover table-bordered results" id="allTrainings">
                                                <thead>
                                                    <tr>
                                                        <th>Domain Name</th>
                                                        <th>Training Name</th>
                                                        <th>Trainer</th>
                                                        <th>Start Date</th>
                                                        <th>Start Time</th>
                                                        <th>End Date</th>
                                                        <th>End Time</th>
                                                        <th>Available Seats</th>
                                                        <th>Enroll</th>
                                                    </tr>
                                                    <tr className="warning no-result">
                                                        <td colspan="4">
                                                            <i className="fa fa-warning"></i> No result
                                                        </td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <Users usersData={currentUsers} searchQuery={searchQuery} handleRegister={handleRegister} />
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="pagination">
                                            {renderPageNumbers()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>

                </div>
            </div>



            <div class="accordion accordion-flush " id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <strong>Registered Trainings</strong>
                        </button>
                    </h2>

                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div className="table-responsive table-responsive-sm">
                                <table className="table table-hover table-bordered results" id="allTrainings">
                                    <thead>
                                        <tr>

                                            <th >Domain Name</th>
                                            <th >Training Name</th>
                                            <th>Trainer</th>
                                            <th >Start Date </th>
                                            <th >Start Time</th>
                                            <th >End Date</th>
                                            <th >End Time</th>
                                            <th > UnEnroll</th>
                                        </tr>
                                        <tr className="warning no-result">
                                            <td colspan="4"><i className="fa fa-warning"></i> No result</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <View_trainings usersData={traindata} handleRegister={handleUnregister} />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default UserForm;
