import React from "react";
import { useNavigate } from "react-router-dom";

export default function ItemHistory() {
    // State to store fetched items
    const [data, setData] = React.useState([]);
    // State to store unique categories
    const [categories, setCategories] = React.useState([]);
    const navigate = useNavigate();

    // Fetch items from backend API
    function fetchData() {
        fetch("http://localhost:5000/Items/getItems")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }

    // Fetch data on component mount
    React.useEffect(() => {
        fetchData();
    }, []);

    // Navigate to item history page with item name and id
    const showItemHistory = (name, id) => {
        navigate(`/Item-History/${name}`, { state: { itemId: id } });
    };

    // Search/filter items by name or category
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

    // Update categories and set up category filter event listener when data changes
    React.useEffect(() => {
        // Get unique categories from data
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
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Page Title */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Item History</h2>
            <div className="flex gap-5">
                {/* Search box */}
                <input
                    type="text"
                    name="search-items"
                    id="searchBox"
                    className="border-2 border-gray-800 rounded-lg p-1 w-1/4 self-center"
                    onChange={(e) => search(e)}
                    placeholder="Search Items"
                />
                {/* Category dropdown */}
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
            </div>
            {/* Items grid */}
            <div id="items-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item) => (
                    <div
                        key={item.id || item._id}
                        data-title={item.name}
                        data-category={item.category}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                        onClick={() => showItemHistory(item.name, item._id)}
                    >
                        {/* Item name */}
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            {item.name}
                        </h3>
                        {/* Item category */}
                        <p className="text-gray-600 mb-1">Category: {item.category}</p>
                        {/* Item quantity */}
                        <p className="text-gray-600 mb-1">Quantity: {item.quantity}</p>
                        {/* Item added date */}
                        <p className="text-gray-500 text-sm">Added: {item.addedDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
