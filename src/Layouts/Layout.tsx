import './layout.css';
import SystemMsg from '../Components/SystemMsg/SystemMsg';
import { Outlet } from 'react-router-dom';


const Layout = () => {
    return (
        <div className="layout-container">
            <SystemMsg />
            <Outlet />
        </div>
    )
};

export default Layout;
