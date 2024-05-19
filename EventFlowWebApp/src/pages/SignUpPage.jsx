import { useState } from "react";
import { USER_REGISTER_URL } from "../constants/api";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
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

    // Perform form validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Clear previous error messages
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        console.log("Registration successful");
        navigate("/main");
      } else {
        setError("Registration failed");
        console.error("Registration failed");
      }
    } catch (error) {
      setError("Error during registration");
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <div className="bg-blue-900 flex justify-center items-center w-full h-screen">
        {/* Login Box */}
        <div className="bg-black rounded-lg shadow-md flex flex-col md:flex-row w-96 md:w-1/2">
          {/* Left Section with Image */}
          <div className="hidden md:block flex-shrink-0 pr-4 w-1/2">
            <img
              src="./assets/left-image.jpg"
              alt="Left Image"
              className="w-full h-full rounded-tl-lg rounded-bl-lg rounded-tl-lg rounded-bl-none rounded-tr-lg rounded-br-lg"
            />
          </div>

          {/* Right Section with Form */}
          <div className="flex-grow p-2 flex flex-col justify-center">
            {/* Registration Title */}
            <h1 className="text-3xl text-white text-center font-semibold mb-8">
              Registration
            </h1>

            <form onSubmit={handleSubmit} className="mb-4">
              {/* Input Fields */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-2">
                <div className="mb-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm text-white"
                    required
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="lastName" className="text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastname"
                    className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div className="mb-2">
                  <label htmlFor="email" className="text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="phone" className="text-sm text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500"
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
                    className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Accept Terms Checkbox */}
              <div className="flex items-center justify-center mt-4">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  className="mr-2"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="acceptTerms" className="text-sm text-white">
                  I accept the Terms and Conditions
                </label>
              </div>

              {/* Sign Up Button */}
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="mt-4 w-40 bg-blue-500 text-white text-center p-1 rounded-full hover:bg-blue-700 border border-white"
                >
                  Sign Up
                </button>
              </div>

              {/* Existing User Login Link */}
              <p className="mt-4 text-center text-white">
                Already have an account?{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Login here
                </a>
              </p>

              {/* Error or Success Messages */}
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}
              {success && (
                <p className="text-green-500 text-sm mt-2 text-center">
                  Registration successful!
                </p>
              )}
            </form>

            {/* Copyrights */}
            <p className="mt-4 text-sm text-center text-gray-600">
              &copy; 2024 Your Company Name. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
