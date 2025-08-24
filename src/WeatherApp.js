import React, { useState, useEffect } from 'react';

// Компонент поиска погоды
function WeatherSearch({ city, country, onCityChange, onCountryChange, onSearch, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '20px',
      backdropFilter: 'blur(10px)'
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            placeholder="Введіть місто"
            style={{
              flex: '1',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px',
              minWidth: '200px'
            }}
            required
          />
          <input
            type="text"
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            placeholder="Країна (необов'язково)"
            style={{
              flex: '1',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px',
              minWidth: '150px'
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#ccc' : '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          {loading ? 'Завантаження...' : 'Пошук погоди'}
        </button>
      </form>
    </div>
  );
}

// Компонент отображения погоды
function WeatherDisplay({ weatherData, city, country, isDay }) {
  const current = weatherData.current;
  const daily = weatherData.daily;

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '25px',
      borderRadius: '15px',
      marginBottom: '20px',
      backdropFilter: 'blur(10px)'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '28px',
        fontWeight: 'bold'
      }}>
        {weatherData.cityName}, {weatherData.country}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '25px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '10px'
        }}>
          <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>Температура</h3>
          <div style={{ fontSize: '48px', fontWeight: 'bold' }}>
            {Math.round(current.temperature_2m)}°C
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '10px'
        }}>
          <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>Вологість</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
            {current.relative_humidity_2m}%
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '10px'
        }}>
          <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>Вітер</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
            {Math.round(current.wind_speed_10m)} км/год
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '10px'
        }}>
          <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>Тиск</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
            {Math.round(current.pressure_msl)} гПа
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '8px'
        }}>
          <h4 style={{ marginBottom: '8px', fontSize: '16px' }}>Схід сонця</h4>
          <div style={{ fontSize: '18px' }}>
            {formatTime(daily.sunrise[0])}
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '8px'
        }}>
          <h4 style={{ marginBottom: '8px', fontSize: '16px' }}>Захід сонця</h4>
          <div style={{ fontSize: '18px' }}>
            {formatTime(daily.sunset[0])}
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '8px'
        }}>
          <h4 style={{ marginBottom: '8px', fontSize: '16px' }}>Видимість</h4>
          <div style={{ fontSize: '18px' }}>
            {Math.round(current.visibility / 1000)} км
          </div>
        </div>
      </div>
    </div>
  );
}

// Компонент настроек
function WeatherSettings({ settings, onUpdateSettings, isDay }) {
  const handleColorChange = (type, value) => {
    onUpdateSettings({ [type]: value });
  };

  const handleFavoriteCityChange = (value) => {
    onUpdateSettings({ favoriteCity: value });
  };

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '20px',
      borderRadius: '10px',
      backdropFilter: 'blur(10px)'
    }}>
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Налаштування</h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
            Колір тексту:
          </label>
          <input
            type="color"
            value={settings.textColor}
            onChange={(e) => handleColorChange('textColor', e.target.value)}
            style={{
              width: '100%',
              height: '40px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
            Колір фону:
          </label>
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
            style={{
              width: '100%',
              height: '40px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
            Улюблене місто:
          </label>
          <input
            type="text"
            value={settings.favoriteCity}
            onChange={(e) => handleFavoriteCityChange(e.target.value)}
            placeholder="Введіть місто"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>
      
      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '14px',
        opacity: 0.8
      }}>
        {isDay ? '☀️ Денний режим' : '🌙 Нічний режим'}
      </div>
    </div>
  );
}

// Главный компонент приложения погоды
function WeatherApp() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({
    textColor: '#000000',
    backgroundColor: '#ffffff',
    favoriteCity: 'Київ'
  });
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDay(hour >= 6 && hour < 20);
  }, []);

  const search = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    
    try {
      const query = country ? `${city},${country}` : city;
      
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      );
      const geoData = await geoResponse.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        setError('місто не знайдено');
        setData(null);
        return;
      }
      
      let location = geoData.results[0];
      
      if (city.toLowerCase().includes('київ') || city.toLowerCase().includes('kyiv') || city.toLowerCase().includes('kiev')) {
        const ukraineResult = geoData.results.find(result => 
          result.country === 'Ukraine' || result.country === 'UA'
        );
        if (ukraineResult) {
          location = ukraineResult;
        }
      }
      
      const { latitude, longitude } = location;
      
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,pressure_msl,visibility&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability&daily=sunrise,sunset&timezone=auto`
      );
      
      const weatherData = await weatherResponse.json();
      
      if (weatherData.error) {
        setError('Помилка отримання даних про погоду');
        setData(null);
      } else {
        setData({
          ...weatherData,
          cityName: location.name,
          country: location.country,
          admin1: location.admin1
        });
        setError(null);
      }
    } catch (error) {
      console.error('Помилка завантаження погоди:', error);
      setError('Помилка мережі або сервера');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  const appStyle = {
    backgroundColor: settings.backgroundColor || (isDay ? '#e3f2fd' : '#263238'),
    color: settings.textColor || (isDay ? '#000000' : '#ffffff'),
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={appStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Додаток Погоди
      </h1>
      
      <WeatherSearch 
        city={city}
        country={country}
        onCityChange={setCity}
        onCountryChange={setCountry}
        onSearch={search}
        loading={loading}
      />
      
      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      {data && (
        <WeatherDisplay 
          weatherData={data}
          city={city}
          country={country}
          isDay={isDay}
        />
      )}
      
      <WeatherSettings 
        settings={settings}
        onUpdateSettings={updateSettings}
        isDay={isDay}
      />
    </div>
  );
}

export default WeatherApp;