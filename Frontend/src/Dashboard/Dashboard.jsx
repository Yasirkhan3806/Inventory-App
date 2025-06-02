import React, { use } from "react";
import { Link } from "react-router-dom";
import { UpdateMinAmount, UpdateData, DeleteItem } from "./UpdateData";
import deleteIcon from "../assets/deleteIcon.png";
import editIcon from "../assets/editIcon.png";

// Dashboard Component
export default function Dashboard({setLowStockItems}) {
  // State to store fetched inventory data
  const [data, setData] = React.useState([]);

  // State to store low stock notifications
  const [notification, setNotification] = React.useState([]);

  // State to store unique categories
  const [categories, setCategories] = React.useState([]);

  // Function to fetch all items from backend
  function fetchData() {
    fetch("http://localhost:5000/Items/getItems")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Initial fetch when component mounts
  React.useEffect(() => {
    fetchData();
  }, []);

  // // Check for items with quantity less than or equal to minimum amount
  // React.useEffect(() => {
  //   if (data) {
  //     const lowStockItems = data.filter(
  //       (item) => item.quantity <= item.minimumAmount
  //     );

  //     if (lowStockItems.length > 0) {
  //       setLowStockItems(lowStockItems);
  //       // Generate notifications for low stock items
  //       setNotification(
  //         lowStockItems.map((item) => `${item.name} is low on stock!`)
  //       );
  //     } else {
  //       setNotification([]);
  //     }
  //   }
  // }, [data]);

  // Function to update minimum required quantity with optimistic UI update
  const updateMinQuantity = async (itemId, changeAmount) => {
    try {
      // Optimistically update UI
      setData((prevData) =>
        prevData.map((item) =>
          item._id === itemId
            ? { ...item, minimumAmount: item.minimumAmount + changeAmount }
            : item
        )
      );

      // Send update to backend
      await UpdateMinAmount(
        changeAmount,
        itemId,
        (error) => {
          // Revert UI on error
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

  // Search functionality to filter items based on name or category
  const search = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const items = document.querySelectorAll("#items-container > div");
    items.forEach((item) => {
      const title = item.getAttribute("data-title").toLowerCase();
      const category = item.getAttribute("data-category").toLowerCase();
      if (title.includes(searchTerm) || category.includes(searchTerm)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  };

  // Effect to extract unique categories and handle category filtering
  React.useEffect(() => {
    const category = [...new Set(data.map((item) => item.category))];
    setCategories(category);

    const categorySelect = document.getElementById("categorySelect");

    // Event listener for category dropdown selection
    categorySelect.addEventListener("change", (e) => {
      const selectedCategory = e.target.value;
      const items = document.querySelectorAll("#items-container > div");
      items.forEach((item) => {
        const category = item.getAttribute("data-category").toLowerCase();
        if (selectedCategory === "all" || category === selectedCategory) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 pb-12 sm:mb-0 text-center ">
        Inventory Dashboard
      </h1>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <Link to="/History" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
            History
          </Link>
          <Link to="/Low-stock-items" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
            Low Stock Items
          </Link>


          {/* Search box */}
          <input
            type="text"
            name="search-items"
            id="searchBox"
            className="border-2 border-gray-800 rounded-lg p-1 w-1/4"
            onChange={(e) => search(e)}
            placeholder="Search Items"
          />

          {/* Category dropdown filter */}
          <select
            className="w-1/6 p-1"
            name="category-selection"
            id="categorySelect"
          >
            <option value="all">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Action buttons */}
          <div className="flex gap-4">
            <Link
              to="/add-cpc"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Add
            </Link>
            <Link to={'/delete-cpc'} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
              Delete
            </Link>
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

        {/* Notification Section for Low Stock
        {notification && (
          <div className="">
            {notification.map((msg, index) => (
              <div
                key={index}
                className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-6"
              >
                {msg}
              </div>
            ))}
          </div>
        )} */}

        {/* Items Grid */}
        {data && (
          <div
            id="items-container"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                data-title={item.name}
                data-category={item.category}
              >
                <div className="p-6">
                  {/* Item title, category, and delete button */}
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                    <span className="flex gap-4">
                      <Link
                        to={`/editItem/${item.name}`}
                        state={{ id: item._id, currentAmount: item.quantity }}
                      >
                        <img
                          className="h-6 cursor-pointer"
                          src={editIcon}
                          alt=""
                        />
                      </Link>
                      <button
                        onClick={() => {
                          DeleteItem(item._id);
                          fetchData();
                        }}
                      >
                        <img
                          className="h-6 cursor-pointer"
                          src={deleteIcon}
                          alt=""
                        />
                      </button>
                    </span>
                  </div>

                  {/* Quantity control */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Current Quantity</span>
                      <div className="flex gap-2 items-center">
                        {/* <button
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item._id, -1);
                          }}
                        >
                          -
                        </button> */}
                        <span
                          className={`text-lg font-medium ${
                            item.quantity <= item.minimumAmount
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {item.quantity}
                        </span>
                        {/* <button
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item._id, 1);
                          }}
                        >
                          +
                        </button> */}
                      </div>
                    </div>

                    {/* Minimum quantity control */}
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

                  {/* Product image if available */}
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
