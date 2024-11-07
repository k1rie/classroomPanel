import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, IconButton } from '@mui/material';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../api';

const TaskGradesTable = ({ tasksData = [], studentId }) => {
  const [tasks, setTasks] = useState(tasksData);
  const navigate = useNavigate();

  // Asegurarnos de que los datos se muestren al montar el componente
  useEffect(() => {
    setTasks(tasksData);
  }, [tasksData]);

  useEffect(() => {
    // Establecer rateType como "points" por defecto para cada tarea
    const updatedTasks = tasksData.map(task => ({
      ...task,
      rateType: task.rateType || "points", // Si no tiene un rateType, poner "points" como predeterminado
      inputValue: task.inputValue || 0,  // Inicializar inputValue
    }));
    setTasks(updatedTasks);
  }, [tasksData]);

  // Función para manejar el cambio en el input del porcentaje o puntaje
  const handleValueChange = (eListener, task) => {
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, inputValue: eListener.target.value }; // Actualiza el valor solo para la tarea correspondiente
      }
      return t;
    });
    setTasks(newTasks);
  };

  // Función para alternar entre porcentaje y puntaje
  const toggleRateType = (task) => {
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) {
        const newRateType = t.rateType === "percentage" ? "points" : "percentage"; // Cambiar tipo de calificación
        return { ...t, rateType: newRateType };
      }
      return t;
    });
    setTasks(newTasks);
  };

  // Función para enviar la calificación al servidor
  const changeFinalRate = async (task) => {
    let finalRate;
    if (task.rateType === "percentage") {
      finalRate = (Number(task.inputValue) * task.rate) / 100; // Cálculo con porcentaje
    } else {
      finalRate = Number(task.inputValue); // Calificación directa (puntaje)
    }

    await fetch(`${BASE_API_URL}/changeRateTask`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newRate: finalRate,
        idStudent: Number(studentId),
        taskName: task.name,
        emailUser: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
      }),
    });
    console.log(`Calificación para ${task.name}: ${finalRate}`);
    navigate(0); // Recargar la página después de actualizar
  };

  const columns = [
    { field: 'name', headerName: 'Tarea', width: 200 },
    { field: 'rate', headerName: 'Valor', width: 100 },
    { field: 'finalRate', headerName: 'Calificación Final', width: 150 },
    { 
      field: 'actions', 
      headerName: 'Asignar Calificación', 
      width: 250, 
      renderCell: (params) => {
        const task = params.row;
        return (
          <div>
                <IconButton
                style={{color:"var(--body_textColor)"}}
                onClick={() => toggleRateType(task)}>
              <ChangeCircleOutlinedIcon/>
            </IconButton>
            <TextField
              type="number"
              value={task.inputValue || ''}
              onChange={(e) => handleValueChange(e, task)}
              placeholder={task.rateType === "percentage" ? "Porcentaje" : "Puntaje"}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  changeFinalRate(task); // Enviar el valor al backend cuando se presione Enter
                }
              }}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiInputBase-root': {
                  color: 'var(--body_textColor)',  // Cambiar el color del texto
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'var(--body_textColor)',  // Cambiar el color del borde
                  },
              
               
                },
              }}            />
        
          </div>
        );
      }
    },
  ];

  const rows = tasks.map((task) => ({
    id: task.id,
    name: task.name,
    rate: task.rate,
    finalRate: task.final_rate !== null ? task.final_rate : 'No asignado',
    inputValue: task.inputValue || 0, // Añadir el valor actual para cada tarea
    rateType: task.rateType || "percentage", // Añadir tipo de calificación
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
      disableSelectionOnClick 
       sx={{
        height: 400,
        backgroundColor: 'var(--body_background)',
        color: 'white',
        borderColor: '#007a87',
        
        '& .MuiDataGrid-cell': {
          color: 'var(--body_textColor)', // Color de texto de las celdas
          borderBottom: '1px solid var(--body_borderColor)',
        },
        '& .MuiDataGrid-columnHeader': {
            width:"25%",
          backgroundColor: '#007a87',
          color: 'white', // Color de texto de los headers
          borderBottom: '1px solid var(--body_borderColor)',
        },
  
        '& .MuiDataGrid-row:hover': {
          backgroundColor: 'var(--body_rowHover)', // Color de fondo al hacer hover
        },
        '& .MuiDataGrid-footerContainer': {
            backgroundColor: 'var(--body_background)', // Fondo de la paginación
          },
          '& .MuiTablePagination-root': {
            color: '#ffffff',           // Color de texto en la paginación
          },
          '& .MuiTablePagination-selectIcon': {
            color: 'var(--body_textColor)',           // Color del icono de selección
          },
          '& .MuiSelect-select': {
            color: 'var(--body_textColor)',           // Color del número de filas por página
          },
          '& .MuiTablePagination-actions .MuiSvgIcon-root': {
            color: 'var(--body_textColor)',           // Color de las flechas de paginación
    }
      }}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id}
        components={{
          Toolbar: () => (
            <div style={{ margin: '10px' }}>
              <Button variant="contained" onClick={() => navigate(0)}>Recargar</Button>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default TaskGradesTable;
