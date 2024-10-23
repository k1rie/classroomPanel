import React from 'react';
import styles from './styles/LandingPage.module.css'; 
import { Link } from 'react-router-dom';
import Img1 from "./assets/img1.png"
import Img2 from "./assets/img2.png"
import Img3 from "./assets/img3.png"


const LandingPage = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Navbar */}

      {/* Hero Section */}
      <header className={styles.heroSection}>
        <h1 className={styles.title}>Bienvenido a SmartClass</h1>
        <p className={styles.subtitle}>La solución definitiva para la gestión de grupos, alumnos y tareas en tiempo real</p>
        <Link to="/dashboard"><button className={styles.ctaButton}>Descubre más</button></Link>
      </header>

      {/* Sección de contenido */}
      <section className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>Gestiona tus clases de manera eficiente</h2>
        <p className={styles.sectionText}>
          SmartClass te ofrece todas las herramientas que necesitas para administrar grupos de estudiantes, gestionar tareas, 
          y hacer pase de lista con tecnología QR. Con una interfaz intuitiva y un sistema eficiente, ahorrarás tiempo y 
          optimizarás la organización en el aula.
        </p>
      </section>

      {/* Sección de funcionalidades */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Funcionalidades destacadas</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <img src={Img1} alt="Administración de Grupos" className={styles.featureImage}/>
            <h3>Administración de Grupos</h3>
            <p>Administra tus grupos de manera simple y eficiente. Asigna alumnos a clases, organiza horarios, y controla todo en un solo lugar.</p>
          </div>
          <div className={styles.featureItem}>
            <img src={Img2} alt="Pase de lista con QR" className={styles.featureImage}/>
            <h3>Pase de Lista con QR</h3>
            <p>Olvídate del pase de lista manual. Con SmartClass, escanea un código QR y lleva el control de asistencia al instante.</p>
          </div>
          <div className={styles.featureItem}>
            <img src={Img3} alt="Gestión de Tareas" className={styles.featureImage}/>
            <h3>Gestión de Tareas</h3>
            <p>Asigna, revisa y evalúa.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 SmartClass. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
