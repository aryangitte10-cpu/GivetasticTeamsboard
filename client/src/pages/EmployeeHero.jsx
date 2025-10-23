import { useAuth } from '../context/AuthContext';
import { useLocation } from 'wouter';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Target, Users } from 'lucide-react';

export default function EmployeeHero() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  if (!user || user.role !== 'employee') {
    setLocation('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userName={user.name} userRole={user.role} onLogout={handleLogout} />
      
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome back, {user.name}! 🌱
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to make a difference today?
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-card-border rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">7</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-card-border rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-chart-3/10 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-chart-3" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">1,240</p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-card-border rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-chart-2/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-chart-2" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">#3</p>
            <p className="text-sm text-muted-foreground">Team Rank</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-card-border rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">Team Size</p>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setLocation('/personal-board')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 px-8 rounded-xl shadow-md hover:shadow-lg transition-all text-left"
          >
            <h3 className="text-xl mb-2">View My Board</h3>
            <p className="text-sm opacity-90">Track your personal habits and progress</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => setLocation('/teams-board')}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-6 px-8 rounded-xl shadow-md hover:shadow-lg transition-all text-left"
          >
            <h3 className="text-xl mb-2">Team Leaderboard</h3>
            <p className="text-sm opacity-90">See how your team is performing</p>
          </motion.button>
        </div>
      </main>
    </div>
  );
}
