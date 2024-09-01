import './nav.css';
import classNames from 'classnames';
import Title from '../UI/Title/Title';
import NavItem from '../UI/NavItem/NavItem';
import { useNavigation } from '../../Context/useNavigation';
import useOutlineClick from '../../hooks/useOutlineClick';
import { useRef } from 'react';

type Props = {
    nav_items: string[],
}

const Nav = ({ nav_items }: Props) => {
    const navRef = useRef(null);
    const { showNavigation, setShowNavigation } = useNavigation();
    useOutlineClick(navRef, () => setShowNavigation(false), showNavigation)
    return (
        <nav className={classNames('nav-container', { show: showNavigation })} ref={navRef}>
            <Title title='Menu' type={['center']} />
            <ul className="nav-items-list">
                {nav_items.map((item, index) => {
                    return <NavItem title={item} key={index} />
                })}
            </ul>
            <button className={classNames('drag-btn', { show: !showNavigation })} onClick={() => setShowNavigation(true)}>{'>>'}</button>
        </nav>
    )
};

export default Nav;
