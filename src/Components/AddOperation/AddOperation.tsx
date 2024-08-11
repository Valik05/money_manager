import './addOperation.css';
import Input from '../UI/Input/Input';
import Title from '../UI/Title/Title';
import Button from '../UI/Button/Button';
import { FieldValues, useForm } from 'react-hook-form';
import { useOperation } from '../../Context/useOperation';
import { useSystemMsg } from '../../Context/useSystemMsg';
import { handleArrowsBlock, handlePaste, validationInstructionsForNumber } from '../../helpers/InputHelper';

const AddOperation = () => {
    const { showSystemMsg } = useSystemMsg();
    const { handleOperation, createOperation, isAddingOperation } = useOperation();
    const { handleSubmit, register, formState: { errors } } = useForm({ mode: 'onChange' });
    const checkFields = () => {
        for (const value of Object.values(errors)) {
            if (value?.message !== '' && value?.message) showSystemMsg({ type: 'error', text: value.message as string })
        }
    }
    const submit = (dates: FieldValues) => createOperation(dates)
    return (
        <form className='add-operation-container' onSubmit={handleSubmit(submit)}>
            <Title title="Adding Operations:" type={['first-letter', 'padding-left']} />
            <Input
                id='description'
                register={register}
                options={{ required: true }}
                type='text'
                placeholder='Enter Name'
                autoComplete='off'
            />
            <Input
                id='amount'
                register={register}
                onKeyDown={handleArrowsBlock}
                onPaste={(e) => handlePaste(e, showSystemMsg)}
                options={{
                    required: true,
                    valueAsNumber: true,
                    validate: validationInstructionsForNumber
                }}
                type='number'
                placeholder='Enter Amount'
                autoComplete='off'
            />
            <Button text='Add' styles={['green']} type='submit' onClick={checkFields} />
            <Button text='Cancel' styles={['red']} disabled={!isAddingOperation} onClick={handleOperation} />
        </form>
    )
};

export default AddOperation;
