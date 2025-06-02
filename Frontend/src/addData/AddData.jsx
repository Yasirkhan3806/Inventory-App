import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePersonContext } from '../ContextApi/CPCContext';
import HomeButton from '../HomeButton';

function AddData() {
    const {persons} = usePersonContext();
    const [name, setName] = useState('');
    const [productImageLink, setProductImageLink] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [minimumAmount, setMinimumAmount] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    // console.log('persons', persons);

    const handleSubmit = async (e) => {
  e.preventDefault();
  const lowercaseCategory = category.toLowerCase();
  const data = { name, productImageLink, quantity, minimumAmount, category: lowercaseCategory };

  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    const response = await axios.post('http://localhost:5000/Items/setItems', data);
    
    // Display server success message
    setSuccess(response.data.message || 'Item added successfully!');
    
    // Clear form fields
    setName('');
    setProductImageLink('');
    setQuantity('');
    setMinimumAmount('');
    setCategory('');
    
  } catch (error) {
    // Handle server error messages
    const serverMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         error.message;
    
    setError(serverMessage || 'Failed to submit data');
    console.error('Submission error:', error);
    
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
    const filteredCategories = persons.filter((person) => person.status === 'category');
    // console.log('categories', filteredCategories);
    setCategories(filteredCategories);
},[persons]);


    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md flex flex-col">
            <span className='self-end'>
                <HomeButton/>
            </span>
            {loading && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="text-white text-lg">Loading...</div>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                {success && <div className="mb-4 text-green-500">{success}</div>}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Product Image Link(optional):</label>
                    <input
                        type="text"
                        value={productImageLink}
                        onChange={(e) => setProductImageLink(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity((e.target.value))}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Minimum Amount:</label>
                    <input
                        type="number"
                        value={minimumAmount}
                        onChange={(e) => setMinimumAmount(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a category</option>
                        {categories.map((person) => (
                            <option key={person.id} className='text-black' value={person.category}>
                                {person.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddData;
