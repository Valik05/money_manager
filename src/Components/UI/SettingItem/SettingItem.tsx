import './settingItem.css';

type Props = {
    name: string,
    Value: React.ReactElement
}

const SettingItem = ({ name, Value }: Props) => {
    return (
        <table className='setting-item-container'>
            <tr>
                <td className="name">{name}</td>
                <td className="value">{Value}</td>
            </tr>
        </table>
    )
};

export default SettingItem;
