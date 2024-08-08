import './transactionItem.css';

type Props = {
    amount: number,
    currency: string,
    description: string
}

const TransactionItem = ({ amount, currency, description }: Props) => {
    return (
        <li className='transaction-item'>
            <div className="amount">{amount} <span>{currency}</span></div>
            <div className="description">{description}</div>
            <div className="icon">↓</div>
        </li>
    )
};

export default TransactionItem;
