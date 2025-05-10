import React from "react";
import { Link } from "react-router-dom";
import { UpdateMinAmount, UpdateData, DeleteItem } from "./UpdateData";
import deleteIcon from '../assets/deleteIcon.png'

export default function Dashboard() {
  const [data, setData] = React.useState(null);
  const [notification, setNotification] = React.useState([]);

  function fetchData() {
    fetch("http://localhost:5000/getItems")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }

  React.useEffect(() => {
    fetchData();
  }, []);


  React.useEffect(() => {
    if (data) {
      const lowStockItems = data.filter(
        (item) => item.quantity <= item.minimumAmount
      );

      if (lowStockItems.length > 0) {
        
        setNotification(
          lowStockItems.map(item => `${item.name} is low on stock!`)
  
        );
      } else {
        setNotification([]);
      }
    }
  },[data]);

  console.log("Data fetched:", data);

  const updateQuantity = async (itemId, changeAmount) => {
    try {
      // Optimistic update: immediately modify the UI
      setData((prevData) =>
        prevData.map((item) =>
          item._id === itemId
            ? { ...item, quantity: item.quantity + changeAmount }
            : item
        )
      );

      // Then make the API call
      await UpdateData(
        changeAmount,
        itemId,
        (error) => {
          // If error occurs, revert the UI
          setData((prevData) =>
            prevData.map((item) =>
              item._id === itemId
                ? { ...item, quantity: item.quantity - changeAmount }
                : item
            )
          );
          alert(`Update failed: ${error}`);
        },
        () => console.log("Update successful!")
      );
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const updateMinQuantity = async (itemId, changeAmount) => {
    try {
      // Optimistic update: immediately modify the UI
      setData((prevData) =>
        prevData.map((item) =>
          item._id === itemId
            ? { ...item, minimumAmount: item.minimumAmount + changeAmount }
            : item
        )
      );

      // Then make the API call
      await UpdateMinAmount(
        changeAmount,
        itemId,
        (error) => {
          // If error occurs, revert the UI
          setData((prevData) =>
            prevData.map((item) =>
              item._id === itemId
                ? { ...item, minimumAmount: item.minimumAmount - changeAmount }
                : item
            )
          );
          alert(`Update failed: ${error}`);
        },
        () => console.log("Update successful!")
      );
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Inventory Dashboard
          </h1>
          <div className="flex gap-4">
            <Link
              to="/add-data"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Add New Item
            </Link>
            <button
              onClick={fetchData}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {
          /* Notification Section */
          notification && (
            <div className="">
              {notification.map((msg, index) => (
                <div key={index} className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-6">
                  {msg}
                </div>
              ))}
            </div>
          )}  
      

        {/* Items Grid */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h2>

                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {item.category}
                    </span>

                    <button
                      onClick={() => {
                        DeleteItem(item._id);
                        fetchData();
                      }}
                    >
                      <img className="h-6 cursor-pointer" src={deleteIcon} alt="" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Current Quantity</span>
                      <div className="flex gap-2 items-center">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item._id, -1);
                          }}
                        >
                          -
                        </button>
                        <span
                          className={`text-lg font-medium ${
                            item.quantity <= item.minimumAmount
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item._id, 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Minimum Required</span>
                      <div className="flex gap-2 items-center">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateMinQuantity(item._id, -1);
                          }}
                        >
                          -
                        </button>
                        <span className="text-lg font-medium text-gray-700">
                          {item.minimumAmount}
                        </span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateMinQuantity(item._id, 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {item.productImageLink && (
                    <div className="mt-4">
                      <img
                        src={item.productImageLink}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
