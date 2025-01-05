import React, { useEffect, useState } from 'react';
import styles from "./MainPage.module.css";
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
    return (
        <div className={styles.mainPage}>
            <h1 className={styles.appName}>LUNIKSSS</h1>
            <div className={styles.appOptions}>
                <Link to="/editor">New Presentation</Link>
                <Link to="/editor">Your Last Presentation</Link>
            </div>
            <a className={styles.creatorsLinks} href='https://t.me/+qoBhIkbS_YQ0YjYy'>telegram channel</a>
        </div>
    );
};

export default MainPage;
