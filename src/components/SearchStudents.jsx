import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, List, ListItem, ListItemText, CircularProgress, Paper, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BASE_API_URL } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const SearchStudent = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const removeDuplicates = (data) => {
    if (!Array.isArray(data)) return [];
    
    const uniqueMap = new Map();
    
    data.forEach(student => {
      const key = `${student.apellidos}-${student.nombre}-${student.grado}-${student.grupo}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, student);
      }
    });
    
    return Array.from(uniqueMap.values());
  };

  const fetchResults = async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
      const response = await fetch(`${BASE_API_URL}/getStudentByName/${query}/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Cache-Control': 'no-cache',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error en la búsqueda: ${response.status}`);
      }

      const data = await response.json();
      const uniqueResults = removeDuplicates(data);
      setResults(uniqueResults);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
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
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleStudentClick = (student) => {
    navigate(`/student/group/${id}/${student.id}`);
    setSearchTerm('');
    setResults([]);
  };

  return (
    <Box sx={{ maxWidth: 'lg' }}>
      <Box component="p">Buscar Estudiante</Box>
      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por apellidos..."
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
              color: 'var(--body_textColor)',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'var(--body_textColor)',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              }
            },
          }}
        />

        <Box sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          zIndex: 1,
        }}>
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}

          {results.length > 0 && (
            <Paper elevation={3}  sx={{ 
                mt: 1,
                maxHeight: 300,
                overflowY: 'auto',
                backgroundColor: 'var(--body_background)',
                borderColor: 'var(--body_textColor)',
            }}>
              <List>
                {results.map((result, index) => (
                  <ListItem
                    button
                    key={`${result.id}-${index}`}
                    onClick={() => handleStudentClick(result)}
                    sx={{ '&:hover': { bgcolor: 'action.hover', cursor:"pointer" } }}
                  >
                    <ListItemText
                      primary={`${result.apellidos}, ${result.nombre}`}
                      secondary={`${result.grado}° ${result.grupo} - ${result.especialidad}`}
                      primaryTypographyProps={{
                        sx: { fontWeight: 500 }
                      }}
                      sx={{
                        '& .MuiListItemText-primary': {
                            color: 'var(--body_textColor)',
                        },
                            '.MuiListItemText-secondary': {
                                color: 'var(--body_textColor)'
                            }
                        
                        
                    }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {searchTerm && !loading && results.length === 0 && (
            <Paper sx={{ mt: 2, p: 2, textAlign: 'center', color: 'text.secondary' }}>
              No se encontraron estudiantes
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchStudent;