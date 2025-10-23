import { useAuth } from '../context/AuthContext';
import { useLocation } from 'wouter';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { Users, Target, TrendingUp, MessageSquare } from 'lucide-react';

export default function CoachHero() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  if (!user || user.role !== 'coach') {
    setLocation('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userName={user.name} userRole={user.role} onLogout={handleLogout} />
      
      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Coach Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Guide and inspire your teams to achieve their sustainability goals
          </p>
        </motion.div>

        {/* Coach Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-card-border rounded-xl p-6"
          >
            <Users className="w-8 h-8 text-primary mb-3" />
            <p className="text-3xl font-bold text-foreground">5</p>
            <p className="text-sm text-muted-foreground">Teams Coached</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-card-border rounded-xl p-6"
          >
            <Target className="w-8 h-8 text-chart-2 mb-3" />
            <p className="text-3xl font-bold text-foreground">63</p>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-card-border rounded-xl p-6"
          >
            <TrendingUp className="w-8 h-8 text-chart-3 mb-3" />
            <p className="text-3xl font-bold text-foreground">92%</p>
            <p className="text-sm text-muted-foreground">Avg Engagement</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-card-border rounded-xl p-6"
          >
            <MessageSquare className="w-8 h-8 text-primary mb-3" />
            <p className="text-3xl font-bold text-foreground">28</p>
            <p className="text-sm text-muted-foreground">Active Discussions</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setLocation('/coach-dashboard')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 px-8 rounded-xl shadow-md hover:shadow-lg transition-all text-left"
          >
            <h3 className="text-xl mb-2">View All Teams</h3>
            <p className="text-sm opacity-90">Access detailed team analytics and progress</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => setLocation('/teams-board')}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-6 px-8 rounded-xl shadow-md hover:shadow-lg transition-all text-left"
          >
            <h3 className="text-xl mb-2">Team Leaderboards</h3>
            <p className="text-sm opacity-90">Compare performance across teams</p>
          </motion.button>
        </div>
      </main>
    </div>
  );
}
