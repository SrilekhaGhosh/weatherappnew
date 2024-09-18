import React, { useState } from 'react';
import cities from '../cities.json'
import search_icon from '../assets/search.png'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Popper from '@mui/material/Popper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

const WeatherSearch = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Function to filter suggestions based on user input
  const getSuggestions = (inputValue) => {
    const input = inputValue.trim().toLowerCase();
    if (input.length === 0) {
      return [];
    }
    return cities.filter(city =>
      city.toLowerCase().startsWith(input)
    );
  };

  // Handle input change
  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    setSuggestions(getSuggestions(newValue));
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
  };

  // Handle form submission
  const handleSubmit = (event) => {


    event.preventDefault();
    if (value) {
      onSearch(value);
    }
    setSuggestions([]);
    setValue()
  };

  return (
    <div>
    <div className='search-bar'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search a city name"
        />
      </form>
      <img src={search_icon} onClick={handleSubmit}/>
      
    </div>
    <div>
  
    {suggestions.length > 0 && (
        <ul style={{ border: '1px solid #ccc', marginTop: '5px', maxHeight: '150px', overflowY: 'auto', padding: '5px' }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: 'pointer', padding: '5px 0' }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default WeatherSearch;
