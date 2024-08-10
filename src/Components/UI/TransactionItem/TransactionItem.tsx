import { useDebouncedCallback } from 'use-debounce';
import './transactionItem.css';
import { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import classNames from 'classnames';
import DetailItem from '../DetailItem/DetailItem';

type Props = {
    amount: string,
    currency: string,
    description: string,
    date: string
}

const TransactionItem = ({ amount, currency, description, date }: Props) => {
    const [showDetails, setShowDetails] = useState(0);
    const throttledDetails = useDebounce(showDetails, 500);
    return (
        <li className='transaction-item' style={{ "maxHeight": showDetails === 1 ? "263.8px" : "55px" }}>
            <table>
                <tbody>
                    <tr className="short-info" onClick={useDebouncedCallback(() => setShowDetails(+!showDetails), 200)}>
                        <td rowSpan={5} className="detail-text-box">
                            <div className={classNames('text', { active: throttledDetails === 1 })}>Detail</div>
                            <hr className={classNames({ active: throttledDetails === 1 })} />
                        </td>
                        <td className="amount">{+amount} <span>{currency}</span></td>
                        <td className="description">{description}</td>
                        <td className={classNames("icon", { active: showDetails === 1 })}>↓</td>
                    </tr>
                    <DetailItem name="Amount" value={+amount} isAnimation={throttledDetails} />
                    <DetailItem name="Creation date" value={new Date(date).toLocaleDateString()} isAnimation={throttledDetails} />
                    <DetailItem name="Description" value={description} isAnimation={throttledDetails} />
                    <DetailItem name="Currency" value={currency} isAnimation={throttledDetails} />
                </tbody>
            </table>
        </li>
    )
};

export default TransactionItem;
