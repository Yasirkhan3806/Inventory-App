import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { usePersonContext } from '../ContextApi/CPCContext';

export default function EditItems() {
  const { persons } = usePersonContext();
  const { name } = useParams();
  const location = useLocation();
  const { id } = location.state || {}; // safely get 'id' from location state

  const [admin, setAdmin] = useState([]);
  const [client, setClient] = useState([]);
  const [companyPerson, setCompanyPerson] = useState([]);
  const [actionType, setActionType] = useState("entry");
  const [isClient, setIsClient] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const adminData = persons.filter((item) => item.status === "admin");
    const clientData = persons.filter((item) => item.status === "client");
    const companyPersonData = persons.filter((item) => item.status === "company person");

    setAdmin(adminData);
    setClient(clientData);
    setCompanyPerson(companyPersonData);
  }, [persons]);

  return (
    <div className="min-h-screen bg-white text-blue-900 p-6">
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-center mb-8 text-blue-800">
        Edit <span className="text-blue-600">{name}</span>
      </h1>

      {/* Form Container */}
      <form
        action=""
        method="post"
        className="max-w-xl mx-auto bg-blue-50 p-6 rounded shadow-lg space-y-6"
      >
        {/* Radio buttons to toggle action type */}
        <div className="flex justify-center gap-8">
          <label className="flex items-center space-x-2 text-blue-700 font-medium">
            <input
              type="radio"
              name="actionType"
              value="entry"
              checked={actionType === "entry"}
              onChange={(e) => setActionType(e.target.value)}
              className="text-blue-600"
            />
            <span>Entry</span>
          </label>
          <label className="flex items-center space-x-2 text-blue-700 font-medium">
            <input
              type="radio"
              name="actionType"
              value="issue"
              checked={actionType === "issue"}
              onChange={(e) => setActionType(e.target.value)}
              className="text-blue-600"
            />
            <span>Issue</span>
          </label>
        </div>

        {/* Conditional Form Fields */}
        {actionType === "issue" ? (
          <div className="space-y-4">
            {/* Admin Selection */}
            <div>
              <label className="block mb-1 font-medium text-blue-700">
                Admin
              </label>
              <select
                name="admin"
                className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {admin.map((item) => (
                  <option value={item.name} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
{isClient?( {/* Company person selection Selection */}
            <div>
              <label className="block mb-1 font-medium text-blue-700">
                Company Person
              </label>
              <select
                name="companyPerson"
                className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {companyPerson.map((item) => (
                  <option value={item.name} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>):(    {/* Client Selection */}
            <div>
              <label className="block mb-1 font-medium text-blue-700">
                Client
              </label>
              <select
                name="client"
                className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {client.map((item) => (
                  <option value={item.name} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>)}
           
        

            {/* Amount Input */}
            <div>
              <label className="block mb-1 font-medium text-blue-700">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Admin Selection for entry */}
            <div>
              <label className="block mb-1 font-medium text-blue-700">
                Admin
              </label>
              <select
                name="admin"
                className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {admin.map((item) => (
                  <option value={item.name} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block mb-1 font-medium text-blue-700">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
