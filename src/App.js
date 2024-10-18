import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ backgroundColor: 'seconday.main' }} className="App">
      <HomePage />
    </Box>
  );
}

export default App;
