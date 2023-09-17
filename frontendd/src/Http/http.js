import axios from 'axios'

const Localhost =axios.create({
    baseURL:'http://localhost:5000/users'
})

export default Localhost;