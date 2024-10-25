import React from 'react';
import { Button } from '../button/Button';
import styles from '../button/Button.module.css';

const Theme: React.FC = () => {
    const toggleTheme = () => {
        const currentTheme = document.body.getAttribute('data-theme');
        document.body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    };

    return (
            <Button className={styles.button} text={'Change Theme'} onClick={toggleTheme}></Button>
    );
};

export default Theme;