import './input.css';
import classNames from 'classnames';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    isError?: boolean,
    id: string,
    register: UseFormRegister<FieldValues>,
    options?: RegisterOptions,
    styles?: string[],
}

const Input = ({ isError = false, id, register, options, styles, ...inputProps }: Props) => {
    return (
        <label className={classNames('input-content', { error: isError }, styles)} htmlFor={id}>
            <input
                id={id}
                {...register(id, options)}
                {...inputProps}
            />
        </label>
    )
};

export default Input;
