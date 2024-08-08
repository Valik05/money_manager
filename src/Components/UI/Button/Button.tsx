import './button.css';
import classNames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    styles?: string[],
    // register: UseFormRegister<FieldValues>,
    // options?: RegisterOptions,
}

const Button = ({ text, styles, ...buttonProps }: Props) => {
    return (
        <button className={classNames('btn', styles)} {...buttonProps}>
            <div className="text">{text}</div>
        </button>
    )

};

export default Button;
