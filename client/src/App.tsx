import './App.css';
import FormatProduct from './components/Display';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <FormatProduct />
      </div>
    </AuthProvider>
  );
}

export default App;
