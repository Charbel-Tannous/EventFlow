const MainPage = () => {
  return (
    <>
      {/* First Section */}
      <section className="py-12 px-4 flex">
        <div className="max-w-6xl mx-auto">
          {/* Title and Image */}
          <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0">
            <div className="text-center w-72">
              <h2 className="text-3xl font-bold text-white">Discover and Attend Exciting Events</h2>
            </div>
            <div className="text-center items-center">
              {/* Image */}
              <img src="./assets/media.png" alt="Image 1" className="mx-auto mt-8 w-2/3 h-auto rounded-lg shadow-lg" />
              {/* Button under the image */}
              <p className="text-white w-80 mx-auto mt-6">Find events tailored to your interests and make your experiences unforgettable.</p>
              <button className="bg-blue-500 text-white w-full md:w-72 px-4 py-2 rounded-full mt-6 border border-white hover:bg-blue-600">Explore Events</button>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="mx-auto">
          {/* Title */}
          <h2 className="text-3xl font-bold text-white mb-4 mx-8">Upcoming Events</h2>

          {/* Scrollable Images */}
          <div className="flex overflow-x-auto overflow-hidden space-x-4 md:space-x-8">
            <img src="./assets/Rectangle 1.jpg" alt="Image 1" className="md:w-1/3 h-64 rounded-lg shadow-lg" />
            <img src="./assets/Rectangle 2.jpg" alt="Image 2" className="md:w-1/3 h-64 rounded-lg shadow-lg" />
            <img src="./assets/Rectangle 3.jpg" alt="Image 3" className="md:w-1/3 h-64 rounded-lg shadow-lg" />
            <img src="./assets/Rectangle 4.jpg" alt="Image 4" className="md:w-1/3 h-64 rounded-lg shadow-lg" />
            {/* Add more images as needed */}
          </div>
        </div>
      </section>
    </>
  );
};

export default MainPage;
