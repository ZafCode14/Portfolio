import axios from 'axios'
import authHeader from './auth.header';
import proxy from './proxy'


const create_room = async (values) => {
    return axios.post(proxy + "chat/room/create", values)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const get_all_rooms = async () => {
    return axios.get(proxy + "chat/room/all", 
        {headers: authHeader()}
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const get_all_messages = async () => {
    return axios.get(proxy + "chat/message/all", 
        {headers: authHeader()}
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const add_messages = async (value) => {
    return axios.post(proxy + "chat/message/create", value,
        {headers: authHeader()}
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const add_new = async (value) => {
    return axios.post(proxy + "chat/new_message/create", value,
        {headers: authHeader()}
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const all_new = async () => {
    return axios.get(proxy + "chat/new_message/all",
        {headers: authHeader()}
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const delete_new = async (value) => {
    return axios.delete(proxy + "chat/delete_new",
        {
            data: value,
            headers: authHeader()
        }
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error(error);
    })
}

const RoomService = {
    create_room,
    get_all_rooms,
    get_all_messages,
    add_messages,
    add_new,
    all_new,
    delete_new
}

export default RoomService;