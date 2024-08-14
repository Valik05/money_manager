import './transactionsList.css';
import { useOperation } from '../../../Context/useOperation';
import TransactionItem from '../TransactionItem/TransactionItem';

type Props = {
    limit?: number
}

const TransactionsList = ({ limit }: Props) => {
    const { operations } = useOperation();
    return (
        <ul className="transactions-list">
            {operations.slice(0, limit || operations.length).map(({ amount, owner: { currency: { name } }, description, created_at }, index) => {
                return <TransactionItem amount={amount} currency={name} description={description} date={created_at} key={index} />
            })}
        </ul>
    )
};

export default TransactionsList;
