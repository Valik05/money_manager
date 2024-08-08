import './settingItem.css';

type Props = {
    name: string,
    Value: React.ReactElement
}

const SettingItem = ({ name, Value }: Props) => {
    return (
        <div className='setting-item-container'>
            <div className="name">{name}</div>
            {Value}
        </div>
    )
};

export default SettingItem;
