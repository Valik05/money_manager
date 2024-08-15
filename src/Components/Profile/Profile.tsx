import './profile.css';
import Title from '../UI/Title/Title';
import AddOperation from '../AddOperation/AddOperation';
import RecentOperations from '../RecentOperations/RecentOperations';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useOperation } from '../../Context/useOperation';
import { useAuth } from '../../Context/useAuth';
import classNames from 'classnames';

const Profile = () => {
    const { isAddingOperation } = useOperation();
    const { user } = useAuth();
    return (
        <section className='profile-container'>
            <Title title='YOU CAN SPEND TODAY:' type={['first-letter', 'padding-left']} />
            <div className={classNames("money", { red: Number(user?.balance) < 0 })}>{user?.balance || 0}<span>{user?.currency.name || 'USD'}</span></div>
            <SwitchTransition mode='out-in'>
                <CSSTransition key={+isAddingOperation} timeout={500} classNames={'transition-add-operation-switch'}>
                    {isAddingOperation ? <AddOperation /> : <RecentOperations />}
                </CSSTransition>
            </SwitchTransition>
        </section>
    )
};

export default Profile;
