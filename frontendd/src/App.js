import { Routes,Route} from 'react-router-dom';
import Userauth from './Userauth';
import './App.css';
import { Navigate } from 'react-router-dom';
import Admin_training from './Components/admin_component/createTraining/create_training';
import Login from './Components/login_component/login/login'
import Signup from './Components/login_component/signin/register';
// import Users from './user_component/Users';
import UserForm from './Components/user_component/UserForm';
import PrivateRoute from './privateroute';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {

  const userAuthenticated = Userauth();
  console.log("checking",userAuthenticated);

  return (
    <div className="App">
      <Routes>
<<<<<<< HEAD
      <Route path='/admin_training' element={<Admin_training/>}/> {/* userAuthenticated ? <Admin_training/>: <Navigate to ="/"/> */}
      {/* <Route path='/admin_training' element={<Admin_training/>}/> */}
=======
      {/* <Route path='/admin_training' element={userAuthenticated ? <Admin_training/>: <Navigate to ="/"/>}/> */}
      <Route path='/admin_training' element={<Admin_training/>}/>
>>>>>>> origin/teja
      <Route path='/' element={ <Login/>}/>
      <Route path='/signup' element={ <Signup/>}/>
      {/* <Route path="/userform" element={userAuthenticated ? <UserForm /> : <Navigate to="/" />} /> */}
      <Route path="/userform" element={<UserForm />} />
      </Routes>
    </div>
  );
}

export default App;
