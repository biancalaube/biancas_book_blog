import React from 'react';
import Header from './Header';
import Footer from './Footer';

// this forms the the bar bones of the main page
const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
