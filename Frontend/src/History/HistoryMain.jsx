import React, { useState } from 'react';
import AllHistory from './AllHistory';
// Import your components for each option
import CompanyPersonHistory from './CompanyPersonHistory/CompanyPersonHistory';
import ClientHistory from './ClientHistory/ClientHistory';
import ItemHistory from './ItemsHistory/ItemHistory';
import HomeButton from '../HomeButton';

export default function HistoryMain() {
  const [selected, setSelected] = useState('all');

  let content;
  switch (selected) {
    case 'companyPerson':
      content = <CompanyPersonHistory />;
      break;
    case 'client':
      content = <ClientHistory />;
      break;
    case 'item':
      content = <ItemHistory />;
      break;
    case 'all':
    default:
      content = <AllHistory />;
      break;
  }

  return (
    <div className=" rounded-xl p-4 bg-gradient-to-br from-indigo-100 to-teal-50 shadow-2xl">
      <label
        htmlFor="history-select"
        className="font-bold text-lg text-blue-600 mr-4 tracking-wide"
      >
        Select History Type:
      </label>
      <select
        id="history-select"
        value={selected}
        onChange={e => setSelected(e.target.value)}
        className="mb-8 px-6 py-3 text-base border-2 border-blue-600 rounded-lg bg-white text-gray-900 font-bold outline-none shadow-md transition-colors focus:border-blue-800"
      >
        <option value="companyPerson">Company Person</option>
        <option value="client">Client</option>
        <option value="item">Item</option>
        <option value="all">All</option>
      </select>
      <span className='ml-12'>  <HomeButton /></span>
      
      <div className="mt-8">{content}</div>
    </div>
  );
}
