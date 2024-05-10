import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/UserDetails.css'; // Import the CSS file

function UserDetails({ user }) {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${user.username}`);
        console.log('User details:', response.data);
        setUserDetails(response.data);
        if (response.data.image) {
          const photoResponse = await axios.get(`http://localhost:5000${response.data.image}`, { responseType: 'blob' });
          setPhoto(URL.createObjectURL(photoResponse.data));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('User details not found');
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      {user.image && (
        <div className="user-image-container">
          <img src={`http://localhost:5000/api/users/image/${user.image}`} alt={user.name} />
        </div>
      )}
      {user.name && <p>Name: {user.name}</p>}
      {user.email && <p>Email: {user.email}</p>}
      {user.age && <p>Age: {user.age}</p>}
      {user.gender && <p>Gender: {user.gender}</p>}
      {user.height && <p>Height: {user.height}</p>}
      {user.weight && <p>Weight: {user.weight}</p>}
      {user.motherTongue && <p>Mother Tongue: {user.motherTongue}</p>}
      {user.maritalStatus && <p>Marital Status: {user.maritalStatus}</p>}
      {user.religion && <p>Religion: {user.religion}</p>}
      {user.caste && <p>Caste: {user.caste}</p>}
      {user.bodyType && <p>Body Type: {user.bodyType}</p>}
      {user.physicalStatus && <p>Physical Status: {user.physicalStatus}</p>}
      {user.eatingHabits && <p>Eating Habits: {user.eatingHabits}</p>}
      {user.drinkingHabits && <p>Drinking Habits: {user.drinkingHabits}</p>}
      {user.smokingHabits && <p>Smoking Habits: {user.smokingHabits}</p>}
      {user.education && <p>Education: {user.education}</p>}
      {user.educationDetail && <p>Education Detail: {user.educationDetail}</p>}
      {user.employedIn && <p>Employed In: {user.employedIn}</p>}
      {user.occupation && <p>Occupation: {user.occupation}</p>}
      {user.occupationDetail && <p>Occupation Detail: {user.occupationDetail}</p>}
      {user.annualIncome && <p>Annual Income: {user.annualIncome}</p>}
    </div>
  );
}

export default UserDetails;
