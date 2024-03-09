import axios from 'axios'
import authHeader from './auth.header';

const register = async (values) => {
    return axios.post("https://web-01.develapp.tech/api/auth/register/", values)
    .then((response) => {
        return response.data;
    })
}

const edit = async (values) => {
    return axios.put(`https://web-01.develapp.tech/api/users/edit/${values.userId}`, values, 
        {headers: authHeader()}
    )
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.log("!!!!!!!!!", error);
    })
}

const login = async (username, password) => {
    return axios.post("https://web-01.develapp.tech/api/auth/login", {username, password})
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
                return response.data;
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const refresh = async () => {
    try {
        const response = await axios.get("https://web-01.develapp.tech/api/auth/refresh", {
            headers: {Authorization: `Bearer ${getCurrentUser().refreshToken}`}
        });
        
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify({
                accessToken: response.data.accessToken,
                refreshToken: getCurrentUser().refreshToken
            }));
        }
    } catch (error) {
        console.log(error);
        logout();
        window.location.reload();
    }
};

const data = async () => {
    try {
        const response = await axios.get("https://web-01.develapp.tech/api/auth/whoami", {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    refresh,
    data,
    edit
}

export default AuthService;