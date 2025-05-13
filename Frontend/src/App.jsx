import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import AddData from './addData/AddData';
import AddCPC from './addData/Add-C-P-C';
import EditItems from './itemsEdit/EditItems';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-data" element={<AddData />} />
        <Route path="/add-cpc" element={<AddCPC />} />
        <Route path="/editItem/:name" element={<EditItems />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
