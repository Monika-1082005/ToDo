import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Todo from './components/Todo';
import Signup from './components/Signup';
import Login from './components/Login';
import { auth } from './firebase';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/signup' || location.pathname === '/login';

  const heroRef = useRef(null);
  const todoRef = useRef(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white grid min-h-screen">
      <Navbar scrollToSection={scrollToSection} heroRef={heroRef} todoRef={todoRef} />

      {!isAuthRoute && (
        <>
          <section ref={heroRef}>
            <Hero />
          </section>

          <div className="flex justify-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 flex-grow" ref={todoRef}>
            <Routes>
              <Route
                path="/"
                element={isAuthenticated ? <Todo /> : <Navigate to="/login" replace />}
              />
            </Routes>
          </div>
        </>
      )}

      {isAuthRoute && (
        <div className="flex justify-center items-center min-h-screen">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      )}

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
