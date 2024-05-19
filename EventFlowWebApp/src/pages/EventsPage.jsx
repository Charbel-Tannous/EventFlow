import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainNavigation from "../components/Layout/MainNavigation";
import MainBanner from "../components/Layout/MainBanner";
import MainFooter from "../components/Layout/MainFooter";
import { EVENT_GET_URL } from "../constants/api";

const EventsPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:5000/api/event", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEventsData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
  }, []);

  const getMinimumPrice = (tickets) => {
    if (!tickets || tickets.length === 0) return 0;
    const prices = tickets.map((ticket) => ticket.price);
    return Math.min(...prices);
  };

  return (
    <div className="font-sans bg-black">
      <MainNavigation />

      {/* Event Grid Section */}
      <section className="flex justify-center mt-8 bg-black p-2 md:p-8 text-white">
        {/* Event Grid */}
        <div className="grid grid-cols-1 gap-8 w-4/5">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading &&
            !error &&
            eventsData.map((event) => (
              <div
                key={event.eventId}
                className="bg-black border border-blue-600 p-4 rounded-md flex"
              >
                <div className="rounded-full items-center flex justify-center w-56">
                  <img
                    src="./assets/eventimage.png"
                    alt="Event Image"
                    className="w-16 h-16 md:w-52 md:h-52 rounded-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h2 className="text-xl font-semibold">{event.name}</h2>
                  <p className="text-gray-300 font-bold mb-2">Location</p>
                  <p className="text-gray-300">{event.location}</p>
                  <p className="text-gray-300 font-bold">Date and Time</p>
                  <div className="flex justify-between">
                    <p className="text-gray-300">
                      {new Date(event.date).toLocaleDateString()} {event.time}
                    </p>
                    {/* Pass event ID as URL parameter */}
                    <Link to={`/eventdetails/${event.eventId}`}>
                      <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 border border-white">
                        Buy Ticket
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="flex-grow space-x-2 p-2 w-60">
                  <div className="flex flex-col items-center justify-center text-gray-300">
                    <p className="text-3xl">Price from</p>
                    <p className="text-4xl font-bold">
                      {getMinimumPrice(event.tickets)}$
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-16">
                    <button className="bg-black text-white px-16 py-2 rounded-full mb-1 hover:bg-white hover:text-black border border-white">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      <MainBanner />
      <MainFooter />
    </div>
  );
};

export default EventsPage;
