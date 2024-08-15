import './login.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Title from '../UI/Title/Title';
import { useAuth } from '../../Context/useAuth';
import { FieldValues, useForm } from 'react-hook-form';


const Login = () => {
    const { loginUser } = useAuth();
    const { handleSubmit, register } = useForm();
    const submit = (dates: FieldValues) => loginUser(dates)
    return (
        <form className='login-container' onSubmit={handleSubmit(submit)}>
            <Title title='SIGN IN:' type={['padding-left']} />
            <Input
                id='email'
                register={register}
                options={{ required: true }}
                type='text'
                placeholder='ENTER E-MAIL'
                autoComplete='off'
            />
            <Input
                id='password'
                register={register}
                options={{ required: true }}
                type='password'
                placeholder='ENTER PASSWORD'
                autoComplete='off'
            />
            <Button text='LOGIN' />
        </form>
    )
};

export default Login;
