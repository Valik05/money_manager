import './operations.css';
import Title from '../UI/Title/Title';
import TransactionItem from '../UI/TransactionItem/TransactionItem';
import { useOperation } from '../../Context/useOperation';

const Operations = () => {
    const { operations } = useOperation();
    return (
        <div className='operations-container'>
            <Title title='Operations List' type={['padding-left']} />
            <ul className="operations-list">
                {operations.map(({ amount, owner: { currency: { name } }, description, created_at }, index) => {
                    return <TransactionItem amount={amount} currency={name} description={description} date={created_at} key={index} />
                })}
            </ul>
        </div>
    )
};

export default Operations;
