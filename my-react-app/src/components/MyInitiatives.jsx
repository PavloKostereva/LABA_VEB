// js-react/components/MyInitiatives.js

import React, { useEffect, useState } from 'react';

function MyInitiatives() {
  const [myInitiatives, setMyInitiatives] = useState([]);

  useEffect(() => {
    const storedMyInitiatives = JSON.parse(localStorage.getItem('myInitiatives')) || [];
    setMyInitiatives(storedMyInitiatives);
  }, []);

  return (
    <div>
      <h2>Мої ініціативи</h2>
      <div className="my-initiatives-list">
        {myInitiatives.length > 0 ? (
          myInitiatives.map((initiative) => (
            <div key={initiative.id} className="initiative-card">
              <h3>{initiative.title}</h3>
              <p>{initiative.description}</p>
            </div>
          ))
        ) : (
          <p>Ви ще не приєдналися до жодної ініціативи.</p>
        )}
      </div>
    </div>
  );
}

export default MyInitiatives;
