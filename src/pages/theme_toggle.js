// Theme Toggle Functionality
// Add this script to your HTML file before closing </body> tag

(function() {
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Update button icon based on current theme
  function updateThemeIcon() {
    const themeIcon = document.getElementById('theme-icon');
    const theme = document.documentElement.getAttribute('data-theme');
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  }
  
  // Toggle theme function
  window.toggleTheme = function() {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
  };
  
  // Initialize icon when DOM is loaded
  document.addEventListener('DOMContentLoaded', updateThemeIcon);
})();
