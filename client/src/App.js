import './App.css'
import RoutesApp from "../src/routes"
import { AuthProvider } from './services/Auth'

function App() {
  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  )
}

export default App
