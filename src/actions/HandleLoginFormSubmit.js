import { useNavigate } from 'react-router-dom';
import { post } from '../utils/http';

const handleFormSubmit = async (data, loginUser, navigate) => {
    try {
        const response = await post(`${import.meta.env.VITE_API_URL}/login`, data);
        loginUser(response);
        return response
    } catch (error) {
        console.error(error);
    }
};

export default handleFormSubmit;