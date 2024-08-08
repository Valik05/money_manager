import './profile.css';
import Title from '../UI/Title/Title';
import AddOperation from '../AddOperation/AddOperation';
import RecentOperations from '../RecentOperations/RecentOperations';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useOperation } from '../../Context/useOperation';

const Profile = () => {
    const { isAddingOperation } = useOperation();
    return (
        <div className='profile-container'>
            <Title title='YOU CAN SPEND TODAY:' type={['first-letter', 'padding-left']} />
            <div className="money">0<span>USD</span></div>
            <SwitchTransition mode='out-in'>
                <CSSTransition key={+isAddingOperation} timeout={500} classNames={'transition-add-operation-switch'}>
                    {isAddingOperation ? <AddOperation /> : <RecentOperations />}
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
};

export default Profile;
