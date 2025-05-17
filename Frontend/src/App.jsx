import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import AddData from './addData/AddData';
import AddCPC from './addData/Add-C-P-C';
import EditItems from './itemsEdit/EditItems';
import HistoryMain from './History/HistoryMain';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-data" element={<AddData />} />
        <Route path="/add-cpc" element={<AddCPC />} />
        <Route path="/editItem/:name" element={<EditItems />} />
        <Route path='/History' element={<HistoryMain/>}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
