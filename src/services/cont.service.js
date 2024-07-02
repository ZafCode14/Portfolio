import axios from 'axios'
import authHeader from './auth.header';
import proxy from './proxy'


const create_message = async (values) => {
    return axios.post(proxy + "contact/add", values)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const get_all_messages = async () => {
    return axios.get(proxy + "contact/all", 
        {headers: authHeader()}
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const delete_message = async (id) => {
    return axios.delete(proxy + `contact/delete/${id}`, 
        {headers: authHeader()}
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const ContService = {
    create_message,
    get_all_messages,
    delete_message
}

export default ContService;