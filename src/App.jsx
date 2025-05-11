import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddAgent from './pages/AddAgent';
import CreateSchedule from './pages/CreateSchedule';
import AddQueue from './pages/AddQueue';
import styles from './App.module.css';

const App = () => {
  return (
    <Router>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link to="/add-agent" className={styles.navLink}>
                Dodaj Pracownika
              </Link>
            </li>
            <li>
              <Link to="/add-queue" className={styles.navLink}>
              Grafik dostępności
              </Link>
            </li>
            <li>
              <Link to="/create-schedule" className={styles.navLink}>
                Stwórz Grafik
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.content}>
          <Routes>
            <Route path="/add-agent" element={<AddAgent />} />
            <Route path="/add-queue" element={<AddQueue />} />
            <Route path="/create-schedule" element={<CreateSchedule />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;