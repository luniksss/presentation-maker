import { useState } from 'react'
import { Button } from '../button/Button'
import { useTranslation } from 'react-i18next'
import styles from "./Translation.module.css"

const Translation: React.FC = () => {
    const { t, i18n } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false)

        if (lng === 'ar') {
            document.body.setAttribute('dir', 'rtl')
        } else {
            document.body.setAttribute('dir', 'ltr')
        }
    };

    return (
        <div className={styles.languagesBlock}>
            <Button className="button" text={t('changeLanguage')} onClick={toggleDropdown}></Button>
            {isOpen && (
                <div className={styles.languagesList}>
                    <Button className="button" text="English" onClick={() => changeLanguage('en')} />
                    <Button className="button" text="Русский" onClick={() => changeLanguage('ru')} />
                    <Button className="button" text="العربية" onClick={() => changeLanguage('ar')} />
                    <Button className="button" text="中国人" onClick={() => changeLanguage('ch')} />
                </div>
            )}
        </div>
    )
}

export default Translation
