import React from "react";
import styles from "./sideBar.module.css";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>Admin</h2>
      <ul className={styles.sidebarList}>
        <li className={styles.sidebarItem} onClick={() => setActivePage("dashboard")}>
          Dashboard
        </li>
        <li className={styles.sidebarItem} onClick={() => setActivePage("orders")}>
          Orders
        </li>
        <li className={styles.sidebarItem} onClick={() => setActivePage("menu")}>
          Menu
        </li>
        <li className={styles.sidebarItem} onClick={() => setActivePage("customers")}>
          Customers
        </li>
        <li className={styles.sidebarItem} onClick={() => setActivePage("reviews")}>
          Reviews
        </li>
        {/* <li className={styles.sidebarItem} onClick={() => setActivePage("settings")}>
          Settings
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
