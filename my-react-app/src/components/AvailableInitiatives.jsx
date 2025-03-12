// js-react/components/InitiativesList.js

import React, { useState, useEffect } from 'react';
import InitiativeCard from './InitiativeCard';

function InitiativesList() {
  const [initiatives, setInitiatives] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    place: '',
    type: ''
  });

  useEffect(() => {
    // Отримання ініціатив з localStorage або серверу
    const initiativesData = JSON.parse(localStorage.getItem('initiatives')) || [];
    setInitiatives(initiativesData);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filteredInitiatives = initiatives.filter((initiative) => {
    return (
      (filters.date ? initiative.date === filters.date : true) &&
      (filters.place ? initiative.place === filters.place : true) &&
      (filters.type ? initiative.type === filters.type : true)
    );
  });

  return (
    <div>
      <div className="filters">
        <label>
          Дата:
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Місце:
          <input
            type="text"
            name="place"
            value={filters.place}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Тип активності:
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">Усі</option>
            <option value="екологія">Екологія</option>
            <option value="допомога тваринам">Допомога тваринам</option>
            <option value="соціальна підтримка">Соціальна підтримка</option>
          </select>
        </label>
      </div>

      <div className="initiatives-list">
        {filteredInitiatives.map((initiative) => (
          <InitiativeCard key={initiative.id} initiative={initiative} />
        ))}
      </div>
    </div>
  );
}

export default InitiativesList;
