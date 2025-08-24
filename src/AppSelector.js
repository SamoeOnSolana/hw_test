import React, { useState } from 'react';
import WeatherApp from './WeatherApp';
import CinemaApp from './CinemaApp';
import CitiesApp from './CitiesApp';
import BlogApp from './BlogApp';

function AppSelector() {
  const [selectedApp, setSelectedApp] = useState('weather');

  const apps = [
    { id: 'weather', name: '🌤️ Погода', component: WeatherApp },
    { id: 'cinema', name: '🎬 Кінотеатр', component: CinemaApp },
    { id: 'cities', name: '🏙️ Міста', component: CitiesApp },
    { id: 'blog', name: '📝 Блог', component: BlogApp }
  ];

  const SelectedComponent = apps.find(app => app.id === selectedApp)?.component;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div style={{ 
        backgroundColor: '#343a40', 
        color: 'white', 
        padding: '20px', 
        textAlign: 'center' 
      }}>
        <h1 style={{ margin: '0 0 20px 0' }}>React Домашні Завдання</h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {apps.map(app => (
            <button
              key={app.id}
              onClick={() => setSelectedApp(app.id)}
              style={{
                padding: '12px 20px',
                backgroundColor: selectedApp === app.id ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s'
              }}
            >
              {app.name}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ padding: '20px' }}>
        <SelectedComponent />
      </div>
    </div>
  );
}

export default AppSelector;
