import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainNavigation from "../components/Layout/MainNavigation";
import MainBanner from "../components/Layout/MainBanner";
import MainFooter from "../components/Layout/MainFooter";
import LocationIcon from "../../assets/placemarker.png";
import DateIcon from "../../assets/Calendar.png";
import TimeIcon from "../../assets/Clock.png";
import EVENTICON from "../../assets/eventimage.png";

const EventsDetails = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `http://localhost:5000/api/event/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEventDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleBuyTicket = () => {
    setShowModal(true); // Show the modal when Buy Ticket button is clicked
  };

  const handleAddReview = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/api/event/review/${eventId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Text: newReview }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  if (error) {
    return (
      <div className="font-sans bg-black text-white">
        <MainNavigation />
        <section className="py-12 px-4 flex flex-col items-center">
          <h1>Error: {error}</h1>
        </section>
        <MainBanner />
        <MainFooter />
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div className="font-sans bg-black text-white">
        <MainNavigation />
        <section className="py-12 px-4 flex flex-col items-center">
          <h1>Loading...</h1>
        </section>
        <MainBanner />
        <MainFooter />
      </div>
    );
  }

  return (
    <div className="font-sans bg-black text-white">
      <MainNavigation />
      <section className="py-12 px-4 flex flex-col items-center">
        <div className="max-w-3xl w-full p-6 rounded-lg shadow-lg">
          <img
            src={EVENTICON}
            alt="Event Image"
            className="w-1/2 h-auto rounded-lg mb-6 mx-auto"
          />
          <h1 className="text-4xl font-semibold text-blue-500 mb-4">
            {eventDetails.name}
          </h1>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex items-center">
              <img
                src={LocationIcon}
                alt="Location Icon"
                className="w-6 h-6 mr-2"
              />
              <div>
                <p className="text-lg font-medium">Location:</p>
                <p className="text-lg">{eventDetails.location}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src={DateIcon} alt="Date Icon" className="w-6 h-6 mr-2" />
              <div>
                <p className="text-lg font-medium">Date:</p>
                <p className="text-lg">
                  {new Date(eventDetails.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <img src={TimeIcon} alt="Time Icon" className="w-6 h-6 mr-2" />
              <div>
                <p className="text-lg font-medium">Time:</p>
                <p className="text-lg">{eventDetails.time}</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-lg font-medium">Description:</p>
            <p className="text-lg">{eventDetails.description}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">
              Tickets:
            </h2>
            {eventDetails.tickets.map((ticket) => (
              <div
                key={ticket.ticketId}
                className="bg-gray-700 p-4 rounded-lg shadow-md mt-4"
              >
                <p className="text-lg font-medium">{ticket.section}</p>
                <p className="text-lg">Price: ${ticket.price}</p>
                <div className="flex items-center justify-center mt-4">
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleBuyTicket} // Attach click handler to Buy Ticket button
                  >
                    Buy Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">
              Reviews:
            </h2>
            {eventDetails.reviews && eventDetails.reviews.length > 0 ? (
              <ul className="divide-y divide-gray-600">
                {eventDetails.reviews.map((review, index) => (
                  <li key={index} className="py-2">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-lg">{review.text}</p>
                        <p className="text-sm text-gray-500">
                          By: {review.userId}
                        </p>
                        <p className="text-sm text-gray-500">
                          Date: {new Date(review.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews available</p>
            )}
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">
              Add Review:
            </h2>
            <textarea
              className="w-full bg-transparent p-2 border border-gray-500 rounded-md text-white" // Change background color to transparent and text color to white
              rows="4"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)} // Update the new review state
              placeholder="Write your review here..."
            ></textarea>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                onClick={handleAddReview} // Attach click handler to Add Review button
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </section>
      <MainBanner />
      <MainFooter />
      {/* Modal for Buy Ticket */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">
              Go to the nearest store to buy your ticket.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => setShowModal(false)} // Close the modal when clicked
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsDetails;
