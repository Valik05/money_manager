import './settings.css';
import List from '../UI/List/List';
import Title from '../UI/Title/Title';
import SettingItem from '../UI/SettingItem/SettingItem';

const Settings = () => {
    return (
        <div className='settings-container'>
            <Title title='Settings' type={['padding-left']} />
            <SettingItem name={'Base currency'} Value={<List items={['USD', 'EUR', 'UAH']} type={'type-1'} />} />
        </div>
    )
};

export default Settings;
