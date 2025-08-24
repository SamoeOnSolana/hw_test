import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherApp from './WeatherApp';

test('відображає заголовок додатку', () => {
  render(<WeatherApp />);
  expect(screen.getByText('Додаток Погоди')).toBeInTheDocument();
});

test('відображає форму пошуку', () => {
  render(<WeatherApp />);
  const cityInputs = screen.getAllByPlaceholderText('Введіть місто');
  expect(cityInputs.length).toBeGreaterThan(0);
  expect(screen.getByPlaceholderText('Країна (необов\'язково)')).toBeInTheDocument();
  expect(screen.getByText('Пошук погоди')).toBeInTheDocument();
});

test('відображає налаштування', () => {
  render(<WeatherApp />);
  expect(screen.getByText('Налаштування')).toBeInTheDocument();
  expect(screen.getByText('Колір тексту:')).toBeInTheDocument();
  expect(screen.getByText('Колір фону:')).toBeInTheDocument();
  expect(screen.getByText('Улюблене місто:')).toBeInTheDocument();
});

test('показує денний або нічний режим', () => {
  render(<WeatherApp />);
  const modeText = screen.getByText(/Денний режим|Нічний режим/);
  expect(modeText).toBeInTheDocument();
});

test('обробляє зміну міста', () => {
  render(<WeatherApp />);
  const cityInput = screen.getAllByPlaceholderText('Введіть місто')[0];
  fireEvent.change(cityInput, { target: { value: 'Київ' } });
  expect(cityInput.value).toBe('Київ');
});

test('обробляє зміну країни', () => {
  render(<WeatherApp />);
  const countryInput = screen.getByPlaceholderText('Країна (необов\'язково)');
  fireEvent.change(countryInput, { target: { value: 'Україна' } });
  expect(countryInput.value).toBe('Україна');
});
