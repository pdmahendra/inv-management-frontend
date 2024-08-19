import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { API } from "../index";

export const loginUser = async (data) => {
  const response = await axios.post(`${API.users.login}`, data);
  return response.data.token;
};


export const useLogin = () => {
    return useMutation({
      mutationFn: loginUser,
      onSuccess: (token) => {
        localStorage.setItem('accessToken', token);
        console.log('Token saved to localStorage:', token);
      },
      onError: (error) => {
        console.error('Login error:', error);
      },
    });
  };
