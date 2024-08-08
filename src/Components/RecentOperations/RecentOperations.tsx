import './recentOperations.css';
import Button from '../UI/Button/Button';
import Title from '../UI/Title/Title';
import TransactionItem from '../UI/TransactionItem/TransactionItem';
import { useOperation } from '../../Context/useOperation';

const RecentOperations = () => {
    const transactions = [
        { amount: 15, currency: 'USD', description: 'DISCORD NITRO PAYMENT' },
        { amount: 5, currency: 'USD', description: 'DISCORD NITRO PAYMENT' },
        { amount: 5, currency: 'USD', description: 'DISCORD NITRO PAYMENT' }
    ]
    const { handleOperation } = useOperation();
    return (
        <div className="recent-operations-container">
            <Title title='RECENT OPERATIONS:' type={['first-letter', 'padding-left']} />
            <ul className="recent-operations">
                {transactions.map(({ amount, currency, description }, index) => {
                    return <TransactionItem amount={amount} currency={currency} description={description} key={index} />
                })}
            </ul>
            <Button text='+ Add Operation' styles={['green']} onClick={handleOperation} />
        </div>
    )
};

export default RecentOperations;
