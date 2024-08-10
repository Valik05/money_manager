import './recentOperations.css';
import Button from '../UI/Button/Button';
import Title from '../UI/Title/Title';
import TransactionItem from '../UI/TransactionItem/TransactionItem';
import { useOperation } from '../../Context/useOperation';

const RecentOperations = () => {
    const { handleOperation, isAddingOperation, operations } = useOperation();
    return (
        <div className="recent-operations-container">
            <Title title='RECENT OPERATIONS:' type={['first-letter', 'padding-left']} />
            <ul className="recent-operations">
                {operations.slice(0, 3).map(({ amount, owner: { currency: { name } }, description, created_at }, index) => {
                    return <TransactionItem amount={amount} currency={name} description={description} date={created_at} key={index} />
                })}
            </ul>
            <Button text='+ Add Operation' styles={['green']} disabled={isAddingOperation} onClick={handleOperation} />
        </div>
    )
};

export default RecentOperations;
