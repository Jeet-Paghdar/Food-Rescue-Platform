// This file mimics a real API call.
const dummyFoodData = [
  { id: 1, name: 'Surplus Vegetable Curry & Rice', quantity: '10 meals', expiry: '2025-10-13', location: 'Downtown Cafe, Charathe', status: 'available' },
  { id: 2, name: 'Assorted Bakery Items', quantity: '2 boxes', expiry: '2025-10-12', location: 'The Corner Bakery, Charathe', status: 'available' },
  { id: 3, name: 'Fresh Farm Apples', quantity: '5 kg', expiry: '2025-10-15', location: 'Green Farms Outlet, Charathe', status: 'claimed' },
];

export const fetchAvailableFood = () => {
  // Simulate a network delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dummyFoodData.filter(item => item.status === 'available'));
    }, 500); // 0.5 second delay
  });
};

export const postFoodDonation = (foodData) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newFood = { id: Date.now(), ...foodData, status: 'available' };
      dummyFoodData.push(newFood);
      console.log('New Food Posted:', newFood);
      resolve({ success: true, message: 'Donation posted successfully!' });
    }, 500);
  });
};