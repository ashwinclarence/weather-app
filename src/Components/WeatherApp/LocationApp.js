import React, { useEffect, useState } from 'react';

function LocationApp() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Function to get current location
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch location name using OpenStreetMap Nominatim API
          const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          // Extract location name from the response
          const locationName = data.display_name;

          // Update state with the location name
          setLocation(locationName);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    };

    // Call the function to get current location
    getCurrentLocation();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      {location ? (
        <p>Current Location: {location}</p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}

export default LocationApp;
