import { useNavigate } from 'react-router-dom';
import { post } from '../utils/http';

const handleFormSubmit = async (data) => {
    try {
        const response = await post(`${import.meta.env.VITE_API_URL}/register`, data);
        return response;
    }catch (error) {
        throw new Error(error.message);
    }
};

export default handleFormSubmit;