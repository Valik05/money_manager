import './settings.css';
import List from '../UI/List/List';
import Title from '../UI/Title/Title';
import SettingItem from '../UI/SettingItem/SettingItem';
import Input from '../UI/Input/Input';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Context/useAuth';
import { useSettings } from '../../Context/useSettings';
import { useSystemMsg } from '../../Context/useSystemMsg';
import { useDebouncedCallback } from 'use-debounce';
import { handleArrowsBlock, handlePaste, validationInstructionsForNumber } from '../../helpers/InputHelper';

const Settings = () => {
    const { register, getValues, formState: { errors } } = useForm({ mode: 'onChange' });
    const { user } = useAuth();
    const { showSystemMsg } = useSystemMsg();
    const { currencyList, updateCurrency, updateDailyAmount } = useSettings();
    const changeDailyAmount = useDebouncedCallback(() => {
        if (Object.values(errors).length !== 0) {
            for (const value of Object.values(errors)) {
                if (value?.message !== '' && value?.message) showSystemMsg({ type: 'error', text: value.message as string })
            }
            return
        }
        updateDailyAmount({ daily_amount: getValues('daily_amount') })
    }, 1000)
    return (
        <div className='settings-container'>
            <Title title='Settings' type={['padding-left']} />
            <SettingItem name={'Daily Amount'} Value=
                {
                    <Input
                        id="daily_amount"
                        type='number'
                        onKeyDown={handleArrowsBlock}
                        onPaste={(e) => handlePaste(e, showSystemMsg)}
                        register={register}
                        placeholder={user?.daily_amount || '0'}
                        options={{
                            valueAsNumber: true,
                            onChange: changeDailyAmount,
                            validate: validationInstructionsForNumber
                        }}
                        styles={['text-center', 'no-border', 'pseudo-borders']}
                    />
                } />
            <SettingItem name={'Base currency'} Value={<List items={currencyList} type={'type-1'} callback={(currency: number) => updateCurrency({ currency })} />} />
        </div>
    )
};

export default Settings;
