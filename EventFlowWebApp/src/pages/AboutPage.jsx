// Importing necessary components
import MainNavigation from "../components/Layout/MainNavigation";
import MainBanner from "../components/Layout/MainBanner";
import MainFooter from "../components/Layout/MainFooter";

// RootLayout component definition
const AboutPage = () => {
  return (
    <div className="font-sans bg-black">
      <MainNavigation />

      {/* About Us Section */}
      <section className="mt-8 bg-black md:p-4 text-white">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-blue-600 text-3xl font-bold mb-4">About Us</h2>
          <p className="md:text-lg text-center w-2/3 mb-6">Learn more about the team behind EventFlow</p>

          {/* CEO and Staff Pictures */}
          <div className="flex flex-row justify-center">
            <div className="flex flex-col justify-center">
              {/* CEO Image with Text */}
              <div className="flex items-center mx-4 mb-4">
                <img src="./assets/Person 1.png" alt="CEO" className="w-20 h-20 md:h-40 md:w-40 mb-4 object-cover rounded-full" />
                <p className="text-center">John Doe<br />Co-founder & CEO</p>
              </div>

              {/* Alice - Lead Designer */}
              <div className="flex items-center mx-4">
                <img src="./assets/Person 2.png" alt="Staff 1" className="w-20 h-20 md:h-40 md:w-40 object-cover rounded-full" />
                <p className="text-center">Alice Johnson<br />Lead Designer</p>
              </div>
            </div>

            {/* Bob - Co-founder & CTO */}
            <div className="flex items-center mx-8">
              <img src="./assets/Person 3.png" alt="Staff 2" className="w-20 h-20 md:h-40 md:w-40 object-cover rounded-full" />
              <p className="text-center">Jane Smith<br />Co-founder & CTO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-black md:p-4 text-white">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-blue-600 text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg w-2/3">EventFlow was founded in 2023 with a simple mission: to provide a platform that connects people with exciting events and experiences. It all started with a passion for bringing communities together and creating memorable moments. Over the years, our dedicated team has worked tirelessly to make EventFlow a go-to destination for event enthusiasts.</p>
          <p className="text-lg w-2/3">From our humble beginnings, we&aposve grown into a dynamic team of creative individuals who are committed to delivering top-notch event management solutions. Our journey is marked by a series of milestones, challenges, and triumphs, and we&aposre excited to continue writing the story of EventFlow with you.</p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-black md:p-4 text-white">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-blue-600 text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg w-2/3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam inquam at ante commodo hendrerit. Sed auctor ligula in turpis tincidunt, a vulputate ipsum ultricies. Fusce id ex non tortor bibendum accumsan. Proin non dui vel risus congue scelerisque.</p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-black md:p-4 text-white">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-blue-600 text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-lg w-2/3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam inquam at ante commodo hendrerit. Sed auctor ligula in turpis tincidunt, a vulputate ipsum ultricies. Fusce id ex non tortor bibendum accumsan. Proin non dui vel risus congue scelerisque.</p>
        </div>
      </section>

      <MainBanner />
      <MainFooter />
    </div>
  );
};

// Exporting the RootLayout component
export default AboutPage;
