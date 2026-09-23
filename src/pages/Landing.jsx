import { Link } from 'react-router-dom';
import { GraduationCap, Bookmark, Sparkles, ArrowRight, CheckCircle, Star } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';

export default function Landing() {
  return (
    <div className="min-h-screen bg-surface font-body">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy pt-16">
        {/* Decorative mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-400/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/2 blur-3xl" />
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-8">
            <Star className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-wide uppercase">India's Scholarship Discovery Platform</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Find Scholarships
            <br />
            <span className="text-gold">Made for You</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-body">
            ScholarGuide helps students discover, track, and apply for scholarships — all in one place.
            Personalized matches. Deadline reminders. Zero hassle.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="bg-gold text-white font-semibold px-8 py-4 rounded-xl hover:bg-amber-500 transition-all duration-200 shadow-lg shadow-gold/20 flex items-center gap-2 text-base">
              
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto">
            {[
            { value: '10+', label: 'Scholarships' },
            { value: '₹75L+', label: 'In Awards' },
            { value: '41+', label: 'Beneficiaries' }].
            map((stat) =>
            <div key={stat.label} className="text-center">
                <div className="font-display text-2xl font-bold text-gold">{stat.value}</div>
                <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-navy mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A complete toolkit to discover and win scholarships that match your profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
          {
            icon: GraduationCap,
            title: 'Discover Scholarships',
            desc: 'Explore merit, need-based, and endowment scholarships from across institutions.',
            color: 'bg-blue-50',
            iconColor: 'text-navy'
          },
          {
            icon: Bookmark,
            title: 'Save & Track',
            desc: 'Bookmark scholarships you like and monitor deadlines so you never miss an opportunity.',
            color: 'bg-amber-50',
            iconColor: 'text-gold'
          },
          {
            icon: Sparkles,
            title: 'Personalized Matches',
            desc: 'Get recommendations based on your branch, year, gender, and academic profile.',
            color: 'bg-green-50',
            iconColor: 'text-emerald-600'
          }].
          map((f) =>
          <div key={f.title} className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group">
              <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-7 h-7 ${f.iconColor}`} />
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          )}
        </div>
      </section>

      {/* JNTUA Banner */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-navy rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <span className="inline-block bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                Special Section
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                Are you a JNTUA CEA Student?
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                We have a dedicated section for JNTUA College of Engineering Ananthapuramu endowment
                scholarships — 10 scholarships for 44+ deserving students.
              </p>
              <Link
                to="/jntua-cea"
                className="inline-flex items-center gap-2 bg-gold text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-amber-500 transition-all duration-200 shadow-lg shadow-gold/20">
                
                Explore JNTUA CEA Scholarships
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 px-4 sm:px-6 bg-navy/3">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-navy mb-12">
            Why Students Choose ScholarGuide
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
            'Free to use — no hidden fees',
            'Curated endowment scholarship data',
            'Filter by branch, year & gender',
            'Save scholarships to your profile',
            'JNTUA CEA dedicated section',
            'Mobile-friendly interface'].
            map((item) =>
            <div key={item} className="flex items-center gap-3 bg-card border border-border rounded-xl px-5 py-4 text-left shadow-card">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-foreground font-medium text-sm">{item}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-gold" />
              </div>
              <span className="font-heading font-bold text-xl">
                Scholar<span className="text-gold">Guide</span>
              </span>
            </div>
            <p className="text-white/50 text-sm text-center">
              Empowering students to find and win scholarships they deserve.
            </p>
            <p className="text-white/40 text-sm">© 2026 ScholarGuide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);

}