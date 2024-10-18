import React, { useRef, useState } from 'react';
import editSvg from "../assets/pen-svgrepo-com (1).svg"; // Icono de editar
import trashSvg from "../assets/trash-bin-trash-svgrepo-com.svg"; // Icono de eliminar
import styles from '../styles/TasksTable.module.css'; // Importa los estilos como CSS Modules

const TasksTable = ({ data, grade, group, area, students }) => {
  const [newNameTask, setNewNameTask] = useState('');
  const [newRateTask, setNewRateTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null); // Controla la edición de tareas
  const [editingRateId, setEditingRateId] = useState(null); // Controla la edición del rate

  // Funciones para editar y eliminar
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
    setEditingTaskId(null); // Ocultar el input después de guardar
  };

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
    setEditingRateId(null); // Ocultar el input después de guardar
  };

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
    // Lógica para eliminar la tarea de la tabla (opcional)
  };

  return (
    <div className={styles['table-container']}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Tarea</th>
            <th className={styles.th}>Valor</th>
            <th className={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task) => (
            <tr key={task.id} className={styles.tr}>
              {/* Columna del nombre de la tarea */}
              <td className={styles.td}>
                {editingTaskId === task.id ? (
                  <input
                    value={newNameTask}
                    onChange={(e) => setNewNameTask(e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  <span>{task.name}</span>
                )}
              </td>

              {/* Columna del valor (rate) */}
              <td className={styles.td}>
                {editingRateId === task.id ? (
                  <input
                    value={newRateTask}
                    onChange={(e) => setNewRateTask(e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  <span>{task.rate}</span>
                )}
              </td>

              {/* Columna de acciones */}
              <td className={styles.td}>
                <button
                  onClick={() =>
                    editingTaskId === task.id
                      ? changeNameTask(task.id, task.name)
                      : setEditingTaskId(task.id)
                  }
                  className={styles['icon-button']}
                >
                  {editingTaskId === task.id ? 'Guardar' : <img src={editSvg} alt="Edit" />}
                </button>

                <button
                  onClick={() =>
                    editingRateId === task.id
                      ? changeRateTaskGroup(task.id, task.rate)
                      : setEditingRateId(task.id)
                  }
                  className={styles['icon-button']}
                >
                  {editingRateId === task.id ? 'Guardar' : <img src={editSvg} alt="Edit" />}
                </button>

                <button
                  onClick={() => deleteTask(task.id, task.name)}
                  className={styles['icon-button']}
                >
                  <img src={trashSvg} alt="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
