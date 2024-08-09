import { Navigate, Outlet } from "react-router-dom";

type Props = {
    isLoggenIn: boolean,
    redirectPath: string,
    children?: boolean | React.ReactNode
}

const ProtectedRoutes = ({ isLoggenIn, redirectPath, children = false }: Props) => {
    if (isLoggenIn) return <Navigate to={redirectPath} replace />;
    return children ? children : <Outlet />;
};

export default ProtectedRoutes