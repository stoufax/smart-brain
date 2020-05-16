import React from 'react';
import Particles, { IParticlesParams } from 'react-particles-js';
import { FaSpinner } from 'react-icons/fa';

import './App.css';
import { useAuth } from './components/contexts';

const AuthenticatedApp = React.lazy(() => import('./pages/AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./pages/UnauthenticatedApp'));

const paramsParticle: IParticlesParams = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        // eslint-disable-next-line @typescript-eslint/camelcase
        value_area: 800
      }
    }
  }
};

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="App">
      <Particles className="particles" params={paramsParticle} />
      <React.Suspense
        fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <FaSpinner className="spinner" size={40} />
          </div>
        }
      >
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </div>
  );
};

export default App;
