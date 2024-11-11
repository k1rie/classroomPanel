import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, List, ListItem, ListItemText, CircularProgress, Paper, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BASE_API_URL } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const SearchComponent = () => {
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const importGroup = async (idGroup, idNewGroup) => {
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
        await fetch(`${BASE_API_URL}/importGroup`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idGroup: idGroup,
                idNewGroup: idNewGroup
            })
        });

        navigate(0);
    };

    const fetchResults = async (query) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
            const response = await fetch(`${BASE_API_URL}/getClassroomByName/${query}`, {
                method: 'GET',
                headers: { 'Authorization': `Basic ${credentials}` },
            });
            const data = await response.json();
            setResults(data);
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
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <Box sx={{ maxWidth: 'lg'}}>
            <Box component="p" sx={{ mb: 2, color: 'var(--body_textColor)' }}>
                Importar Grupo
            </Box>
            <Box sx={{ position: 'relative' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon style={{ color: "var(--body_textColor)" }} />
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
                        <Paper 
                            elevation={3} 
                            sx={{ 
                                mt: 1,
                                maxHeight: 300,
                                overflowY: 'auto',
                                backgroundColor: 'var(--body_background)',
                                borderColor: 'var(--body_textColor)',
                            }}
                        >
                            <List>
                                {results.map((result) => (
                                    <ListItem
                                        button
                                        key={result.id}
                                        onClick={() => importGroup(result.id, id)}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'var(--hover_color)',
                                                cursor:"pointer"
                                            },
                                            borderBottom: '1px solid var(--border_color)'
                                        }}
                                    >
                                        <ListItemText 
                                            primary={result.especialidad}
                                            sx={{
                                                '& .MuiListItemText-primary': {
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
                        <Paper sx={{ 
                            mt: 1, 
                            p: 2, 
                            textAlign: 'center',
                            backgroundColor: 'var(--body_background)',
                            color: 'var(--body_textColor)'
                        }}>
                            No se encontraron resultados
                        </Paper>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default SearchComponent;