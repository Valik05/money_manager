import PrivateRoutes from "./Routes/PrivateRoutes";
import PublicRoutes from "./Routes/PublicRoutes";
import Layout from "./Layouts/Layout";
import Main from "./Pages/Main/Main";
import Auth from "./Pages/Auth/Auth";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route path=":nav" element={<Main nav_items={['profile', 'operation-list', 'settings']} />} />
        </Route>
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path="/auth" element={<Layout />}>
          <Route path=":nav" element={<Auth nav_items={['sign-in', 'sign-up', 'support']} />} />
        </Route>
      </Route>
    </Routes>
  )
}
