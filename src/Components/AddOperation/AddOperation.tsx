import './addOperation.css';
import Input from '../UI/Input/Input';
import Title from '../UI/Title/Title';
import Button from '../UI/Button/Button';
import { KeyDown, Paste } from '../../Models/Input';
import { FieldValues, useForm } from 'react-hook-form';
import { useOperation } from '../../Context/useOperation';
import { useSystemMsg } from '../../Context/useSystemMsg';

const AddOperation = () => {
    const { showSystemMsg } = useSystemMsg();
    const { handleOperation, createOperation, isAddingOperation } = useOperation();
    const { handleSubmit, register, formState: { errors } } = useForm({ mode: 'onChange' });
    const checkFields = () => {
        for (const value of Object.values(errors)) {
            if (value?.message !== '' && value?.message) showSystemMsg({ type: 'error', text: value.message as string })
        }
    }
    const handlePaste = (e: Paste) => {
        if (e.currentTarget.attributes[0]?.nodeValue) {
            if (/[+\-eE]/.test(e?.clipboardData?.getData('Text'))) {
                showSystemMsg({ type: 'error', text: 'Pasted content contain invalid symbols' })
                e.preventDefault()
            }
        }
    }
    const handleArrowsBlock = (e: KeyDown) => {
        console.log(errors);
        if (e.key === "Backspace" || e.key === "Delete" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === 'Enter') return;
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || /[+\-eE]/.test(e.key)) e.preventDefault()
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
                onPaste={handlePaste}
                options={{
                    required: true,
                    valueAsNumber: true,
                    validate: {
                        validateLength: str => str.toString().length <= 16 || "The amount has 16 digits limit(",
                        validateAmount: str => str > 0 || "Amount must be higher than 0",
                    }
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
