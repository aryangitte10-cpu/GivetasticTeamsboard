import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';
import { validateTeamCode, validateCoachCode, validateCompanyCode } from '../utils/seedCodes';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'wouter';

export default function AuthPage() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [isSignUp, setIsSignUp] = useState(true);
  const [role, setRole] = useState('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const getCodeLabel = () => {
    switch (role) {
      case 'employee':
        return 'Team Code';
      case 'coach':
        return 'Coach Code';
      case 'admin':
        return 'Company Code';
      default:
        return 'Access Code';
    }
  };

  const validateCode = async () => {
    switch (role) {
      case 'employee':
        return await validateTeamCode(code);
      case 'coach':
        return await validateCoachCode(code);
      case 'admin':
        return await validateCompanyCode(code);
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate code first
      const isCodeValid = await validateCode();
      if (!isCodeValid) {
        setError('Invalid access code. Try: TEAM001 (employee), COACH001 (coach), or COMPANY001 (admin)');
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setIsLoading(false);
        return;
      }

      // If Supabase is not configured, use mock auth
      if (!supabase) {
        console.warn('Supabase not configured, using mock authentication');
        login(role, code, name || email.split('@')[0]);
        
        // Navigate to appropriate hero page
        if (role === 'employee') {
          setLocation('/employee-hero');
        } else if (role === 'admin') {
          setLocation('/admin-hero');
        } else if (role === 'coach') {
          setLocation('/coach-hero');
        }
        setIsLoading(false);
        return;
      }

      if (isSignUp) {
        // Sign up
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              role,
              code,
            },
          },
        });

        if (authError) throw authError;

        // Create profile record
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            user_id: authData.user.id,
            name,
            role,
            email,
          },
        ]);

        if (profileError) throw profileError;

        // Create role-specific records
        if (role === 'employee') {
          const { error: memberError } = await supabase.from('team_members').insert([
            {
              user_id: authData.user.id,
              team_code: code,
            },
          ]);
          if (memberError) throw memberError;
        } else if (role === 'coach') {
          const { error: coachError } = await supabase.from('coaches').insert([
            {
              user_id: authData.user.id,
              coach_code: code,
            },
          ]);
          if (coachError) throw coachError;
        } else if (role === 'admin') {
          const { error: companyError } = await supabase.from('companies').insert([
            {
              user_id: authData.user.id,
              company_code: code,
            },
          ]);
          if (companyError) throw companyError;
        }

        login(role, code, name);
        
        // Navigate to appropriate hero page
        if (role === 'employee') {
          setLocation('/employee-hero');
        } else if (role === 'admin') {
          setLocation('/admin-hero');
        } else if (role === 'coach') {
          setLocation('/coach-hero');
        }
      } else {
        // Sign in
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) throw authError;

        // Get profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', authData.user.id)
          .single();

        if (profileError) throw profileError;

        login(profile.role, code, profile.name);
        
        // Navigate to appropriate hero page
        if (profile.role === 'employee') {
          setLocation('/employee-hero');
        } else if (profile.role === 'admin') {
          setLocation('/admin-hero');
        } else if (profile.role === 'coach') {
          setLocation('/coach-hero');
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Givetastic
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 text-sm uppercase tracking-wide">
            TEAMSBOARD
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                isSignUp
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                !isSignUp
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Sign In
            </button>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {/* Role Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                I am a...
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
                <option value="coach">Coach</option>
              </select>
            </div>

            {/* Name (Sign Up only) */}
            {isSignUp && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                  placeholder="John Doe"
                />
              </div>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            {/* Access Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {getCodeLabel()}
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                required
                placeholder="XXXXXXXX"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Try: TEAM001, COACH001, or COMPANY001
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
