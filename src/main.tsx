import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Context/useAuth.tsx'
import { SystemMsgProvider } from './Context/useSystemMsg.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <SystemMsgProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SystemMsgProvider>
  </BrowserRouter>
  ,
)
