import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { Applications } from "@/components/Account";
import styles from "./ApplicationsLayout.module.scss";

export function Navigation() {
  return (
    <>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink
              to="/me/applications/all"
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
        <Route
          path="/me/applications/all"
          element={<Applications.RequestList />}
        />
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

// import styles from "./ApplicationsLayout.module.scss";
// import classNames from "classnames";
// import { useRouter } from "next/router";
// import Link from "next/link";

// export function Navigation() {
//   const router = useRouter();

//   return (
//     <nav className={styles.navigation}>
//       <ul>
//         {/* todas */}
//         <li
//           className={classNames({
//             [styles.active]: router.pathname === "/me/applications",
//           })}
//         >
//           <Link href="/me/applications">Todas</Link>
//         </li>
//         {/* prestamos */}
//         <li
//           className={classNames({
//             [styles.active]: router.pathname === "/me/applications/loans",
//           })}
//         >
//           <Link href="/me/applications/loans">Préstamos</Link>
//         </li>
//         {/* cambios de aportes */}
//         <li
//           className={classNames({
//             [styles.active]:
//               router.pathname === "/me/applications/contributions",
//           })}
//         >
//           <Link href="/me/applications/contributions">Cambios de Aportes</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }
