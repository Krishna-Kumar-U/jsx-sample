import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/action';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch]);

  return null;
}

export default Logout;