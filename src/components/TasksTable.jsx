import React, { useState } from 'react';
import editSvg from "../assets/pen-svgrepo-com (1).svg"; // Icono de editar
import trashSvg from "../assets/trash-bin-trash-svgrepo-com.svg"; // Icono de eliminar
import styles from '../styles/TasksTable.module.css'; // Importa los estilos como CSS Modules
import { useNavigate } from 'react-router-dom';

const TasksTable = ({ data, grade, group, area, students }) => {
  const [newNameTask, setNewNameTask] = useState('');
  const [newRateTask, setNewRateTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null); // Controla la edición de tareas
  const [editingRateId, setEditingRateId] = useState(null); // Controla la edición del rate
  const navigate = useNavigate()

  // Función para cambiar el nombre de la tarea
  const changeNameTask = async (id, oldName) => {
    await fetch("https://tasksflow-backend.onrender.com/changeNameTask", {
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

    setEditingTaskId(null); // Ocultar el input después de guardar, pero sin actualizar el estado visual
  };

  // Función para cambiar el rate de la tarea
  const changeRateTaskGroup = async (id, oldRate) => {
    await fetch("https://tasksflow-backend.onrender.com/changeRateTaskGroup", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grade,
        group,
        area,
        alumnosTask: students,
        newRate: newRateTask,
        nameTask: oldRate,
        idTask: id,
        emailUser: localStorage.getItem("email"),
        password: localStorage.getItem("password")
      })
    });

    setEditingRateId(null); // Ocultar el input después de guardar, pero sin actualizar el estado visual
  };

  // Función para eliminar una tarea
  const deleteTask = async (id, taskName) => {
    await fetch("https://tasksflow-backend.onrender.com/deleteTask", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        alumnosTask: students,
        id,
        nameTask: taskName,
        grade,
        group,
        area,
        emailUser: localStorage.getItem("email"),
        password: localStorage.getItem("password")
      })
    });
    navigate(0)
    // No actualiza el estado visual, por lo que la tarea aún aparecerá en la tabla hasta que se recargue la página.
  };

  // Función para manejar el evento "Enter" en el campo de nombre de la tarea
  const handleNameKeyDown = (e, task) => {
    if (e.key === "Enter") {
      changeNameTask(task.id, task.name); // Llama a la función de guardar cuando se presiona Enter
      task.name = newNameTask// Llama a la función de guardar cuando se presiona Enter
    }
  };

  // Función para manejar el evento "Enter" en el campo de rate de la tarea
  const handleRateKeyDown = (e, task) => {
    if (e.key === "Enter") {
      changeRateTaskGroup(task.id, task.rate);
      task.rate = newRateTask // Llama a la función de guardar cuando se presiona Enter
    }
  };

  return (
    <div className={styles['table-container']}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Tarea</th>
            <th className={styles.th}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task) => (
            <tr key={task.id} className={styles.tr}>
              {/* Columna del nombre de la tarea */}
              <td className={styles.td}>
                {editingTaskId === task.id ? (
                  <>
                    <input
                      value={newNameTask}
                      onChange={(e) => setNewNameTask(e.target.value)}
                      onKeyDown={(e) => handleNameKeyDown(e, task)} // Detecta "Enter"
                      className={styles.input}
                    />
                    <button
                      onClick={() => changeNameTask(task.id, task.name)}
                      className={styles['icon-button']}
                    >
                      
                    </button>
                  </>
                ) : (
                  <>
                    <span>{task.name}</span>
                    <button
                      onClick={() => setEditingTaskId(task.id)}
                      className={styles['icon-button']}
                    >
                      <img src={editSvg} alt="Edit" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id, task.name)}
                      className={styles['icon-button']}
                    >
                    </button>
                  </>
                )}
              </td>

              {/* Columna del valor (rate) */}
              <td className={styles.td}>
                {editingRateId === task.id ? (
                  <>
                    <input
                      value={newRateTask}
                      onChange={(e) => setNewRateTask(e.target.value)}
                      onKeyDown={(e) => handleRateKeyDown(e, task)} // Detecta "Enter"
                      className={styles.input}
                    />
                    <button
                      onClick={() => changeRateTaskGroup(task.id, task.rate)}
                      className={styles['icon-button']}
                    >
                      
                    </button>
                  </>
                ) : (
                  <>
                    <span>{task.rate}</span>
                    <button
                      onClick={() => setEditingRateId(task.id)}
                      className={styles['icon-button']}
                    >
                      <img src={editSvg} alt="Edit" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id, task.name)}
                      className={styles['icon-button']}
                    >
                      <img src={trashSvg} alt="Delete" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
