import React from 'react';
import { convertToCsv,convertToPdf } from '../CsvAndPdfConversion/MainCAPFunc';

export default function LSMain() {
     const [lowStockItems, setLowStockItems] = React.useState([]);
     const [data, setData] = React.useState([]);
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


  React.useEffect(() => {
    if (data) {
      const lowStockItems = data.filter(
        (item) => item.quantity <= item.minimumAmount
      );

      if (lowStockItems.length > 0) {
        setLowStockItems(lowStockItems);
      } else {
        setLowStockItems([]);
      }
    }
  }, [data]);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Low Stock Items</h2>
      {lowStockItems.length === 0 ? (
        <p className="text-gray-600">No low stock items.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b">Item Name</th>
              <th className="text-left px-4 py-2 border-b">Category</th>
              <th className="text-left px-4 py-2 border-b">Quantity</th>
              <th className="text-left px-4 py-2 border-b">Minimum Required</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{item.name}</td>
                <td className="px-4 py-2 border-b">{item.category}</td>
                <td className="px-4 py-2 border-b text-red-500">{item.quantity}</td>
                <td className="px-4 py-2 border-b">{item.minimumAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <span className='flex gap-4'>
      <button
          onClick={() => convertToCsv(lowStockItems)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer mt-4"
        >
            Export Csv
            </button>

               <button
          onClick={() => convertToPdf(lowStockItems)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer mt-4"
        >
            Export Pdf
            </button>
            </span>
    </div>
  );
}

