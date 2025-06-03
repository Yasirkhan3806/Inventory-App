import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllHistory() {
    const [allHistories, setAllHistories] = useState([]);
    const [filteredHistories, setFilteredHistories] = useState([]);
    const [filterMonths, setFilterMonths] = useState(1);

    const filterByMonths = (data, months) => {
        const now = new Date();
        const fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - months);

        return data.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= fromDate && entryDate <= now;
        });
    };

    const fetchHistory = async () => {
        try {
            const response = await axios.get('http://localhost:5000/History/getHistory');
            const data = response.data.data || [];
            setAllHistories(data);
            setFilteredHistories(filterByMonths(data, filterMonths));
        } catch (error) {
            console.error('Failed to fetch history:', error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);
    console.log(allHistories);

    useEffect(() => {
        setFilteredHistories(filterByMonths(allHistories, filterMonths));
    }, [filterMonths, allHistories]);

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-8 ">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    History <span className="text-base font-normal text-gray-500">(Last {filterMonths} Month{filterMonths > 1 ? 's' : ''})</span>
                </h1>
                <select
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={filterMonths}
                    onChange={(e) => setFilterMonths(Number(e.target.value))}
                >
                    <option value={1}>Last 1 Month</option>
                    <option value={3}>Last 3 Months</option>
                    <option value={6}>Last 6 Months</option>
                </select>
            </div>

            <div className="space-y-4 h-[70vh] overflow-auto">
                {filteredHistories.length === 0 ? (
                    <div className="flex justify-center items-center h-32">
                        <p className="text-gray-500 text-lg">No history found for this range.</p>
                    </div>
                ) : (
                    filteredHistories.map((history) => (
                        <div
                            key={history._id}
                            className="border border-gray-200 p-5 rounded-lg shadow-sm hover:bg-blue-50 transition flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 "
                        >
                            <div className="flex gap-2 space-y-1">
                                <p><span className="font-semibold text-blue-700">| Action:</span> {history.action}</p>
                                <p><span className="font-semibold text-blue-700">| Item:</span> {history.itemId?.name || 'N/A'}</p>
                                <p><span className="font-semibold text-blue-700">| Client:</span> {history.clientId?.name || 'N/A'}</p>
                                <p><span className="font-semibold text-blue-700">| Admin:</span> {history.adminId?.name || 'N/A'}</p>
                                <p><span className="font-semibold text-blue-700">| Amount:</span> {history.amount}</p>
                            </div>
                            <div className="text-right text-gray-500 text-sm sm:w-48">
                                <span className="block font-semibold">Date:</span>
                                <span>{new Date(history.date).toLocaleString()}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
