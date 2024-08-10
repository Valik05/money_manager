import classNames from 'classnames';
import './detailItem.css'

type Props = {
    name: string,
    value: number | string,
    isAnimation: number
}

const DetailItem = ({ name, value, isAnimation }: Props) => {
    return (
        <tr style={{ "opacity": isAnimation }} className="detail-item">
            <td colSpan={3}>
                <div className="detail">{name}: {value}</div>
                <hr className={classNames({ active: isAnimation === 1 })} />
            </td>
        </tr>
    )
};

export default DetailItem;
