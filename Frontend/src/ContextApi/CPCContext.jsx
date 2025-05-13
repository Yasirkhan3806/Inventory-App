import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
const PersonContext = createContext();

// Provider Component
export const PersonProvider = ({ children }) => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all persons
  const fetchPersons = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Person/getPerson');
      setPersons(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };



  // Load data on mount
  useEffect(() => {
    fetchPersons();
  }, []);
  console.log('persons from api', persons);

  return (
    <PersonContext.Provider value={{ persons, loading, error, fetchPersons }}>
      {children}
    </PersonContext.Provider>
  );
};

export const usePersonContext = () => {
  const context = useContext(PersonContext);
  if (!context) {
    throw new Error('usePersonContext must be used within a PersonProvider');
  }
  return context;
};