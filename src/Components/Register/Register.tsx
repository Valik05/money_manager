import './register.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Title from '../UI/Title/Title';
import { useAuth } from '../../Context/useAuth';
import { FieldValues, useForm } from 'react-hook-form';
import { emailRegExp } from '../../consts/RegExps';
import { useSystemMsg } from '../../Context/useSystemMsg';

const Register = () => {
    const { registerUser } = useAuth();
    const { showSystemMsg } = useSystemMsg();
    const { handleSubmit, register, formState: { errors } } = useForm({ mode: "onChange" });
    const checkFields = () => {
        for (const value of Object.values(errors)) {
            if (value?.message !== '' && value?.message) showSystemMsg({ type: 'error', text: value.message as string })
        }
    }
    const submit = (dates: FieldValues) => registerUser(dates)
    return (
        <form className="register-container" onSubmit={handleSubmit(submit)}>
            <Title title='SIGN UP:' type={['padding-left']} />
            <Input
                id="email"
                register={register}
                options={{ required: true, pattern: { value: emailRegExp, message: "Email is not valid" } }}
                type='text'
                placeholder='ENTER E-MAIL'
                autoComplete='off'
            />
            <Input
                id="password"
                register={register}
                options={
                    {
                        required: true,
                        minLength: { value: 8, message: "Password length should be at least 8 characters" },
                        validate: {
                            validateNumber: str => /[0-9]/.test(str) || "Password must contain at least 1 number",
                            validateUpperCase: str => /[A-Z]/.test(str) || "Password must contain at least 1 upper letter",
                            validateLowerCase: str => /[a-z]/.test(str) || "Password must contain at least 1 lower letter",
                            validateSpecialCharacter: str => /[!@#$%^&*(),.?":{}|<>_]/.test(str) || "Password must contain at least one special character",
                            validateEmailDifference: (str, val) => str !== val.email || "Password must not be the same as email",
                        },
                    }}
                type='password'
                placeholder='ENTER PASSWORD'
                autoComplete='off'
            />
            <Input
                id="repeat_password"
                register={register}
                options={{ required: true, validate: (str, val) => str === val.password || "Passwords aren't the same" }}
                type='password'
                placeholder='RETYPE PASSWORD'
                autoComplete='off'
            />
            <Button text='SIGN UP' onClick={checkFields} />
        </form>
    )
};

export default Register;
