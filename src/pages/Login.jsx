import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../api/query/authApi";
import toast from 'react-hot-toast'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useLogin();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    const data = {
      username,
      password,
    };
    login(data, {
      onSuccess: () => {
        toast.success('Login successful!');
        navigate("/");
      },
      onError: () => {
        toast.error('Login failed! Please try again.');
      }
    });
    setUsername("");
    setPassword("");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center ">
      <div className="md:w-[25%] w-[80%] flex flex-col items-start gap-2">
        <div className="flex flex-col gap-1 ">
          <div className="font-semibold text-[2rem]">Login</div>
          <div>Please enter your details to Log In</div>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <div>Username*</div>
              <input
                type="text"
                name="username" // Use `name` attribute for form handling
                value={username} // Bind state value to input
                onChange={handleChange} // Handle changes
                className="bg-[#EFEFEF] px-4 py-2 rounded-[5px] w-full"
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div>Password*</div>
              <input
                type="password"
                name="password" // Use `name` attribute for form handling
                value={password} // Bind state value to input
                onChange={handleChange} // Handle changes
                className="bg-[#EFEFEF] px-4 py-2 rounded-[5px] w-full"
                required
                disabled={isLoading}
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
            {/* {error && <div className="text-red-400">{error}</div>} */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
