import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { usePersonContext } from "../ContextApi/CPCContext";
import { UpdateData } from "../Dashboard/UpdateData";

// EditItems component for editing inventory items
export default function EditItems() {
  // Get persons data from context
  const { persons } = usePersonContext();
  // Get item name from route params
  const { name } = useParams();
  // Get location state (id and currentAmount)
  const location = useLocation();
  const { id, currentAmount } = location.state || {};

  // State for admin, client, company person lists and selected IDs
  const [admin, setAdmin] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [itemId, setItemId] = useState(id);
  const [client, setClient] = useState([]);
  const [clientId, setClientId] = useState("");
  const [companyPerson, setCompanyPerson] = useState([]);
  const [actionType, setActionType] = useState("entry"); // 'entry' or 'issue'
  const [isClient, setIsClient] = useState(false); // Checkbox for client/company person
  const [amount, setAmount] = useState(0); // Amount to add or issue

  // Loader and message states for UI feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  // Populate admin, client, and company person lists on persons change
  useEffect(() => {
    const adminData = persons.filter((item) => item.status === "admin");
    const clientData = persons.filter((item) => item.status === "client");
    const companyPersonData = persons.filter(
      (item) => item.status === "company person"
    );

    setAdmin(adminData);
    setClient(clientData);
    setCompanyPerson(companyPersonData);
    setAdminId(adminData[0]?._id || "");
    setClientId(clientData[0]?._id || "");
  }, [persons]);

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");
    // Validation: For 'issue', check if amount exceeds available quantity
    if (actionType === "issue") {
      const enteredAmount = amount;
      if (enteredAmount > currentAmount) {
        setLoading(false);
        setMessage("Error! Amount exceeds available quantity.");
        setMessageType("error");
        return;
      }
    }
    // Prepare form data for submission
    const formData = {
      adminId,
      itemId,
      clientId,
      amount,
      actionType,
    };
    // Update item quantity
    updateQuantity(amount);
    // Send history record to backend
    fetch("http://localhost:5000/History/addHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setMessage("Success! Data submitted.");
        setMessageType("success");
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Error! Could not submit data.");
        setMessageType("error");
      });
  };

  // Function to update quantity (increment/decrement) with optimistic UI update
  const updateQuantity = async (changeAmount) => {
    try {
      // Convert to absolute value for validation
      const absoluteAmount = Math.abs(changeAmount);

      // For 'issue', check if entered amount is available
      if (actionType === "issue" && absoluteAmount > currentAmount) {
        alert("The entered amount exceeds available quantity");
        throw new Error("Amount exceeds available quantity");
      }

      // Determine update value based on action type
      const updateValue = actionType === "entry"
        ? absoluteAmount
        : -absoluteAmount;

      // Call UpdateData to update item quantity
      await UpdateData(
        updateValue,
        itemId,
        (error) => {
          throw error; // Propagate error to catch block
        },
        () => console.log("Update successful!")
      );

    } catch (error) {
      alert(`Operation failed: ${error.message}`);
      throw error; // Re-throw to prevent further execution
    }
  };

  return (
    <div className="min-h-screen bg-white text-blue-900 p-6">
      {/* Page title */}
      <h1 className="text-3xl font-semibold text-center mb-8 text-blue-800">
        Edit <span className="text-blue-600">{name}</span>
      </h1>

      {/* Loader spinner */}
      {loading && (
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Success/Error Message */}
      {message && (
        <div
          className={`text-center mb-4 p-2 rounded ${
            messageType === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message}
        </div>
      )}

      {/* Main form */}
      <form
        action=""
        method="post"
        className="max-w-xl mx-auto bg-blue-50 p-6 rounded shadow-lg space-y-6"
      >
        {/* Action type radio buttons */}
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

        {/* Conditional fields based on actionType */}
        {actionType === "issue" ? (
          <div className="space-y-4">
            {/* Admin selection */}
            <div>
              <label className="block mb-1 font-medium text-blue-700">
                Admin
              </label>
              <select
                name="admin"
                className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setAdminId(e.target.value)}
              >
                {admin.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Client/company person toggle */}
            <div className="flex items-center space-x-4">
              <label className="text-blue-700 font-medium">
                Is this a client?
              </label>
              <input
                type="checkbox"
                checked={isClient}
                onChange={(e) => setIsClient(e.target.checked)}
                className="text-blue-600"
              />
            </div>
            {/* Client or company person selection */}
            {isClient ? (
              <div>
                <label className="block mb-1 font-medium text-blue-700">
                  Client
                </label>
                <select
                  name="client"
                  className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => setClientId(e.target.value)}
                >
                  {client.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block mb-1 font-medium text-blue-700">
                  Company Person
                </label>
                <select
                  name="companyPerson"
                  className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => setClientId(e.target.value)}
                >
                  {companyPerson.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {/* Amount input */}
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
            {/* Admin selection for entry */}
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
            {/* Amount input for entry */}
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
        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={onSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
