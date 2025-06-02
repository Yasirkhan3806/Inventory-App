import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import AddData from './addData/AddData';
import AddCPC from './addData/Add-C-P-C';
import EditItems from './itemsEdit/EditItems';
import HistoryMain from './History/HistoryMain';
import SpecificItemHistory from './History/ItemsHistory/SpecificItemHistory';
import SpecificClientHistory from './History/ClientHistory/SpecificClientHistory';
import SpecificCPH from './History/CompanyPersonHistory/SpecificCPH';
import DeleteCPCMain from './DeleteCPC/DeleteCPCMain';
import LSMain from './LowStockItems/LSMain';


function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-data" element={<AddData />} />
        <Route path="/add-cpc" element={<AddCPC />} />
        <Route path="/editItem/:name" element={<EditItems />} />
        <Route path='/History' element={<HistoryMain/>}/>
        <Route path="/Item-History/:name" element={<SpecificItemHistory />} />
        <Route path="/client-history/:name" element={<SpecificClientHistory />} />
        <Route path="/company-person-history/:name" element={<SpecificCPH />} />
        <Route path="/delete-cpc" element={<DeleteCPCMain />} />
        <Route path="/Low-stock-items" element={<LSMain />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
