import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface UserFormProps {}

const UserForm: React.FC<UserFormProps> = () => {
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });
  const [userId, setUserId] = useState<string>('');
  const [isChanged, setIsChanged] = useState<boolean>(false);

  // Check localStorage on initial render
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const storedUserId = localStorage.getItem('userId');
    if (storedUserData && storedUserId) {
      setUserData(JSON.parse(storedUserData));
      setUserId(storedUserId);
    }

    // Unsaved changes warning when user tries to leave the page
    const unsavedChangesHandler = (event: BeforeUnloadEvent) => {
      if (isChanged) {
        event.returnValue = 'You have unsaved changes!'; // Custom warning message
      }
    };

    window.addEventListener('beforeunload', unsavedChangesHandler);

    return () => {
      window.removeEventListener('beforeunload', unsavedChangesHandler);
    };
  }, [isChanged]);

  // Handle changes in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setIsChanged(true); // Set flag to true when user makes changes
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure user ID is only generated after the form is submitted and data is valid
    if (!userData.name || !userData.address || !userData.email || !userData.phone) {
      alert("Please fill in all the fields before submitting!");
      return;
    }

    const generatedUserId = Math.random().toString(36).substring(2, 15);
    setUserId(generatedUserId);
    
    // Save user data and user ID to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userId', generatedUserId);

    setIsChanged(false); // Reset the change flag after saving
  };

  return (
    <Box sx={{ padding: 2 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={userData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      {userId && <div>User ID: {userId}</div>}
    </Box>
  );
};

export default UserForm;
