import './nav.css';
import NavItem from '../UI/NavItem/NavItem';
import Title from '../UI/Title/Title';

type Props = {
    nav_items: string[],
    query?: string | false
}

const Nav = ({ nav_items, query = false }: Props) => {
    return (
        <div className='nav-container'>
            <Title title='Menu' type={['center']} />
            <ul className="nav-items-list">
                {nav_items.map((item, index) => {
                    return <NavItem title={item} query={query} key={index} />
                })}
            </ul>
        </div>
    )
};

export default Nav;
