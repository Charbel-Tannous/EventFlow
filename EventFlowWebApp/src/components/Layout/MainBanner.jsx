const MainBanner = () => {
  return (
    <section className="mt-8 bg-black p-4 text-white flex items-center justify-between border-t border-gray">
      {/* Logo and Subscribe */}
      <div className="flex flex-row items-center w-full">
        <img
          src="./assets/logo.png"
          alt="Logo"
          className="h-8 w-24 md:h-15 md:w-48 mb-4 md:mr-4 md:mb-0"
        />
        <form
          action="#"
          method="post"
          className="flex items-center w-full"
        >
          <div className="flex-col p-2 w-full mx-auto">
            <p className="mb-4 mx-2">Subscribe to our emails</p>
            <input
              required
              type="email"
              name="email"
              placeholder="Email Address"
              className="bg-black text-white px-4 py-2 w-40 md:w-72 rounded-full mb-4 border border-white"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 mx-2 md:mx-4 rounded-full hover:bg-blue-600 border border-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Social Media Icons */}
      <div className="flex flex-col items-center mx-auto md:my-auto">
        <p className="hidden md:block mr-2 mb-4">Follow Us</p>
        <div className="flex md:flex-row flex-col items-center">
          <div className="flex items-center">
            <a
              href="www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="./assets/Facebook.png"
                alt="Facebook"
                className="h-10 w-10 md:h-12 md:w-12 mx-2"
              />
            </a>
            <a
              href="www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="./assets/Instagram.png"
                alt="Instagram"
                className="h-10 w-10 md:h-12 md:w-12 mx-2"
              />
            </a>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            <a
              href="www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="./assets/TikTok.png"
                alt="TikTok"
                className="h-10 w-10 md:h-12 md:w-12 mx-2"
              />
            </a>
            <a
              href="www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="./assets/YouTube.png"
                alt="YouTube"
                className="h-10 w-10 md:h-12 md:w-12 mx-2"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
