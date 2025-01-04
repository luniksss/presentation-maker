import style from './Button.module.css';

type ButtonProps = {
    text?: string,
    onClick: () => void,
    className: string,
    children?: React.ReactNode,
}

function Button({ text, onClick, className, children }: ButtonProps) {
    return (
        <div className={style.toolBarBlock}>
            <button className={style[className]} onClick={onClick}>
                {text}
            </button>
            {children}
        </div>
    );
}

export { Button };