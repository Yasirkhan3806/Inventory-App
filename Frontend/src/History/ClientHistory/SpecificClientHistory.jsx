import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function SpecificClientHistory() {
  const { name } = useParams();
  const location = useLocation();
  const clientId = location?.state?.id;

  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('1'); // Default 1 month
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (clientId) {
      fetch(`http://localhost:5000/History/getHistory?clientId=${clientId}`)
        .then(res => res.json())
        .then(data => {
          const allData = data?.data || [];
          setHistoryData(allData);
          applyFilter(allData, filter);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching history:', err);
          setLoading(false);
        });
    }
  }, [clientId]);

  const applyFilter = (data, months) => {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - parseInt(months));
    const filtered = data.filter(entry => new Date(entry.date) >= cutoff);
    setFilteredData(filtered);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    applyFilter(historyData, value);
  };

  const issuedRecords = filteredData.filter(entry => entry.action.toLowerCase() === 'issue');
  const issuedCount = issuedRecords.length;
  const totalIssuedAmount = issuedRecords.reduce((sum, entry) => sum + (entry.amount || 0), 0);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">History for Client: {name}</h2>
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

      {loading ? (
        <p className="text-center text-gray-600">Loading history...</p>
      ) : filteredData.length === 0 ? (
        <p className="text-center text-red-500">No history found for this time range.</p>
      ) : (
        <>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-white rounded shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left text-sm uppercase">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Action</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Admin</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry) => (
                  <tr key={entry._id} className="border-t hover:bg-gray-100 text-sm">
                    <td className="px-4 py-2">{new Date(entry.date).toLocaleString()}</td>
                    <td className="px-4 py-2">{entry.itemId?.name || 'N/A'}</td>
                    <td className="px-4 py-2">{entry.action}</td>
                    <td className="px-4 py-2">{entry.amount}</td>
                    <td className="px-4 py-2">{entry.adminId?.name || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-white shadow-md rounded text-gray-700">
            <p className="font-semibold">Summary Report:</p>
            <p>
              Total Issued Records in Last {filter} Month{filter > 1 ? 's' : ''}: <span className="font-bold">{issuedCount}</span>
            </p>
            <p>
              Total Amount of Items Issued: <span className="font-bold">{totalIssuedAmount}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

