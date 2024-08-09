import { useEffect, useRef, useState } from 'react';
import ListItem from '../ListItem/ListItem';
import './list.css';
import classNames from 'classnames';
import useOutlineClick from '../../../hooks/useOutlineClick';
import { useDebounce } from '@uidotdev/usehooks';
import { CSSTransition, SwitchTransition } from 'react-transition-group';


type Props = {
    items: string[],
    type: string,
}

const List = ({ items, type }: Props) => {
    const listRef = useRef();
    const [open, setOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(localStorage.getItem('currency') || items[0]);
    const [listOfItems, setListOfItems] = useState([currentItem]);
    const throttledListOfItems = useDebounce(listOfItems, !open ? (items.length * 200) : 200);
    useOutlineClick(listRef, () => setOpen(false), open)
    useEffect(() => {
        if (open) setListOfItems([currentItem, ...items.filter(item => item !== currentItem)])
        if (!open && listOfItems.length > 1) setListOfItems([currentItem])
    }, [open, items, currentItem, listOfItems.length])
    const changeItem = (item: string, index: number) => {
        if (index !== 0) {
            setOpen(false)
            localStorage.setItem('currency', item)
            return setCurrentItem(item)
        }
        setOpen(!open)
    }
    return (
        <ul className={classNames('list', type)} onClick={() => setOpen(!open)} ref={listRef}>
            {throttledListOfItems.map((item, index) =>
                <>
                    <SwitchTransition mode='out-in'>
                        <CSSTransition key={throttledListOfItems[0]} timeout={200} classNames={'transition-smooth'}>
                            <ListItem
                                value={item}
                                index={index}
                                callback={() => changeItem(item, index)}
                                open={open}
                                length={item.length}
                            />
                        </CSSTransition>
                    </SwitchTransition>
                </>
            )}
        </ul>
    )
};

export default List;
