import Orders from './components/Orders';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="app-container">
      <h1>Admin Portal</h1>
      <Orders />
    </div>
    </QueryClientProvider>
  );
}

export default App;
