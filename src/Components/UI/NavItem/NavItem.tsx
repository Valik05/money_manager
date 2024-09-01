import './navItem.css';
import classNames from 'classnames';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type Props = {
    title: string,
}

const NavItem = ({ title }: Props) => {
    const navigate = useNavigate();
    const { nav } = useParams();
    const location = useLocation();
    return (
        <li
            className={classNames('nav-item', { active: nav === title })}
            onClick={() => { if (title !== nav) navigate(new URL(".", window.origin + location.pathname).pathname + title) }}
        >
            <article className="text">{title.replace('-', ' ')}</article>
        </li>
    )
};

export default NavItem;
