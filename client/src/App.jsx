import { Route, Switch, useLocation } from 'wouter';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import EmployeeHero from './pages/EmployeeHero';
import AdminHero from './pages/AdminHero';
import CoachHero from './pages/CoachHero';
import PersonalBoard from './pages/PersonalBoard';
import TeamsBoard from './pages/TeamsBoard';
import AdminDashboard from './pages/AdminDashboard';
import CoachDashboard from './pages/CoachDashboard';

function AppRoutes() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect to appropriate hero page after login
  if (user && window.location.pathname === '/') {
    if (user.role === 'employee') {
      setLocation('/employee-hero');
    } else if (user.role === 'admin') {
      setLocation('/admin-hero');
    } else if (user.role === 'coach') {
      setLocation('/coach-hero');
    }
  }

  return (
    <Switch>
      <Route path="/" component={AuthPage} />
      <Route path="/employee-hero" component={EmployeeHero} />
      <Route path="/admin-hero" component={AdminHero} />
      <Route path="/coach-hero" component={CoachHero} />
      <Route path="/personal-board" component={PersonalBoard} />
      <Route path="/teams-board" component={TeamsBoard} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/coach-dashboard" component={CoachDashboard} />
      <Route>404 - Page Not Found</Route>
    </Switch>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
