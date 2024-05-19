import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MainFooter from "../components/Layout/MainFooter";
import MainBanner from "../components/Layout/MainBanner";
import MainNavigation from "../components/Layout/MainNavigation";
import eventimage from "../../assets/eventimage1.png";

// SVG for the close icon
const CloseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white cursor-pointer" // Added cursor-pointer class
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ProfilePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:5000/api/event/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/api/event/delete/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Event deleted successfully");
        setEvents(events.filter((event) => event.eventId !== eventId));
        setShowModal(false); // Close the modal after deleting the event
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <>
      <MainNavigation />
      <div className="font-sans bg-black w-full">
        <div className="p-6">
          <h2 className="text-2xl text-blue-600 font-bold mb-4">
            Your Created Events
          </h2>
          <div className="flex overflow-x-auto space-x-4">
            {events.map((event, index) => (
              <div key={index} className="relative w-72">
                <div
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowModal(true);
                  }}
                >
                  <img
                    src={eventimage}
                    alt={`Event Photo ${index + 1}`}
                    className="w-full h-88 object-cover rounded-lg"
                  />
                  <div className="absolute top-0 right-0 p-2">{CloseIcon}</div>
                </div>
                <p className="text-white">{event.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MainBanner />
      <MainFooter />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Delete Event?</h2>
            <p className="text-sm mb-6">
              Are you sure you want to delete this event?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(selectedEvent.eventId)}
              >
                Delete
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
