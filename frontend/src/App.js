import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Service} from './components/Service'
import {ComponentsManager} from './components/ComponentsManager'
import {RevenueCharts} from './components/RevenueCharts'
function App() {
  return (
    <Router>
        <div>
            <Routes>
                <Route path="/" element={<Service />} />
                <Route path="/components" element={<ComponentsManager />} />
                <Route path="/chart" element={<RevenueCharts/>} />
            </Routes>
        </div>
    </Router>
);
}

export default App;
