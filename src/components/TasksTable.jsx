import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton, Paper, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../api';

const TasksTable = ({ data, students }) => {
  const [taskRate, setTaskRate] = useState();
  const [taskName, setTaskName] = useState('');
  const [newNameTask, setNewNameTask] = useState('');
  const [newRateTask, setNewRateTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingRateId, setEditingRateId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const changeNameTask = async (id, oldName) => {
    await fetch(BASE_API_URL + "/changeNameTask", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        alumnosTask: students,
        newTaskName: newNameTask,
        nameTask: oldName,
        idTask: id,
        emailUser: localStorage.getItem("email"),
        password: localStorage.getItem("password")
      })
    });
    setEditingTaskId(null);
  };

  const changeRateTaskGroup = async (id) => {
    await fetch(BASE_API_URL + "/changeRateTaskGroup", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        alumnosTask: students,
        newRate: newRateTask,
        nameTask: taskName,
        rate: taskRate,
        idTask: id,
        emailUser: localStorage.getItem("email"),
        password: localStorage.getItem("password")
      })
    });
    setEditingRateId(null);
  };

  const deleteTask = async (id, taskName) => {
    await fetch(BASE_API_URL + "/deleteTask", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        alumnosTask: students,
        id,
        nameTask: taskName,
        emailUser: localStorage.getItem("email"),
        password: localStorage.getItem("password")
      })
    });
    navigate(0);
  };

  const handleNameKeyDown = (e, task) => {
    if (e.key === "Enter") {
      changeNameTask(task.id, task.name);
      task.name = newNameTask;
    }
  };

  const handleRateKeyDown = (e, task) => {
    if (e.key === "Enter") {
      changeRateTaskGroup(task.id);
      task.rate = newRateTask;
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer 
      sx={{ width: '100%', height: 320}}
      component={Paper} style={{borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px",minHeight:"300px",backgroundColor:"var(--body_background)",border:"1px solid #007a87", borderBottom:"none"}}>
        <Table stickyHeader>
          <TableHead >
            <TableRow>
              <TableCell style={{color:"white",backgroundColor:"#007a87"}}>Tarea</TableCell>
              <TableCell style={{color:"white",backgroundColor:"#007a87"}}>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  {editingTaskId === task.id ? (
                    <>
                      <TextField
                        value={newNameTask}
                        onChange={(e) => {
                          setNewNameTask(e.target.value);
                          setTaskName(task.name);
                        }}
                        onKeyDown={(e) => handleNameKeyDown(e, task)}
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
                        }}          
                      />
                      <IconButton style={{color:"var(--body_textColor)"}} onClick={() => changeNameTask(task.id, task.name)}>
                        <EditIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <span style={{color:"var(--body_textColor)"}}>{task.name}</span>
                      <IconButton style={{color:"var(--body_textColor)"}} onClick={() => setEditingTaskId(task.id)}>
                        <EditIcon />
                      </IconButton>

                    </>
                  )}
                </TableCell>
                <TableCell>
                  {editingRateId === task.id ? (
                    <>
                      <TextField

                        value={newRateTask}
                        onChange={(e) => {
                          setNewRateTask(e.target.value);
                          setTaskName(task.name);
                          setTaskRate(task.rate);
                        }}
                        onKeyDown={(e) => handleRateKeyDown(e, task)}
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
                        }}          
                      />
                      <IconButton style={{color:"var(--body_textColor)"}} onClick={() => changeRateTaskGroup(task.id)}>
                        <EditIcon />
                      </IconButton>
                    </>
                  ) : (
                    <div style={{width:"100%",display:"flex",alignItems:"center"}}>
                      <span style={{color:"var(--body_textColor)"}}>{task.rate}</span>
                      <IconButton onClick={() => setEditingRateId(task.id)}>
                        <EditIcon style={{color:"var(--body_textColor)"}} />
                      </IconButton>
                      <IconButton onClick={() => deleteTask(task.id, task.name)}>
                        <DeleteIcon style={{color:"var(--body_textColor)"}} />
                      </IconButton>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
      style={{ borderBottomLeftRadius:"3px",borderBottomRightRadius:"3px", backgroundColor: 'var(--body_background)',border:"1px solid #007a87",borderTop:"none"}}
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        sx={{
          width:"100%",
          color: 'var(--body_textColor)',
        }}
      />
    </>
  );
};

export default TasksTable;
