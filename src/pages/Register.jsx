import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const colleges = [
  'JNTUA College of Engineering, Ananthapuramu',
  'JNTUA College of Engineering, Kalikiri',
  'JNTUA College of Engineering, Pulivendula',
  'JNTUA Oil Technological & Pharmaceutical Research Institute, Ananthapuramu',
  'Other',
];

const branches = ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'Other'];
const years = ['I', 'II', 'III', 'IV'];
const genders = ['Male', 'Female', 'Other'];

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState(1); // 1 = form, 2 = OTP
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    branch: '',
    year: '',
    gender: '',
  });

  const update = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setIsLoading(true);
    try {
      await base44.auth.register({ email: form.email, password: form.password });
      setEmail(form.email);
      setStep(2);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await base44.auth.verifyOtp({ email, otpCode: otp });
      base44.auth.setToken(res.access_token);
      // Save extra profile fields
      await base44.auth.updateMe({
        full_name: form.full_name,
        college: form.college,
        branch: form.branch,
        year: form.year,
        gender: form.gender,
        savedScholarships: [],
      });
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Verification failed. Please check your code and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
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
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Join thousands of<br />
            <span className="text-gold">scholarship winners</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Create your free account and get personalized scholarship matches based on your profile.
          </p>
          <div className="mt-8 space-y-3">
            {['Free forever — no subscription needed', 'Curated JNTUA CEA scholarship data', 'Personalized matches for your branch & year'].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <span className="text-white/70 text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-white/30 text-sm">© 2024 ScholarGuide</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-start justify-center p-6 sm:p-10 overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-navy text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {step === 1 ? (
            <>
              <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-navy mb-2">Create Account</h1>
                <p className="text-muted-foreground">Start your scholarship journey today.</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <Label htmlFor="name" className="text-foreground font-medium text-sm">Full Name</Label>
                  <Input id="name" value={form.full_name} onChange={(e) => update('full_name', e.target.value)}
                    placeholder="Your full name" required className="mt-1.5 h-11" />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-foreground font-medium text-sm">Email Address</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
                    placeholder="you@example.com" required className="mt-1.5 h-11" />
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password" className="text-foreground font-medium text-sm">Password</Label>
                  <div className="relative mt-1.5">
                    <Input id="password" type={showPassword ? 'text' : 'password'} value={form.password}
                      onChange={(e) => update('password', e.target.value)} placeholder="Min. 6 characters" required className="h-11 pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirm" className="text-foreground font-medium text-sm">Confirm Password</Label>
                  <div className="relative mt-1.5">
                    <Input id="confirm" type={showConfirm ? 'text' : 'password'} value={form.confirmPassword}
                      onChange={(e) => update('confirmPassword', e.target.value)} placeholder="Re-enter password" required className="h-11 pr-10" />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* College */}
                <div>
                  <Label htmlFor="college" className="text-foreground font-medium text-sm">College Name</Label>
                  <select id="college" value={form.college} onChange={(e) => update('college', e.target.value)}
                    required className="mt-1.5 w-full h-11 px-3 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select your college</option>
                    {colleges.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Branch, Year, Gender row */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label className="text-foreground font-medium text-sm">Branch</Label>
                    <select value={form.branch} onChange={(e) => update('branch', e.target.value)}
                      required className="mt-1.5 w-full h-11 px-3 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="">Select</option>
                      {branches.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label className="text-foreground font-medium text-sm">Year</Label>
                    <select value={form.year} onChange={(e) => update('year', e.target.value)}
                      required className="mt-1.5 w-full h-11 px-3 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="">Select</option>
                      {years.map((y) => <option key={y} value={y}>{y} Year</option>)}
                    </select>
                  </div>
                  <div>
                    <Label className="text-foreground font-medium text-sm">Gender</Label>
                    <select value={form.gender} onChange={(e) => update('gender', e.target.value)}
                      required className="mt-1.5 w-full h-11 px-3 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="">Select</option>
                      {genders.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}
                  className="w-full h-11 bg-navy text-white hover:bg-navy/90 font-semibold mt-2">
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-navy font-semibold hover:text-gold transition-colors">Login</Link>
              </p>
            </>
          ) : (
            <>
              <div className="mb-8">
                <div className="w-16 h-16 rounded-2xl bg-navy/10 flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-navy" />
                </div>
                <h1 className="font-display text-3xl font-bold text-navy mb-2">Verify Email</h1>
                <p className="text-muted-foreground">We sent a 6-digit code to <span className="font-medium text-foreground">{email}</span></p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">{error}</div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <Label htmlFor="otp" className="text-foreground font-medium text-sm">Verification Code</Label>
                  <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code" required maxLength={6} className="mt-1.5 h-11 text-center text-2xl tracking-widest" />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full h-11 bg-navy text-white hover:bg-navy/90 font-semibold">
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </Button>
                <button type="button" onClick={() => base44.auth.resendOtp(email)}
                  className="w-full text-sm text-muted-foreground hover:text-navy transition-colors">
                  Didn't receive code? <span className="font-medium">Resend</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}