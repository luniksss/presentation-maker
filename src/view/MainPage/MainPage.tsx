import styles from "./MainPage.module.css"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const MainPage: React.FC = () => {
    const { t } = useTranslation()
    return (
        <div className={styles.mainPage}>
            <h1 className={styles.appName}>LUNIKSSS</h1>
            <div className={styles.appOptions}>
                <Link to="/editor">{t('createNewPresentation')}</Link>
                <Link to="/editor">{t('continueRecentPresentation')}</Link>
            </div>
            <a className={styles.creatorsLinks} href='https://t.me/+qoBhIkbS_YQ0YjYy'>{t('channelLink')}</a>
        </div>
    )
}

export default MainPage
