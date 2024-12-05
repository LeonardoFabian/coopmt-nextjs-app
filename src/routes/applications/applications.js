import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import styles from "./applications.module.scss";
import { Applications } from "@/components/Account";

export function ApplicationsNav() {
  return (
    <>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink
              to="/me/applications"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Todas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/me/applications/loans"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Préstamos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/me/applications/contributions"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Cambios de Aportes
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/me/applications" element={<Applications.RequestList />} />
        <Route path="/me/applications/loans" element={<div>Préstamos</div>} />
        <Route
          path="/me/applications/contributions"
          element={<div>Cambios de Aportes</div>}
        />
        {/* <Route path="/*" element={<Navigate to="/me/applications" />} /> */}
      </Routes>
    </>
  );
}
