import React, { useEffect } from 'react'
import { Button } from '../button/Button'
import { useTranslation } from 'react-i18next'

const Theme: React.FC = () => {
    const { t } = useTranslation()

    const toggleTheme = () => {
        const currentTheme = document.body.getAttribute('data-theme')
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        document.body.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme)
        } else {
            document.body.setAttribute('data-theme', 'light')
        }
    }, [])

    return (
        <Button className="button" text={t('changeTheme')} onClick={toggleTheme}></Button>
    )
}

export default Theme
