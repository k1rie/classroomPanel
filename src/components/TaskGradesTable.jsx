import React, { useState, useEffect } from 'react';
import styles from '../styles/TaskGradesTable.module.css'; // Importar CSS Modules
import { useNavigate } from 'react-router-dom';

const TaskGradesTable = ({ tasksData = [], studentId }) => {
  const [tasks, setTasks] = useState(tasksData); // Asegurarse de que tasksData tiene un array
  const [percentage, setPercentage] = useState(0); // Maneja el porcentaje
  const [taskName, setTaskName] = useState(''); // Para manejar el nombre de la tarea
  const navigate = useNavigate();

  // Asegurarnos de que los datos se muestren al montar el componente
  useEffect(() => {
    setTasks(tasksData);
  }, [tasksData]);

  // Función para manejar el cambio en el input del porcentaje
  const handlePercentageChange = (eListener, task) => {
    setTaskName(task.name); // Actualiza el nombre de la tarea actual
    setPercentage(eListener.target.value); // Almacena el porcentaje ingresado
  };

  // Función para enviar el porcentaje al servidor
  const changeFinalRate = async (task) => {
    await fetch(`https://tasksflow-backend.onrender.com/changeRateTask`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        newRate: (Number(percentage)*task.rate)/100, // Pasar solo el porcentaje
        idStudent: Number(studentId),
        taskName: taskName,
        emailUser: localStorage.getItem("email"),
        password: localStorage.getItem("password")
      })
    });

    console.log(`Porcentaje para ${taskName}: ${percentage}`);
    navigate(0); // Recargar la página después de actualizar
  };

  return (
    <div className={styles['table-container']}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Tarea</th>
            <th className={styles.th}>Valor</th>
            <th className={styles.th}>Porcentaje</th>
            <th className={styles.th}>Calificación Final</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.rate}</td>
                <td>
                  <input
                    type="number"
                    className={styles.input}
                    placeholder="Porcentaje"
                    onChange={(e) => handlePercentageChange(e, task)}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        changeFinalRate(task); // Enviar el porcentaje al backend cuando se presione Enter
                      }
                    }}
                  />
                </td>
                <td>{task.final_rate !== null ? task.final_rate : 'No asignado'}</td> {/* Mostrar final_rate o un mensaje si es null */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay tareas disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskGradesTable;
