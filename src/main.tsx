import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import * as FirebaseAuth from './authService/FirebaseAuthService.ts'

FirebaseAuth.serviceInit();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
