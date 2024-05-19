import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN_URL } from "../constants/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("DATA: ", data);
        const token = data.token;
        localStorage.setItem("authToken", token);
        setSuccess(true);
        console.log("Login successful");
        navigate("/main");
      } else {
        setError("Login failed");
        console.error("Login failed");
      }
    } catch (error) {
      setError("Error during login");
      console.error("Error during login", error);
    }
  };
  return (
    <>
      <body className="bg-blue-900 flex justify-center items-center w-full h-screen">
        {/* Login Box */}
        <div className="bg-black rounded-lg shadow-md flex flex-col md:flex-row w-96 md:w-1/2">
          {/* Right Section with Form */}
          <div className="flex-grow p-6 flex flex-col justify-end flex-grow p-2">
            {/* Login Title */}
            <h1 className="text-3xl text-white text-center font-semibold mb-6">
              Login
            </h1>
            <form onSubmit={handleSubmit} className="mb-4">
              {/* Input Fields */}
              <div className="grid grid-cols-1 gap-2">
                <div className="mb-2">
                  <label htmlFor="email" className="text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="text-white bg-black w-full p-3 md:p-4 border-b focus:outline-none focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="text-sm text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="text-white bg-black w-full p-3 md:p-4 border-b focus:outline-none focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Existing User Login Link */}
              <div className="text-right">
                <a
                  href="#"
                  className="mt-4 text-sm text-center text-gray-600 hover:underline"
                >
                  Forget Password?
                </a>
              </div>
              {/* Login Button */}
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="mt-4 w-40 px-4 py-1 bg-blue-500 text-white text-center p-1 rounded-full hover:bg-blue-700 border border-white"
                >
                  Login
                </button>
              </div>
              <div className="flex items-center justify-center mt-6">
                <label htmlFor="acceptTerms" className="text-sm text-white">
                  {"Don't have an account? Sign Up Using"}
                </label>
              </div>
              <div className="flex md:flex-row flex-col items-center justify-center mt-4">
                <div className="flex items-center">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./assets/Facebook.png"
                      alt="Facebook"
                      className="h:8 w-8 mx-1"
                    />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <img
                      src="./assets/Google-Plus.png"
                      alt="Instagram"
                      className="h:8 w-8 mx-1"
                    />
                  </a>
                </div>
              </div>
              {/* Existing User Login Link */}
              <p className="mt-4 text-sm text-center text-white">
                Or Sign Up using your email{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  here
                </a>
              </p>
              {/* Error or Success Messages */}
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}
              {success && (
                <p className="text-green-500 text-sm mt-2 text-center">
                  login successful!
                </p>
              )}
            </form>
            {/* Copyrights */}
            <p className="mt-4 text-sm text-center text-gray-600">
              Copyright &copy; EventFlow.com
            </p>
          </div>
          {/* Left Section with Image */}
          <div className="hidden md:block flex-shrink-0 pl-4 w-1/2">
            <img
              src="./assets/left-image.jpg"
              alt="Left Image"
              className="w-full h-full rounded-tl-lg rounded-bl-lg rounded-tl-lg rounded-bl-none rounded-tr-lg rounded-br-lg"
            />
          </div>
        </div>
      </body>
    </>
  );
};

export default LoginPage;
