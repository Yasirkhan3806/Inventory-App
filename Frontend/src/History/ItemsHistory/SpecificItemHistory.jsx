import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {convertToPdfHistory} from '../../CsvAndPdfConversion/MainCAPFunc'

// Component to display the history of a specific inventory item
export default function SpecificItemHistory() {
  // Get the item name from the URL params
  const { name } = useParams();
  // Get the itemId from the location state (passed via navigation)
  const location = useLocation();
  const itemId = location.state?.itemId;

  // State to store all history data fetched from the server
  const [historyData, setHistoryData] = useState([]);
  // State to store filtered history data based on selected time range
  const [filteredData, setFilteredData] = useState([]);
  // Loading state for async fetch
  const [loading, setLoading] = useState(true);
  // State for the selected filter (number of months)
  const [filter, setFilter] = useState('1'); // Default: 1 month

  // Fetch history data when itemId changes
  useEffect(() => {
    if (itemId) {
      fetch(`http://localhost:5000/History/getHistory?itemId=${itemId}`)
        .then(res => res.json())
        .then(data => {
          const rawData = data?.data || [];
          setHistoryData(rawData);
          applyFilter(rawData, filter); // Apply initial filter
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching history:', error);
          setLoading(false);
        });
    }
  }, [itemId]);

  // Function to filter data based on the selected number of months
  const applyFilter = (data, months) => {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - parseInt(months));
    const filtered = data.filter(entry => new Date(entry.date) >= cutoff);
    setFilteredData(filtered);
  };

  // Handle filter dropdown change
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    applyFilter(historyData, value);
  };

  // Calculate issued records and totals
  const issuedRecords = filteredData.filter(entry => entry.action.toLowerCase() === 'issue');
  const issuedCount = issuedRecords.length;
  const totalIssuedAmount = issuedRecords.reduce((sum, entry) => sum + (entry.amount || 0), 0);

  // Calculate entry records and totals
  const entryRecords = filteredData.filter(entry => entry.action.toLowerCase() === 'entry');
  const entryCount = entryRecords.length;
  const totalEntryAmount = entryRecords.reduce((sum, entry) => sum + (entry.amount || 0), 0);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header and filter dropdown */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">History for Item: {name}</h2>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700"
        >
          <option value="1">Last 1 Month</option>
          <option value="3">Last 3 Months</option>
          <option value="6">Last 6 Months</option>
        </select>
      </div>

      {/* Loading and empty state handling */}
      {loading ? (
        <p className="text-center text-gray-600">Loading history...</p>
      ) : filteredData.length === 0 ? (
        <p className="text-center text-red-500">No history found for this time range.</p>
      ) : (
        <>
          {/* History table */}
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-white rounded shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left text-sm uppercase">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Action</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Admin</th>
                  <th className="px-4 py-2">Client</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry) => (
                  <tr key={entry._id} className="border-t hover:bg-gray-100 text-sm">
                    <td className="px-4 py-2">{new Date(entry.date).toLocaleString()}</td>
                    <td className="px-4 py-2">{entry.action}</td>
                    <td className="px-4 py-2">{entry.amount}</td>
                    <td className="px-4 py-2">{entry.adminId?.name || 'N/A'}</td>
                    <td className="px-4 py-2">{entry.clientId?.name || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary report */}
          <div className="mt-4 p-4 bg-white shadow-md rounded text-gray-700">
            <p className="font-semibold">Summary Report:</p>
            <p>
              Total Issued Records in Last {filter} Month{filter > 1 ? 's' : ''}: <span className="font-bold">{issuedCount}</span> <br />
              Total Items issued in {filter} Month{filter > 1 ? 's' : ''}: <span className="font-bold">{totalIssuedAmount}</span>
            </p>
            <p>
              Total Entry Records in Last {filter} Month{filter > 1 ? 's' : ''}: <span className="font-bold">{entryCount}</span> <br />
              Total Items Stocked in {filter} Month{filter > 1 ? 's' : ''}: <span className="font-bold">{totalEntryAmount}</span>
            </p>
          </div>
                   <button 
  className='bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition'
  onClick={() => convertToPdfHistory(historyData,name,issuedCount,totalIssuedAmount,entryCount,totalEntryAmount) }
>
  Export PDF
</button>
        </>
      )}
    </div>
  );
}
