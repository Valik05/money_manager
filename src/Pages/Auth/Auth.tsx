import './auth.css';
import Nav from '../../Components/Nav/Nav';
import Slider from '../../Components/Slider/Slider';
import { lazy } from 'react';

type Props = {
    nav_items: string[]
}

const Auth = ({ nav_items }: Props) => {
    return (
        <main className="auth-page-container">
            <Nav nav_items={nav_items} />
            <article className="auth-page-content">
                <Slider items={[lazy(() => import('../../Components/Login/Login')), lazy(() => import('../../Components/Register/Register')), lazy(() => import('../../Components/Support/Support'))]} nav_items={nav_items} />
            </article>
        </main>
    )
};

export default Auth;
