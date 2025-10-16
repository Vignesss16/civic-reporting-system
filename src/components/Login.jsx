// src/components/Login.jsx
import { useState } from 'react'
import { Mail, Lock, Shield, UserCheck, User } from 'lucide-react'
import supabase from '../lib/supabaseClient'

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [role, setRole] = useState('citizen')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      
      if (error) throw error
      
      // Get user profile to check role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()
      
      if (profileError) throw profileError
      
      // Verify if user has the correct role
      if (role !== profile.role) {
        await supabase.auth.signOut()
        throw new Error(`This account is registered as a ${profile.role}. Please use the correct login tab.`)
      }

      // Call the success callback with the user info
      onLoginSuccess({
        id: data.user.id,
        name: profile.name || data.user.email.split('@')[0],
        email: data.user.email,
        phone: profile.phone,
        role: profile.role,
        department: profile.department,
        address: profile.address,
        joinedOn: new Date(profile.created_at || data.user.created_at).toISOString().split('T')[0]
      })
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <p className="text-gray-600 mt-1">Please select your account type</p>
        </div>
        
        {/* User type selector */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setRole('citizen')}
            className={`flex-1 py-2 rounded-md flex items-center justify-center ${
              role === 'citizen' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
            type="button"
          >
            <User className="w-4 h-4 mr-1" />
            Citizen
          </button>
          <button
            onClick={() => setRole('fieldworker')}
            className={`flex-1 py-2 rounded-md flex items-center justify-center ${
              role === 'fieldworker' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
            type="button"
          >
            <UserCheck className="w-4 h-4 mr-1" />
            Field Worker
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 rounded-md flex items-center justify-center ${
              role === 'admin' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
            type="button"
          >
            <Shield className="w-4 h-4 mr-1" />
            Admin
          </button>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}