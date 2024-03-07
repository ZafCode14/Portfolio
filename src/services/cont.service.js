import axios from 'axios'
import authHeader from './auth.header';

const create_message = async (values) => {
    return axios.post("/contact/add", values)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const get_all_messages = async () => {
    return axios.get("contact/all", 
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
    get_all_messages
}

export default ContService;