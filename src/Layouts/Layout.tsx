import './layout.css';
import SystemMsg from '../Components/SystemMsg/SystemMsg';
import { Outlet } from 'react-router-dom';
import { NavigationProvider } from '../Context/useNavigation';


const Layout = () => {
    return (
        <div className="layout-container">
            <SystemMsg />
            <NavigationProvider>
                <Outlet />
            </NavigationProvider>
        </div>
    )
};

export default Layout;
