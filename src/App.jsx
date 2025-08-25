import { Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyUs from './components/WhyUs';
import FormSection from './components/FormSection';
import { useEffect, useState } from 'react';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer'
import FAQSection from './components/FAQ';
import ScrollToTopButton from './components/ScrollToTopButton';
import ServiceSection from './components/ServicesSection';
import TeamSection from './components/Teams';
import CustomerReviews from './components/CustomerReviews';
import AuthModal from './components/AuthModal';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [openAuth, setOpenAuth] = useState(false);
  const [user, setUser] = useState(() => localStorage.getItem("user"));

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(section => observer.observe(section));
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  return (
    <>
      <ResponsiveAppBar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLoginClick={() => setOpenAuth(true)} 
        user={user}
        onLogout={handleLogout}
      />
      <Routes>
        <Route />
      </Routes>
      <section id="home"><HeroSection /></section>
      <section id="why-us"><WhyUs /></section>
      <section id="form"><FormSection /></section>
      <section id="about-us"><AboutUs /></section>
      <section id="services"><ServiceSection /></section>
      <section id="faq"><FAQSection /></section>
      <section id="teams"><TeamSection /></section>
      <section id="review"><CustomerReviews /></section>
      <section id="footer"><Footer /></section>
      <section id="scroll"><ScrollToTopButton /></section>

      <AuthModal 
        open={openAuth} 
        handleClose={() => setOpenAuth(false)}
        setUser={setUser}
      />
    </>
  );
}

export default App;
