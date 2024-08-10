import './main.css';
import Nav from '../../Components/Nav/Nav';
import Slider from '../../Components/Slider/Slider';
import { lazy } from 'react';
import { OperationProvider } from '../../Context/useOperation';
import { SettingsProvider } from '../../Context/useSettings';

type Props = {
    nav_items: string[]
}

const Main = ({ nav_items }: Props) => {
    return (
        <div className="main-page-container">
            <div className="main-page-nav"><Nav nav_items={nav_items} /></div>
            <div className="main-page-content">
                <OperationProvider>
                    <SettingsProvider>
                        <Slider items={[lazy(() => import('../../Components/Profile/Profile')), lazy(() => import('../../Components/Operations/Operations')), lazy(() => import('../../Components/Settings/Settings'))]} nav_items={nav_items} />
                    </SettingsProvider>
                </OperationProvider>
            </div>
        </div>
    )
};

export default Main;
