import { useEffect, useRef, useState } from 'react';
import ListItem from '../ListItem/ListItem';
import './list.css';
import classNames from 'classnames';
import useOutlineClick from '../../../hooks/useOutlineClick';
import { useDebounce } from '@uidotdev/usehooks';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { CurrencyItem } from '../../../Models/Settings';


type Props = {
    items: CurrencyItem[],
    type: string,
    callback: (currency: number) => void
}

const List = ({ items, type, callback }: Props) => {
    const listRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(JSON.parse(localStorage.getItem('currency') || '""') || items[0]);
    const [listOfItems, setListOfItems] = useState([currentItem]);
    const throttledListOfItems = useDebounce(listOfItems, !open ? (items.length * 200) : 200);
    useOutlineClick(listRef, () => setOpen(false), open)
    useEffect(() => {
        if (open) setListOfItems([currentItem, ...items.filter(item => item.name !== currentItem.name)])
        if (!open && listOfItems.length > 1) setListOfItems([currentItem])
    }, [open, items, currentItem, listOfItems.length])
    const changeItem = (item: CurrencyItem, index: number) => {
        if (index !== 0) {
            callback(item.id)
            setOpen(false)
            localStorage.setItem('currency', JSON.stringify(item))
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
                                value={item.name}
                                index={index}
                                callback={() => changeItem(item, index)}
                                open={open}
                                length={items.length}
                            />
                        </CSSTransition>
                    </SwitchTransition>
                </>
            )}
        </ul>
    )
};

export default List;
