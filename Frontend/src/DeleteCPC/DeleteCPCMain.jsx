import React, { useState, useEffect } from 'react';
import { usePersonContext } from '../ContextApi/CPCContext';

export default function DeleteCPCMain() {
  const { persons } = usePersonContext();
  const [selectedType, setSelectedType] = useState('client');
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    const filtered = persons.filter(person => person.status === selectedType && person.active === true);
    setFilteredPersons(filtered);
  }, [selectedType, persons]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/Person/deletePerson/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setFilteredPersons(prev => prev.filter(p => p._id !== id));
        alert('Deleted successfully!');
      } else {
        alert('Failed to delete.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting the item.');
    }
  };

  // Search functionality to filter items based on name or category
  const search = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const items = document.querySelectorAll("#cpc-container > div");
    items.forEach((item) => {
      const title = item.getAttribute("data-title").toLowerCase();
      if (title.includes(searchTerm) ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Delete Entities</h2>

      {/* Dropdown */}
      <div className="mb-6">
        <label className="block mb-2 text-lg font-medium">Select Type</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded shadow-sm"
        >
          <option value="client">Client</option>
          <option value="company person">Company Person</option>
          <option value="category">Category</option>
        </select>

       
      </div>

           {/* Search box */}
          <input
            type="text"
            name="search-items"
            id="searchBox"
            className="border-2 border-gray-800 rounded-lg p-1 w-1/4 mb-6"
            onChange={(e) => search(e)}
            placeholder="Search Items"
          />

      {/* Render Filtered Persons */}
      <div id='cpc-container' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersons.map((person) => (
          <div data-title={person.name} key={person._id} className="bg-white shadow-md rounded p-4">
            <h3 className="text-xl font-semibold">{person.name}</h3>
            <p className="text-gray-600 mb-2">Type: {person.status}</p>
            <button
              onClick={() => handleDelete(person._id)}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

