import React, { useState } from 'react';
import CityList from './components/CityList';
import CityForm from './components/CityForm';
import CitySearch from './components/CitySearch';

function CitiesApp() {
  const [cities, setCities] = useState([
    {
      id: 1,
      name: 'Київ',
      population: 2967360,
      region: 'Київська область',
      founded: 482,
      description: 'Столиця України, найбільше місто країни',
      attractions: ['Хрещатик', 'Софійський собор', 'Києво-Печерська лавра'],
      coordinates: { lat: 50.4501, lng: 30.5234 }
    },
    {
      id: 2,
      name: 'Львів',
      population: 717273,
      region: 'Львівська область',
      founded: 1256,
      description: 'Культурна столиця України, місто з багатою історією',
      attractions: ['Площа Ринок', 'Львівська опера', 'Вишнівецький палац'],
      coordinates: { lat: 49.8397, lng: 24.0297 }
    },
    {
      id: 3,
      name: 'Одеса',
      population: 1015826,
      region: 'Одеська область',
      founded: 1794,
      description: 'Порт на Чорному морі, місто з унікальною атмосферою',
      attractions: ['Потьомкінські сходи', 'Одеська опера', 'Дерибасівська вулиця'],
      coordinates: { lat: 46.4825, lng: 30.7233 }
    },
    {
      id: 4,
      name: 'Харків',
      population: 1441057,
      region: 'Харківська область',
      founded: 1654,
      description: 'Найбільше місто Східної України, важливий промисловий центр',
      attractions: ['Площа Свободи', 'Харківський університет', 'Покровський собор'],
      coordinates: { lat: 49.9935, lng: 36.2304 }
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const addCity = (city) => {
    setCities([...cities, { ...city, id: Date.now() }]);
  };

  const deleteCity = (id) => {
    setCities(cities.filter(city => city.id !== id));
  };

  const editCity = (id, updatedCity) => {
    setCities(cities.map(city => 
      city.id === id ? { ...city, ...updatedCity } : city
    ));
  };

  const getFilteredCities = () => {
    let filtered = cities;
    
    if (searchTerm) {
      filtered = filtered.filter(city => 
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedRegion) {
      filtered = filtered.filter(city => city.region === selectedRegion);
    }
    
    return filtered;
  };

  const regions = [...new Set(cities.map(city => city.region))];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>Міста України</h1>
      
      <CityForm onAddCity={addCity} regions={regions} />
      
      <CitySearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        regions={regions}
      />
      
      <CityList 
        cities={getFilteredCities()}
        onDeleteCity={deleteCity}
        onEditCity={editCity}
      />
    </div>
  );
}

export default CitiesApp;
