import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import HomeStyles from './styles/home.module.css';
import NavBar from './components/Navbar';
import GroupCard from './components/GroupCard';
import Form from './components/Form.jsx';
import LoginForm from './components/LoginForm.jsx';
import Logo from "./assets/logo.svg"

// Importa los componentes y estilos de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { BASE_API_URL } from './api/index.js';


function App() {
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState();

  async function getGroups() {
    const credentials = btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);
    await fetch(`${BASE_API_URL}/getClassrooms`, {
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((data) => {
     if(data.length > 0){
      console.log(data)
      setGroups(data);
     }else{
      setGroups([])
     }
      });
  }

  function addForm(form) {
    setForm(form);
  }

  function showCreateGroupForm() {
    form.style.display = 'flex';
  }

  function addGroup(group) {
    setGroups([
      ...groups,
      {
        grado: group.grado,
        grupo: group.grupo,
        especialidad: group.especialidad,
        alumnos: 0,
        id: group.idGroup,
      },
    ]);
  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className={HomeStyles.container}>
      {localStorage.getItem('email') ? console.log('n') : <LoginForm />}
      <Form
        target="groups"
        input1Type="number"
        input1="Grado"
        input2="Grupo"
        input3="Nombre del Curso"
        addGroup={addGroup}
        addForm={addForm}
      />
      <NavBar />
      <div className={HomeStyles.homeContainer}>
     <div className={HomeStyles.titleContainer}>
     <h1>SmartClass</h1>
      </div>
        <div className={HomeStyles.groupsContainer}>
          <p className={HomeStyles.groupsTittle}>Grupos</p>
          <div className={HomeStyles.groupsCardsContainer}>
            <button className={HomeStyles.groupsCreate} onClick={showCreateGroupForm}>
              Crear Grupo
            </button>
            
            <Swiper
              modules={[Navigation]} // Incluye el módulo de navegación si lo deseas
              navigation // Habilita la navegación
              spaceBetween={50}
              slidesPerView={3}
              breakpoints={{
                // Cuando el ancho de la pantalla sea menor o igual a 600px
                0: {
                  slidesPerView: 1, // Mostrar 1 tarjeta
                  spaceBetween: 10,
                },
                // Cuando el ancho de la pantalla sea mayor a 600px
                601: {
                  slidesPerView: 3, // Mostrar 3 tarjetas
                  spaceBetween: 30,
                },
              }}
            >
              {groups.map((e) => (
                <SwiperSlide key={e.id}>
                  <GroupCard
                    link={`/group/${e.id}`}
                    info="Alumnos"
                    students={e.alumnos}
                    area={e.especialidad}
                    grade={e.grado}
                    group={e.grupo}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
