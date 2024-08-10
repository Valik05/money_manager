import { useEffect, useState } from 'react';
import './listItem.css';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import classNames from 'classnames';

type Props = {
    value: string,
    index: number,
    callback: () => void,
    open: boolean,
    length: number
}

const ListItem = ({ value, index, callback, open, length }: Props) => {
    const [isDelayed, setIsDelayed] = useState(index === 0 ? 1 : 0);
    useEffect(() => {
        if (isDelayed !== 1) setTimeout(() => { setIsDelayed(1) }, index * 200);
    }, [])
    useEffect(() => {
        if (isDelayed !== 0 && !open && length - index !== length) {
            setTimeout(() => { setIsDelayed(0) }, (length - index) * 200)
        }
    }, [open])
    return (
        <SwitchTransition mode='out-in'>
            <CSSTransition key={isDelayed} timeout={200} classNames={'transition-list-item'}>
                {
                    isDelayed === 1 ?
                        <li className={classNames('list-item-container', { 'no-border': index === 0 })}
                            style={{ "zIndex": length - index }}
                            onClick={callback}>
                            <div className="text">{value}</div>
                        </li>
                        :
                        <></>
                }
            </CSSTransition>
        </SwitchTransition>

    )
};

export default ListItem;
