import './input.css';
import classNames from 'classnames';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    isError?: boolean,
    id: string,
    register: UseFormRegister<FieldValues>,
    options?: RegisterOptions,
}

const Input = ({ isError = false, id, register, options, ...inputProps }: Props) => {
    return (
        <input
            id={id}
            className={classNames('input-content', { error: isError })}
            {...register(id, options)}
            {...inputProps}
        />
    )
};

export default Input;
