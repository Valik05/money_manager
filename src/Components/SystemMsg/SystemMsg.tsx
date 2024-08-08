import './systemMsg.css';
import MsgItem from '../UI/MsgItem/MsgItem';
import { useSystemMsg } from '../../Context/useSystemMsg';

const SystemMsg = () => {
    const { messages } = useSystemMsg();
    return (
        <ul className="system-msg-container">
            {
                messages.map(({ id, type, text }, index) => {
                    return <MsgItem id={id} type={type} text={text} index={index} key={index} />
                })
            }
        </ul>
    )
};

export default SystemMsg;
