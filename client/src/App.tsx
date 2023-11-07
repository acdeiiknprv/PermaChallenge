import './App.css';
import Products from './components/Display';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Products />
      </div>
    </AuthProvider>
  );
}

export default App;
