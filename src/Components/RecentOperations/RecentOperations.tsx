import './recentOperations.css';
import Button from '../UI/Button/Button';
import Title from '../UI/Title/Title';
import { useOperation } from '../../Context/useOperation';
import TransactionsList from '../UI/TransactionsList/TransactionsList';

const RecentOperations = () => {
    const { handleOperation, isAddingOperation } = useOperation();
    return (
        <div className="recent-operations-container">
            <Title title='RECENT OPERATIONS:' type={['first-letter', 'padding-left']} />
            <TransactionsList limit={3} />
            <Button text='+ Add Operation' styles={['green']} disabled={isAddingOperation} onClick={handleOperation} />
        </div>
    )
};

export default RecentOperations;
