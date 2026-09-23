import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Search, Filter, Globe, BookOpen, Download, Bookmark, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { cn } from '@/lib/utils';
import CalendarSyncButton from '@/components/CalendarSyncButton';

const sourceConfig = {
  "Buddy4Study": { color: "bg-orange-100 text-orange-700 border-orange-200", dot: "bg-orange-500" },
  "NSP (scholarships.gov.in)": { color: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" },
  "JNTUA CEA": { color: "bg-navy/10 text-navy border-navy/20", dot: "bg-navy" },
  "RDT": { color: "bg-teal-100 text-teal-700 border-teal-200", dot: "bg-teal-500" },
  "Other": { color: "bg-teal-100 text-teal-700 border-teal-200", dot: "bg-teal-500" },
};

const categoryColors = {
  government: "bg-emerald-100 text-emerald-700",
  private: "bg-violet-100 text-violet-700",
  alumni: "bg-amber-100 text-amber-700",
  other: "bg-slate-100 text-slate-600",
};

export default function Explore() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("Any");
  const [branchFilter, setBranchFilter] = useState("Any");
  const [amountFilter, setAmountFilter] = useState("any");
  const [savedIds, setSavedIds] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [savingId, setSavingId] = useState(null);
  const [dbScholarships, setDbScholarships] = useState([]);

  useEffect(() => {
    base44.auth.isAuthenticated().then((authed) => {
      setIsLoggedIn(authed);
      if (authed) {
        base44.auth.me().then((u) => setSavedIds(u?.savedScholarships || [])).catch(() => {});
      }
    });
    base44.entities.Scholarship.list('-created_date', 200).then(setDbScholarships).catch(() => {});
  }, []);

  const handleSave = async (scholarship) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    setSavingId(scholarship.id);
    const current = [...savedIds];
    const updated = current.includes(scholarship.id)
      ? current.filter((id) => id !== scholarship.id)
      : [...current, scholarship.id];
    setSavedIds(updated);
    await base44.auth.updateMe({ savedScholarships: updated });
    setSavingId(null);
  };

  const tabs = [
    { id: "all", label: "All" },
    { id: "Buddy4Study", label: "Buddy4Study" },
    { id: "NSP (scholarships.gov.in)", label: "NSP Gov.in" },
    { id: "RDT", label: "RDT" },
    { id: "JNTUA CEA", label: "JNTUA CEA" },
    { id: "Other", label: "Other" },
  ];

  const getScholarships = () => {
    if (activeTab === "all") return dbScholarships;
    return dbScholarships.filter((s) => s.source === activeTab);
  };

  // Extract a numeric amount from strings like "₹25,00,000" or "₹50,000/year"
  const parseAmount = (amount) => {
    const num = parseInt(String(amount || '').replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? null : num;
  };

  const amountRanges = [
    { id: "any", label: "Any Amount" },
    { id: "under50k", label: "Under ₹50,000", min: 0, max: 50000 },
    { id: "50k-2l", label: "₹50,000 – ₹2,00,000", min: 50000, max: 200000 },
    { id: "2l-10l", label: "₹2,00,000 – ₹10,00,000", min: 200000, max: 1000000 },
    { id: "above10l", label: "Above ₹10,00,000", min: 1000000, max: Infinity },
  ];

  const matchesFilters = (s) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.institutedBy?.toLowerCase().includes(q) ||
      s.eligibility?.toLowerCase().includes(q) ||
      s.tags?.some((t) => t.toLowerCase().includes(q));
    const matchGender =
      genderFilter === "Any" ||
      s.genderEligibility === genderFilter ||
      s.genderEligibility === "Any";
    const matchBranch =
      branchFilter === "Any" ||
      s.branch === branchFilter ||
      s.branch === "Any";
    const matchAmount = (() => {
      if (amountFilter === "any") return true;
      const range = amountRanges.find((r) => r.id === amountFilter);
      const amt = parseAmount(s.amount);
      return range && amt !== null && amt >= range.min && amt < range.max;
    })();
    return matchSearch && matchGender && matchBranch && matchAmount;
  };

  const handleExportCode = () => {
    const scholarships = getScholarships().filter(matchesFilters);
    const code = JSON.stringify(scholarships, null, 2);
    const blob = new Blob([code], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scholarships.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = getScholarships().filter(matchesFilters);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-navy">Explore Scholarships</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Scholarships from Buddy4Study, NSP, RDT &amp; more — all in one place
        </p>
      </div>

      {/* Source badges + Export */}
      <div className="flex flex-wrap items-center gap-3">
        <a href="https://www.buddy4study.com/scholarships" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-orange-100 transition-colors">
          <Globe className="w-4 h-4" />buddy4study.com<ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors">
          <BookOpen className="w-4 h-4" />scholarships.gov.in<ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a href="https://www.rdtfvf.org" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-teal-100 transition-colors">
          <Globe className="w-4 h-4" />rdtfvf.org<ExternalLink className="w-3.5 h-3.5" />
        </a>
        <Button onClick={handleExportCode} variant="outline" size="sm" className="ml-auto gap-2 border-navy text-navy hover:bg-navy hover:text-white">
          <Download className="w-4 h-4" />
          Export as JSON
        </Button>
      </div>

      {/* Tabs + Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Tabs */}
        <div className="flex bg-secondary rounded-xl p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-white text-navy shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search scholarships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        {/* Gender filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {["Any", "Girls Only", "Boys Only"].map((g) => (
            <button
              key={g}
              onClick={() => setGenderFilter(g)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-full border font-medium transition-all",
                genderFilter === g
                  ? "bg-navy text-white border-navy"
                  : "border-border text-muted-foreground hover:border-navy hover:text-navy"
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Branch & Amount filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className="h-9 px-3 rounded-lg border border-input bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="Any">All Branches</option>
          {["CSE", "ECE", "EEE", "ME", "CE"].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <select
          value={amountFilter}
          onChange={(e) => setAmountFilter(e.target.value)}
          className="h-9 px-3 rounded-lg border border-input bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {amountRanges.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> scholarships
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((s) => (
          <ExternalScholarshipCard
            key={s.id}
            scholarship={s}
            isSaved={savedIds.includes(s.id)}
            onSave={handleSave}
            isSaving={savingId === s.id}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-muted-foreground">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No scholarships found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
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
    </div>
  );
}

function ExternalScholarshipCard({ scholarship: s, isSaved, onSave, isSaving }) {
  const src = sourceConfig[s.source] || sourceConfig["Buddy4Study"];

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col p-5">
      {/* Source + category badges + save */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn("text-xs px-2.5 py-1 rounded-full border font-medium", src.color)}>
            <span className={cn("inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle", src.dot)} />
            {s.source === "NSP (scholarships.gov.in)" ? "NSP Gov.in" : s.source}
          </span>
          <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium capitalize", categoryColors[s.category] || categoryColors.other)}>
            {s.category}
          </span>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); onSave(s); }}
          disabled={isSaving}
          className={cn(
            "flex-shrink-0 p-1.5 rounded-lg transition-colors",
            isSaved
              ? "text-gold bg-gold/10 hover:bg-gold/20"
              : "text-muted-foreground hover:text-navy hover:bg-secondary"
          )}
          title={isSaved ? "Unsave scholarship" : "Save scholarship"}
        >
          <Bookmark className={cn("w-4 h-4", isSaved && "fill-gold")} />
        </button>
      </div>

      {/* Name */}
      <h3 className="font-heading font-semibold text-base text-foreground leading-snug mb-1 flex-1">
        {s.name}
      </h3>

      {/* Instituted by */}
      {s.institutedBy && (
        <p className="text-xs text-muted-foreground mb-3">by {s.institutedBy}</p>
      )}

      {/* Amount */}
      <div className="bg-gold/10 border border-gold/30 text-gold font-bold text-sm px-3 py-1.5 rounded-lg mb-3 inline-block self-start">
        {s.amount}
      </div>

      {/* Eligibility */}
      <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3">
        <span className="font-medium text-foreground">Eligibility:</span> {s.eligibility}
      </p>

      {/* Gender + Year tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {s.genderEligibility !== "Any" && (
          <span className="text-xs px-2 py-0.5 rounded-full border bg-pink-50 text-pink-700 border-pink-200 font-medium">
            {s.genderEligibility}
          </span>
        )}
        {s.yearEligibility && (
          <span className="text-xs px-2 py-0.5 rounded-full border bg-indigo-50 text-indigo-700 border-indigo-200 font-medium">
            {s.yearEligibility}
          </span>
        )}
        {s.deadline && (
          <span className="text-xs px-2 py-0.5 rounded-full border bg-red-50 text-red-600 border-red-200 font-medium">
            Deadline: {s.deadline}
          </span>
        )}
      </div>

      {/* Apply + Calendar sync */}
      <div className="mt-auto flex items-center gap-2">
        <a
          href={s.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button className="w-full h-8 text-xs gap-1.5 bg-navy text-white hover:bg-navy/90">
            Apply Now
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </a>
        <CalendarSyncButton scholarship={s} />
      </div>
    </div>
  );
}