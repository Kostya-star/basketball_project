import { HashRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter/AppRouter';

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
};

export default App;
