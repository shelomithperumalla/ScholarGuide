import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Filter, Users, Award } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ScholarshipCard from '@/components/ScholarshipCard';
import ScholarshipDetailModal from '@/components/ScholarshipDetailModal';
import PublicNavbar from '@/components/PublicNavbar';
import { cn } from '@/lib/utils';

const TABS = ['Alumni Endowment Scholarships', 'Other Endowment Scholarships'];
const BRANCHES = ['All', 'CSE', 'ECE', 'EEE', 'ME', 'CE', 'Any'];
const GENDERS = ['All', 'Girls Only', 'Boys Only', 'Any'];
const YEARS = ['All', 'I Year', 'II Year', 'III Year', 'IV Year'];

export default function JntuaCea() {
  const [activeTab, setActiveTab] = useState(0);
  const [branchFilter, setBranchFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [dbScholarships, setDbScholarships] = useState([]);

  useEffect(() => {
    base44.auth.isAuthenticated().then((authed) => {
      setIsLoggedIn(authed);
      if (authed) {
        base44.auth.me().then((u) => {
          setUser(u);
          setSavedIds(u?.savedScholarships || []);
        }).catch(() => {});
      }
    });
    base44.entities.Scholarship.list('-created_date', 200).then(setDbScholarships).catch(() => {});
  }, []);

  const handleSave = async (scholarship) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    const current = [...savedIds];
    const updated = current.includes(scholarship.id)
      ? current.filter((id) => id !== scholarship.id)
      : [...current, scholarship.id];
    setSavedIds(updated);
    await base44.auth.updateMe({ savedScholarships: updated });
  };

  const filterScholarships = (scholarships) => {
    return scholarships.filter((s) => {
      const branchMatch = branchFilter === 'All' || s.branch === branchFilter;
      const genderMatch = genderFilter === 'All' || s.genderEligibility === genderFilter;
      const yearMatch = yearFilter === 'All' ||
        s.yearEligibility === yearFilter ||
        s.yearEligibility === 'Any' ||
        (s.tags || []).some(t => t.toLowerCase().includes(yearFilter.toLowerCase().replace(' year', '')));
      return branchMatch && genderMatch && yearMatch;
    });
  };

  const mergedAlumni = dbScholarships.filter((s) => s.source === 'JNTUA CEA' && s.category === 'alumni');
  const mergedOther = dbScholarships.filter((s) => s.source === 'JNTUA CEA' && s.category !== 'alumni');

  const currentScholarships = activeTab === 0 ? mergedAlumni : mergedOther;
  const filtered = filterScholarships(currentScholarships);

  const alumniTotal = mergedAlumni.reduce((sum, s) => sum + (s.beneficiaryCount || 0), 0);
  const totalJntua = mergedAlumni.length + mergedOther.length;

  return (
    <div className="min-h-screen bg-surface">
      {/* Navbar only when not logged in */}
      {!isLoggedIn && <PublicNavbar />}

      {/* If logged in, show a simpler back-link header */}
      {isLoggedIn && (
        <div className="bg-white border-b border-border px-6 py-3 flex items-center gap-4 sticky top-0 z-30 lg:hidden">
          <Link to="/dashboard" className="text-sm text-navy font-medium hover:text-gold transition-colors">
            ← Dashboard
          </Link>
        </div>
      )}

      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", !isLoggedIn ? "pt-24" : "pt-6", "pb-16")}>
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-navy/5 border border-navy/15 rounded-full px-4 py-1.5 mb-4">
            <GraduationCap className="w-4 h-4 text-navy" />
            <span className="text-navy text-xs font-semibold uppercase tracking-wide">JNTUA CEA</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-navy mb-4">
            JNTUA CEA Endowment Scholarships
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Scholarships instituted by alumni and benefactors for deserving students of
            JNTUA College of Engineering, Ananthapuramu.
          </p>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Scholarships', value: String(totalJntua), icon: Award, color: 'text-navy' },
            { label: 'Alumni Endowments', value: String(mergedAlumni.length), icon: GraduationCap, color: 'text-gold' },
            { label: 'Total Beneficiaries', value: `${alumniTotal}+`, icon: Users, color: 'text-emerald-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4 shadow-card">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div>
                <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground text-xs">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex bg-secondary rounded-xl p-1 mb-6 w-full sm:w-fit gap-1">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={cn(
                "flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                activeTab === i
                  ? "bg-navy text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
              <span className={cn(
                "ml-2 text-xs px-1.5 py-0.5 rounded-full",
                activeTab === i ? "bg-white/20 text-white" : "bg-border text-muted-foreground"
              )}>
                {i === 0 ? mergedAlumni.length : mergedOther.length}
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-6 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filter Scholarships</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FilterSelect label="Branch" value={branchFilter} options={BRANCHES} onChange={setBranchFilter} />
            <FilterSelect label="Gender Eligibility" value={genderFilter} options={GENDERS} onChange={setGenderFilter} />
            <FilterSelect label="Year" value={yearFilter} options={YEARS} onChange={setYearFilter} />
          </div>
          {(branchFilter !== 'All' || genderFilter !== 'All' || yearFilter !== 'All') && (
            <button
              onClick={() => { setBranchFilter('All'); setGenderFilter('All'); setYearFilter('All'); }}
              className="mt-2 text-xs text-navy hover:text-gold transition-colors font-medium"
            >
              Clear all filters ×
            </button>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {currentScholarships.length} scholarships
          </p>
          {!isLoggedIn && (
            <Link to="/login" className="text-xs text-navy font-medium hover:text-gold transition-colors">
              Login to save scholarships →
            </Link>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-3xl bg-navy/5 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-navy/30" />
            </div>
            <h3 className="font-heading text-xl font-bold text-navy mb-2">No scholarships match your filters</h3>
            <p className="text-muted-foreground text-sm mb-4">Try adjusting your filter criteria.</p>
            <button
              onClick={() => { setBranchFilter('All'); setGenderFilter('All'); setYearFilter('All'); }}
              className="text-navy font-medium text-sm hover:text-gold transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s) => (
              <ScholarshipCard
                key={s.id}
                scholarship={s}
                isSaved={savedIds.includes(s.id)}
                onSave={handleSave}
                onViewDetails={setSelectedScholarship}
              />
            ))}
          </div>
        )}

        {/* Bottom summary */}
        {activeTab === 0 && (
          <div className="mt-10 bg-navy rounded-2xl p-6 text-center">
            <p className="text-white/80 font-medium text-sm">
              <span className="text-gold font-bold">{mergedAlumni.length} Alumni Endowment Scholarships</span>
              {' · '}
              <span className="text-white font-bold">Total Beneficiaries: {alumniTotal}</span>
            </p>
          </div>
        )}
      </div>

      {/* Login prompt modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLoginPrompt(false)} />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-navy/10 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-navy" />
            </div>
            <h2 className="font-heading text-xl font-bold text-navy mb-2">Login to Save</h2>
            <p className="text-muted-foreground text-sm mb-5">
              Create a free account or log in to save scholarships to your profile.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowLoginPrompt(false)}
                className="flex-1 border border-border text-muted-foreground py-2.5 rounded-xl text-sm hover:bg-secondary transition-colors">
                Cancel
              </button>
              <Link to="/login" className="flex-1 bg-navy text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-navy/90 transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {selectedScholarship && (
        <ScholarshipDetailModal
          scholarship={selectedScholarship}
          isSaved={savedIds.includes(selectedScholarship.id)}
          onSave={handleSave}
          onClose={() => setSelectedScholarship(null)}
        />
      )}
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}