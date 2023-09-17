<<<<<<< HEAD:frontendd/src/admin_component/viewTraining/view_trainings.js
=======
// importing_necessary_packages
import axios from 'axios';
>>>>>>> origin/teja:frontendd/src/Components/admin_component/archieveTrainings/archieve.js
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
<<<<<<< HEAD:frontendd/src/admin_component/viewTraining/view_trainings.js
import 'react-toastify/dist/ReactToastify.css';

function Training() {
  const [tableData, setTableData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const handleDelete = async (itemId) => {
    const training_id = itemId;
    try {
      const response = await axios.post(`http://localhost:5000/users/dtrain`, { training_id });
      if (response.data.message === 'Training deleted successfully') {
        const updatedTableData = tableData.filter(item => item.id !== itemId);
        setTableData(updatedTableData);
        toast.success("Training deleted successfully");
      } else {
        toast.error('Error deleting item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/get_trainings');
      if (response.status === 200) {
        setTableData(response.data.data);
      } else {
        console.log('Error response:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
=======
import adminApiService from '../../../services/admin/adminservice';

function History() {
    const [tableData, setTableData] = useState();
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const handlerestore = async (itemId) => {

        const id = itemId
        try {
            const response = await adminApiService.restoreTraining(itemId);

            if (response.data.message === 'Training restored successfully') {

                const updatedTableData = tableData.filter(item => item.id !== itemId);
                setTableData(updatedTableData);
                toast.success("Training restored succesfully")
                setTimeout(()=>{
                    window.location.reload()
                },1500)

            } else {
                toast.error('Error deleting item');
            }
        } catch (error) {
            console.log('Error deleting item:', error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await adminApiService.fetchDeletedTrainings();
            if (response.status === 200) {
                setTableData(response.data.data);

            } else {
                console.log('Error response:');
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
>>>>>>> origin/teja:frontendd/src/Components/admin_component/archieveTrainings/archieve.js

  const sortedData = tableData.sort((a, b) => {
    const aValue = a[sortBy] || '';
    const bValue = b[sortBy] || '';
    const order = sortOrder === 'asc' ? 1 : -1;
    return aValue.localeCompare(bValue) * order;
  });

<<<<<<< HEAD:frontendd/src/admin_component/viewTraining/view_trainings.js
  return (
    <>
      <ToastContainer />
      <Modal
        show={modalShow}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Training Schedule
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="main-user">
            <div className="table-responsive table-responsive-sm">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" onClick={() => handleSort('training_name')}>Project Name</th>
                    <th scope="col" onClick={() => handleSort('trainer')}>Trainer</th>
                    <th scope="col" onClick={() => handleSort('domain')}>Domain</th>
                    {/* Add other columns and sort handlers as needed */}
                    <th scope="col">Start Date</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Date</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Registered Users</th>
                    <th scope="col">Vacancies Left</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData ? sortedData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.training_name}</td>
                      <td>{item.trainer}</td>
                      <td>{item.domain}</td>
                      <td>{(item.startdate).split('T')[0]}</td>
                      <td>{new Date(item.startdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                      <td>{(item.enddate).split('T')[0]}</td>
                      <td>{new Date(item.enddate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                      <td>{item.initial_seats - item.no_of_seats}</td>
                      <td>{item.no_of_seats}</td>
                      <td><button onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button></td>
                    </tr>
                  )) : ""}
                </tbody>
              </table>
            </div>
          </div>
          <Modal.Footer></Modal.Footer>
        </Modal.Body>
      </Modal>
      <Button className='schedule' variant="primary" onClick={handleShow}>
        Upcoming <i className="fa-solid fa-forward"></i>
      </Button>
    </>
  );
}

export default Training;
=======
    return (
        <>
            <ToastContainer />
            <Modal
                show={modalShow}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Training Schedule
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className="main-user">
                        <div className="table-responsive table-responsive-sm">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>

                                        <th scope="col">Project Name</th>
                                        <th scope="col">Trainer</th>
                                        <th scope="col">Domain</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">Start Time</th>
                                        <th scope="col">End Date</th>
                                        <th scope="col">End Time</th>
                                        <th scope="col">RegisteredUsers</th>
                                        <th scope="col">VacanciesLeft</th>
                                        <th scope="col"> </th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {tableData ? tableData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.training_name}</td>
                                            <td>{item.trainer}</td>
                                            <td>{item.domain}</td>
                                            <td>{(item.startdate).split('T')[0]}</td>
                                            <td>{new Date((item.startdate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                                            <td>{(item.enddate).split('T')[0]}</td>
                                            <td>{new Date((item.enddate)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>

                                            <td>{(item.initial_seats) - (item.no_of_seats)}</td>
                                            <td>{item.no_of_seats}</td>
                                            <td><button onClick={() => handlerestore(item.id)}><i class="fa-solid fa-trash del"></i></button></td>

                                        </tr>
                                    )) : ""}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal.Footer>


                    </Modal.Footer>


                </Modal.Body>
            </Modal >
            <Button className='schedule' variant="primary" onClick={() => setModalShow(true)}>
                Archieved  <i class="fa-solid fa-clock-rotate-left"></i>
            </Button>

        </>
    );
}

export default History;
>>>>>>> origin/teja:frontendd/src/Components/admin_component/archieveTrainings/archieve.js
