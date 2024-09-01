import './operations.css';
import Title from '../UI/Title/Title';
import { useOperation } from '../../Context/useOperation';
import TransactionsList from '../UI/TransactionsList/TransactionsList';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import AddOperation from '../AddOperation/AddOperation';
import Button from '../UI/Button/Button';

const Operations = () => {
    const { operations, isAddingOperation, handleOperation } = useOperation();
    console.log(isAddingOperation);
    return (
        <section className='operations-container'>
            <Title title='Operations List' type={['padding-left']} />
            <SwitchTransition mode='out-in'>
                <CSSTransition key={+isAddingOperation} timeout={500} classNames={'transition-add-operation-switch'}>
                    {isAddingOperation ? <AddOperation /> : <TransactionsList />}
                </CSSTransition>
            </SwitchTransition>
            <SwitchTransition mode='out-in'>
                <CSSTransition key={+isAddingOperation} timeout={200} classNames={'transition-smooth'}>
                    {operations.length === 0 && !isAddingOperation ?
                        <Button
                            onClick={handleOperation}
                            text={'+ Add Operation'}
                            styles={['red', operations.length !== 0 ? 'border-top' : '']}
                        />
                        :
                        <></>}
                </CSSTransition>
            </SwitchTransition>
        </section>
    )
};

export default Operations;
