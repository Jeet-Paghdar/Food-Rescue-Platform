import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Food Rescue Platform. All Rights Reserved.</p>
      <p>Reducing Waste, Building Community in Pune.</p>
    </footer>
  );
}

export default Footer;