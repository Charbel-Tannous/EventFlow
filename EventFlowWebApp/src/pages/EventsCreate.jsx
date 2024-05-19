import { useState } from "react";
import MainNavigation from "../components/Layout/MainNavigation";

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    category: "",
    location: "",
    date: "",
    time: "",
    description: "",
    sections: [{ section: "", price: "" }],
  });

  // State for success and error modals
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for section and price changes
  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    const sections = [...formData.sections];
    sections[index][name] = value;
    setFormData({ ...formData, sections });
  };

  // Add new section and price input
  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { section: "", price: "" }],
    });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine date and time into an ISO 8601 datetime string
    const isoDateTime = new Date(
      `${formData.date}T${formData.time}:00Z`
    ).toISOString();

    // Transform formData to match the API structure
    const payload = {
      name: formData.eventName,
      categoryName: formData.category,
      location: formData.location,
      description: formData.description,
      date: isoDateTime,
      time: formData.time + ":00", // Ensure time is in the correct format
      tickets: formData.sections.map((section) => ({
        section: section.section,
        price: parseFloat(section.price),
      })),
    };

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:5000/api/event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Show success modal
        setShowSuccessModal(true);
        // After 5 seconds, redirect to events page
        setTimeout(() => {
          window.location.href = "/events";
        }, 5000);
      } else {
        // Show error modal
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <MainNavigation />
      <div className="flex flex-col items-center justify-center mt-8 bg-black">
        <h1 className="text-3xl text-blue-600 text-center font-semibold mb-8">
          Create Event
        </h1>
        <form onSubmit={handleSubmit} className="w-2/3">
          <div className="mb-2">
            <label htmlFor="eventName" className="text-sm text-white">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              placeholder="Enter Event Name"
              className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2 relative">
            <label htmlFor="category" className="text-sm text-white">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="appearance-none w-full bg-black text-white p-2 border-b focus:outline-none focus:border-blue-500 rounded-full"
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a Category
              </option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="art">Art</option>
              <option value="technology">Technology</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="business">Business</option>
              <option value="community">Community</option>
              <option value="entertainment">Entertainment</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 12.586l4.293-4.293 1.414 1.414L10 15.414l-5.707-5.707 1.414-1.414z" />
              </svg>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="location" className="text-white">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter Location"
              className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2 relative">
            <label htmlFor="date" className="text-white">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              required
            />
            <img
              src="./assets/Calendar.png"
              alt="Calendar Icon"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 w-6 h-6 pointer-events-none"
            />
          </div>
          <div className="mb-2 relative">
            <label htmlFor="time" className="text-white">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              required
            />
            <img
              src="./assets/Clock.png"
              alt="Clock Icon"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 w-6 h-6 pointer-events-none"
            />
          </div>
          {formData.sections.map((section, index) => (
            <div key={index} className="mb-2">
              <label htmlFor={`section${index}`} className="text-sm text-white">
                Section
              </label>
              <input
                type="text"
                id={`section${index}`}
                name="section"
                placeholder="Enter Section Name"
                className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500"
                onChange={(e) => handleSectionChange(index, e)}
                required
                value={section.section}
              />
              <label htmlFor={`price${index}`} className="text-sm text-white">
                Price
              </label>
              <input
                type="text"
                id={`price${index}`}
                name="price"
                placeholder="Enter Ticket Price"
                className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500"
                onChange={(e) => handleSectionChange(index, e)}
                required
                value={section.price}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="w-full bg-gray-700 text-white text-center p-2 rounded mt-2 hover:bg-gray-900"
          >
            Add Section
          </button>
          <div className="mb-2">
            <label htmlFor="description" className="text-sm text-white">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter Event Description"
              className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500"
              rows="4"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="flex justify-center items-center mt-4">
            <button
              type="submit"
              className="w-40 bg-blue-500 text-white text-center p-1 rounded-full hover:bg-blue-700 border border-white"
            >
              Create Event
            </button>
          </div>
        </form>
        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-green-500 p-6 rounded-lg shadow-lg text-white text-center">
              <p className="text-lg font-semibold mb-4">
                Event created successfully!
              </p>
              <p className="text-sm">Redirecting to events page...</p>
            </div>
          </div>
        )}
        {/* Error modal */}
        {showErrorModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-red-500 p-6 rounded-lg shadow-lg text-white text-center">
              <p className="text-lg font-semibold mb-4">
                Failed to create event. Please try again.
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => setShowErrorModal(false)} // Close the error modal when clicked
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventForm;
