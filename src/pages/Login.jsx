import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const update = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(form.email, form.password);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full bg-white/5 blur-3xl" />
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gold/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-gold" />
            </div>
            <span className="font-heading font-bold text-xl text-white">Scholar<span className="text-gold">Guide</span></span>
          </Link>
        </div>
        <div className="relative z-10">
          <blockquote className="text-white/80 text-xl italic font-display leading-relaxed mb-4">
            "Education is the most powerful weapon which you can use to change the world."
          </blockquote>
          <cite className="text-gold text-sm font-medium not-italic">— Nelson Mandela</cite>
        </div>
        <div className="relative z-10 text-white/30 text-sm">© 2024 ScholarGuide</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-navy text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-navy mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Log in to continue your scholarship journey.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-foreground font-medium text-sm">Email Address</Label>
              <Input
                id="email" type="email" value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="you@example.com" required className="mt-1.5 h-11"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="password" className="text-foreground font-medium text-sm">Password</Label>
                <Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-navy transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password" type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  placeholder="Your password" required className="h-11 pr-10"
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember" type="checkbox" checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-border accent-navy cursor-pointer"
              />
              <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                Remember me
              </Label>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-11 bg-navy text-white hover:bg-navy/90 font-semibold">
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-navy font-semibold hover:text-gold transition-colors">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}