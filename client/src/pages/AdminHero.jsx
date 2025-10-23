import { useAuth } from '../context/AuthContext';
import { useLocation } from 'wouter';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { Users, Award, TrendingUp, Building } from 'lucide-react';
import { useState } from 'react';
import { generateTeamCode } from '../utils/seedCodes';

export default function AdminHero() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [newCode, setNewCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    const code = await generateTeamCode();
    if (code) {
      setNewCode(code);
      setTimeout(() => setNewCode(''), 5000);
    }
    setIsGenerating(false);
  };

  if (!user || user.role !== 'admin') {
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
            Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your organization's sustainability initiatives
          </p>
        </motion.div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-card-border rounded-xl p-6"
          >
            <Building className="w-8 h-8 text-primary mb-3" />
            <p className="text-3xl font-bold text-foreground">8</p>
            <p className="text-sm text-muted-foreground">Active Teams</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-card-border rounded-xl p-6"
          >
            <Users className="w-8 h-8 text-chart-2 mb-3" />
            <p className="text-3xl font-bold text-foreground">127</p>
            <p className="text-sm text-muted-foreground">Total Employees</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-card-border rounded-xl p-6"
          >
            <Award className="w-8 h-8 text-chart-3 mb-3" />
            <p className="text-3xl font-bold text-foreground">45,890</p>
            <p className="text-sm text-muted-foreground">Company Points</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-card-border rounded-xl p-6"
          >
            <TrendingUp className="w-8 h-8 text-primary mb-3" />
            <p className="text-3xl font-bold text-foreground">87%</p>
            <p className="text-sm text-muted-foreground">Participation</p>
          </motion.div>
        </div>

        {/* Generate Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-card-border rounded-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">Generate Team Code</h2>
          <p className="text-muted-foreground mb-6">
            Create a new access code for teams to join your organization
          </p>
          <button
            onClick={handleGenerateCode}
            disabled={isGenerating}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate New Code'}
          </button>
          {newCode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg"
            >
              <p className="text-sm text-muted-foreground mb-1">New Team Code:</p>
              <p className="text-2xl font-mono font-bold text-primary">{newCode}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => setLocation('/admin-dashboard')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 px-8 rounded-xl shadow-md hover:shadow-lg transition-all text-left"
          >
            <h3 className="text-xl mb-2">View Full Dashboard</h3>
            <p className="text-sm opacity-90">Access detailed analytics and reports</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            onClick={() => setLocation('/teams-board')}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-6 px-8 rounded-xl shadow-md hover:shadow-lg transition-all text-left"
          >
            <h3 className="text-xl mb-2">Manage Teams</h3>
            <p className="text-sm opacity-90">View and organize company teams</p>
          </motion.button>
        </div>
      </main>
    </div>
  );
}
