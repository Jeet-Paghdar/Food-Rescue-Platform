# FoodRescue 🍽️

FoodRescue is a modern, responsive web application built with React, designed to bridge the gap between food waste and hunger. It provides a real-time platform for restaurants and individuals to donate surplus food, which can then be claimed by NGOs and those in need.

This project was built to solve a critical disconnect: in our cities, perfectly good food is discarded as waste, while hunger remains a daily struggle for our neighbors. This platform acts as the digital bridge to solve this problem.

---

## ✨ Key Features

* **Dynamic Homepage:** A landing page that features live, recently-added donations, animated impact statistics, and a clear call to action.
* **Easy Donation Form:** A clean, multi-step form for donors to list surplus food with all necessary details (quantity, expiration, address).
* **Live Marketplace ("Available Food"):**
    * **Dual View:** Toggle between a responsive card grid and an interactive **React Leaflet** map view.
    * **Powerful Sorting:** Sort available food by "Nearest" (calculated with **Geolib**) or "Expires Soon."
    * **Live Filtering:** Instantly filter food by type (Prepared Meals, Bakery, Produce).
* **Seamless Claiming:** Users can claim food through a modal, which updates the central state and removes the item from the available list.
* **Personalized Dashboard:** A "My Contributions" page that shows a unique history based on the user's role (Donor vs. Recipient).
* **Global State Management:** The **React Context API** acts as a central store, ensuring that a new donation or claim is instantly reflected on all pages.

---

## 🛠️ Tech Stack

This project is built 100% on the frontend using modern web technologies.

* **Core:** React (Functional Components, Hooks)
* **State Management:** React Context API (for `FoodContext` and a simulated `AuthContext`)
* **Routing:** React Router v6
* **Styling:** CSS3 (Flexbox, Grid, CSS Variables, Animations)
* **Mapping & Geolocation:** React Leaflet & Geolib
* **Libraries:**
    * `react-hot-toast` (for sleek, non-intrusive notifications)
    * `react-icons` (for the complete icon set)
    * `react-countup` (for animated impact stats)
