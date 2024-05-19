import Navbar from "../components/Layout/Navbar";
import MainBanner from "../components/Layout/MainBanner";
import MainFooter from "../components/Layout/MainFooter";

const ContactPage = () => {
  return (
    <div className="font-sans bg-black">
      <Navbar />
      <section className="w-1/2 flex justify-center items-center mx-auto mt-8">
        <form className="w-full">
          {/* Contact Title */}
          <h1 className="text-3xl text-blue-600 text-center font-semibold mb-8">Contact Us</h1>
          <p>We&aposd love to hear from you!</p>

          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-2">
              <label htmlFor="firstName" className="text-sm text-white">First Name</label>
              <input type="text" id="firstName" name="firstName" className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="mb-2">
              <label htmlFor="lastName" className="text-sm text-white">Last Name</label>
              <input type="text" id="lastName" name="lastName" className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500" required />
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="text-sm text-white">Email</label>
            <input type="email" id="email" name="email" className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500" required />
          </div>

          <div className="mb-2">
            <label htmlFor="subject" className="text-sm text-white">Subject</label>
            <input type="text" id="subject" name="subject" className="text-white bg-black w-full p-2 border-b focus:outline-none focus:border-blue-500" required />
          </div>

          <div className="mb-2">
            <label htmlFor="message" className="text-sm text-white">Message</label>
            <textarea id="message" name="message" className="text-white bg-black h-32 w-full p-2 border-b focus:outline-none focus:border-blue-500" required></textarea>
          </div>

          {/* Registration Button */}
          <div className="flex justify-center items-center">
            <button type="submit" className="mt-4 w-40 bg-blue-500 text-white text-center p-1 rounded-full hover:bg-blue-700 border border-white">Send Message</button>
          </div>
        </form>
      </section>
      <MainBanner />
      <MainFooter />
    </div>
  );
};

export default ContactPage;
