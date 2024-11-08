import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, List, ListItem, ListItemText, CircularProgress, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BASE_API_URL } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const SearchComponent = () => {
    const {id} = useParams()
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const importGroup = async (idGroup,idNewGroup)=>{
    const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
    await fetch(`${BASE_API_URL}/importGroup`,{
        method: 'POST',
        headers: { 
            'Authorization': `Basic ${credentials}`,
            "Content-Type": "application/json"
         },
         body:JSON.stringify({
            idGroup: idGroup,
            idNewGroup: idNewGroup
                })
    })

navigate(0)
  }

  const fetchResults = async (query) => {
    setLoading(true);
    try {
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
console.log(searchTerm)
      const response = await fetch(`${BASE_API_URL}/getClassroomByName/${searchTerm}`, {
        method: 'GET',
        headers: { 'Authorization': `Basic ${credentials}` },
      });
      const data = await response.json();
      setResults(data); // Ajusta según la estructura de tu respuesta
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchResults(searchTerm);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
        <p>Importar Grupo</p>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{color:"var(--body_textColor)"}} />
            </InputAdornment>
          ),
        }}

        sx={{
            '& .MuiInputBase-input': {
                color: 'var(--body_textColor)', // Cambia el color del texto
            },
          
          
            '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'var(--body_textColor)', // Color del borde normal
                    },
                    '&:hover fieldset': {
                        borderColor: 'primary.main', // Color del borde al pasar el mouse
                    }
                },
        }}
      />

      {loading && <CircularProgress size={24} style={{ marginTop: 10 }} />}

      {results.length > 0 && (
        <Paper elevation={3} style={{ marginTop: 10 }}>
          <List>
            {results.map((result) => (
              <ListItem onClick={(e)=>{importGroup(result.id,id)}} button key={result.id}>
                <ListItemText primary={result.especialidad} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default SearchComponent;
