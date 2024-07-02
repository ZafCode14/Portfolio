import axios from 'axios'
import authHeader from './auth.header';
import proxy from './proxy'


const register = async (values) => {
    return axios.post(proxy + "auth/register", values)
    .then((response) => {
        return response.data;
    })
}

const edit = async (values) => {
    try {
        const response = await axios.put(proxy + `users/edit/${values.userId}`, values, {
            headers: authHeader()
        });
        const whoAmIResponse = await axios.get(proxy + "auth/whoami", {
            headers: authHeader()
        });
        localStorage.setItem("data", JSON.stringify(whoAmIResponse.data));
        return response.data;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
}

const userData = async (values) => {
    try {
        const response = await axios.get(proxy + `users/${values}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
}

const login = async (username, password) => {
    try {
        const response = await axios.post(proxy + "auth/login", { username, password });
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));

            const whoAmIResponse = await axios.get(proxy + "auth/whoami", {
                headers: authHeader()
            });
            localStorage.setItem("data", JSON.stringify(whoAmIResponse.data));
        }
        
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("data");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}
const getCurrentData = () => {
    return JSON.parse(localStorage.getItem("data"));
}

const refresh = async () => {
    try {
        const response = await axios.get(proxy + "auth/refresh", {
            headers: {Authorization: `Bearer ${getCurrentUser().refreshToken}`}
        });
        
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify({
                accessToken: response.data.accessToken,
                refreshToken: getCurrentUser().refreshToken
            }));
            const whoAmIResponse = await axios.get(proxy + "auth/whoami", {
                headers: {Authorization: `Bearer ${response.data.accessToken}`}
            });
            localStorage.setItem("data", JSON.stringify(whoAmIResponse.data));
        }
    } catch (error) {
        console.log(error);
        logout();
        window.location.reload();
    }
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    getCurrentData,
    refresh,
    edit,
    userData
}

export default AuthService;