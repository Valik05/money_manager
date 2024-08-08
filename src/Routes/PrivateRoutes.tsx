import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

type Props = {
    redirectPath?: string,
    children?: boolean | React.ReactNode
}

const PrivateRoutes = ({ redirectPath = '/auth/sign-in', children = false }: Props) => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn()) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
};

export default PrivateRoutes