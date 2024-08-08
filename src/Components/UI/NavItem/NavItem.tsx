import './navItem.css';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
    title: string,
    query: string | false
}

const NavItem = ({ title, query }: Props) => {
    const navigate = useNavigate();
    const { nav } = useParams();
    return (
        <li
            className={classNames('nav-item', { active: nav === title })}
            onClick={() => { if (title !== nav) navigate(`/${query || ''}${query ? '/' : ''}${title}`) }}
        >
            <div className="text">{title.replace('-', ' ')}</div>
        </li>
    )
};

export default NavItem;
