import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EventsPage from "./pages/EventsPage";
import RootLayout from "./RootLayout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import EventsDetails from "./pages/EventsDetails";
import Main from "./pages/Main";
import EventForm from "./pages/EventsCreate";
import ProfilePage from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/eventdetails/:eventId" element={<EventsDetails />} />
        <Route path="/create" element={<EventForm />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sign up" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
