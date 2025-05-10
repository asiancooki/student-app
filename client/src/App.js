// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapView from './components/MapView';
import OpportunityList from './components/OpportunityList';
import './App.css'; // CSS import stays

const App = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [showList, setShowList] = useState(true); // ✅ state for toggle

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await axios.get('/api/opportunities', {
          params: {
            major: 'Computer Science',
            type: 'internship',
            lat: 45.5017,
            lng: -73.5673,
            radius: 10000,
          },
        });
        setOpportunities(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎓 Student Opportunities</h1>
        <button className="toggle-btn" onClick={() => setShowList(!showList)}>
          {showList ? 'Hide List' : 'Show List'}
        </button>
      </header>
      <main className="app-main">
        <div className={`opportunity-list ${showList ? '' : 'collapsed'}`}>
          <OpportunityList opportunities={opportunities} />
        </div>
        <div className="map-view">
          {/* ✅ Pass showList down to MapView */}
          <MapView opportunities={opportunities} showList={showList} />
        </div>
      </main>
    </div>
  );
};

export default App;
