import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import LoadingSpinner from '../components/LoadingSpinner';
import LoginForm from '../pages/LoginForm';
import RegisterForm from '../pages/RegisterForm';
import NotFound from '../pages/NotFound';
import Article from '../pages/Article';

import {NotificationContainer, NotificationManager} from 'react-notifications';
/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <NavBar />
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles/:id" element={<Article />} />
                <Route path="/articles/add" element={<ProtectedRoute><Article/></ProtectedRoute>} />
                <Route path="/articles/mine" element={<ProtectedRoute><Article /></ProtectedRoute>} />
                <Route path="/articles/:id/edit" element={<ProtectedRoute><Article/></ProtectedRoute>} />
                <Route path="/login" element={<LoginForm></LoginForm>} />
                <Route path="/register" element={<RegisterForm></RegisterForm>} />
                <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to login page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/login" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to login page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/login" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  return (isLogged ) ? children : <Navigate to="/login" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Home />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Home />,
};

export default App;
