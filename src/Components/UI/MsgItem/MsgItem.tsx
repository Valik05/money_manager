import './msgItem.css';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useSystemMsg } from '../../../Context/useSystemMsg';

type Props = {
    id: number,
    text: string,
    type: string,
    index: number
}

const MsgItem = ({ id, text, type, index }: Props) => {
    const { removeMsg } = useSystemMsg();
    const [isDelayed, setIsDelayed] = useState(0);
    useEffect(() => {
        setTimeout(() => { setIsDelayed(1) }, index * 100)
        setTimeout(() => { setIsDelayed(0) }, 2000 - (index * 100))
        setTimeout(() => { removeMsg(id) }, 2300)
    }, [])
    return (
        <SwitchTransition mode="out-in">
            <CSSTransition key={isDelayed} timeout={300} classNames="transition-system-msg">
                {isDelayed === 1 ?
                    <li className={classNames('system-msg-content', type)}>
                        <aside className="icon"></aside>
                        <article className="text">{text}</article>
                    </li>
                    : <></>}
            </CSSTransition>
        </SwitchTransition>
    )
};

export default MsgItem;
