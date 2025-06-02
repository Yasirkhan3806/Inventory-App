import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import HomeButton from '../HomeButton';

export default function AddCPC() {
    const [name, setName] = useState('');
    const [type, setType] = useState('client'); // Default to 'client'
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous error
        setSuccess(null); // Clear previous success
        try {
            const response = await axios.post('http://localhost:5000/Person/setPerson', {
                name:name.trim(),
                status: type,
            });
            setSuccess(response.data.message);
            setName('');
            setType('client');
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred while adding the person.');
        }
    };

    return (
        <>
       
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <span className='flex gap-5'>
                <h2 className="text-2xl font-bold mb-6 text-center">Add Person / Client / Category</h2>
                 <HomeButton/>
                 </span>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                        {success}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Type:
                        </label>
                        <div className="space-y-2">
                               <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="admin"
                                    checked={type === 'admin'}
                                    onChange={(e) => setType(e.target.value)}
                                    className="mr-2"
                                />
                                Admin
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="client"
                                    checked={type === 'client'}
                                    onChange={(e) => setType(e.target.value)}
                                    className="mr-2"
                                />
                                Client
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="company person"
                                    checked={type === 'company person'}
                                    onChange={(e) => setType(e.target.value)}
                                    className="mr-2"
                                />
                                Company Person
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="category"
                                    checked={type === 'category'}
                                    onChange={(e) => setType(e.target.value)}
                                    className="mr-2"
                                />
                                Category
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}