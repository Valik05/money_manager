import Layout from "./Layouts/Layout";
import Main from "./Pages/Main/Main";
import Auth from "./Pages/Auth/Auth";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import { useAuth } from "./Context/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  const { isLoggedIn } = useAuth();
  return (
    <Routes>
      <Route element={<ProtectedRoutes isLoggenIn={!isLoggedIn()} redirectPath={'/auth/sign-in'} />}>
        <Route path="/" element={<Layout />}>
          <Route path=":nav" element={<Main nav_items={['profile', 'operation-list', 'settings']} />} />
        </Route>
        <Route path="*" element={<Navigate to={'/profile'} />}></Route>
      </Route>
      <Route element={<ProtectedRoutes isLoggenIn={isLoggedIn()} redirectPath={'/profile'} />}>
        <Route path="/auth" element={<Layout />}>
          <Route path=":nav" element={<Auth nav_items={['sign-in', 'sign-up', 'support']} />} />
        </Route>
        <Route path="*" element={<Navigate to={'/auth/sign-in'} />}></Route>
      </Route>

    </Routes>
  )
}
