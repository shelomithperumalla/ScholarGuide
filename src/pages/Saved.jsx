import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trash2, ArrowRight, Bookmark, ExternalLink, Calendar } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ScholarshipDetailModal from '@/components/ScholarshipDetailModal';
import CalendarSyncButton from '@/components/CalendarSyncButton';
import { downloadICSFile, hasValidDeadline } from '@/lib/calendarUtils';

export default function Saved() {
  const [user, setUser] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dbScholarships, setDbScholarships] = useState([]);

  useEffect(() => {
    base44.auth.me().then((u) => {
      setUser(u);
      setSavedIds(u?.savedScholarships || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
    base44.entities.Scholarship.list('-created_date', 200).then(setDbScholarships).catch(() => {});
  }, []);

  const allScholarships = dbScholarships;
  const savedScholarships = allScholarships.filter((s) => savedIds.includes(s.id));

  const handleRemove = async (scholarshipId) => {
    const updated = savedIds.filter((id) => id !== scholarshipId);
    setSavedIds(updated);
    await base44.auth.updateMe({ savedScholarships: updated });
  };

  const getStatusBadge = (scholarship) => {
    // Simulate status based on amount
    const amountNum = parseInt(scholarship.amount.replace(/[^0-9]/g, ''));
    if (amountNum >= 1000000) return { label: 'Open', class: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    if (amountNum >= 300000) return { label: 'Closing Soon', class: 'bg-amber-100 text-amber-700 border-amber-200' };
    return { label: 'Open', class: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-border border-t-navy rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy">Saved Scholarships</h1>
          <p className="text-muted-foreground mt-1">
            {savedScholarships.length > 0
              ? `${savedScholarships.length} scholarship${savedScholarships.length !== 1 ? 's' : ''} saved`
              : 'Your saved scholarships will appear here'}
          </p>
        </div>
        {savedScholarships.filter(hasValidDeadline).length > 0 && (
          <button
            onClick={() => downloadICSFile(savedScholarships)}
            className="inline-flex items-center gap-2 bg-navy text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-navy/90 transition-colors shrink-0"
          >
            <Calendar className="w-4 h-4" />
            Sync All Deadlines
          </button>
        )}
      </div>

      {savedScholarships.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-3xl bg-navy/5 flex items-center justify-center mb-6">
            <Bookmark className="w-10 h-10 text-navy/30" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy mb-3">No saved scholarships yet</h2>
          <p className="text-muted-foreground max-w-sm mb-8">
            You haven't saved any scholarships yet. Browse available scholarships and save the ones you're interested in.
          </p>
          <Link
            to="/jntua-cea"
            className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-navy/90 transition-colors"
          >
            Browse Scholarships <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {savedScholarships.map((scholarship) => {
            const status = getStatusBadge(scholarship);
            return (
              <div
                key={scholarship.id}
                className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-heading font-semibold text-foreground text-base leading-snug">
                        {scholarship.name}
                      </h3>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium shrink-0", status.class)}>
                        {status.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="inline-block bg-gold/10 border border-gold/30 text-gold font-bold text-xs px-2.5 py-1 rounded-lg">
                        {scholarship.amount}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {scholarship.branch === 'Any' ? 'Any Branch' : scholarship.branch}
                      </span>
                      <span className="text-xs text-muted-foreground">{scholarship.genderEligibility}</span>
                      {scholarship.yearEligibility && scholarship.yearEligibility !== 'Any' && (
                        <span className="text-xs text-muted-foreground">{scholarship.yearEligibility}</span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                      {scholarship.eligibility}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {scholarship.applyUrl && (
                      <a href={scholarship.applyUrl} target="_blank" rel="noopener noreferrer">
                        <Button
                          size="sm"
                          className="text-xs bg-navy text-white hover:bg-navy/90 h-8 gap-1"
                        >
                          Apply <ExternalLink className="w-3 h-3" />
                        </Button>
                      </a>
                    )}
                    {!scholarship.applyUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedScholarship(scholarship)}
                        className="text-xs text-navy hover:text-navy hover:bg-navy/5 h-8"
                      >
                        Details
                      </Button>
                    )}
                    {scholarship.applyUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedScholarship(scholarship)}
                        className="text-xs text-navy hover:text-navy hover:bg-navy/5 h-8"
                      >
                        Details
                      </Button>
                    )}
                    <CalendarSyncButton scholarship={scholarship} />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemove(scholarship.id)}
                      className="text-xs text-destructive hover:text-destructive hover:bg-destructive/5 h-8 gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedScholarship && (
        <ScholarshipDetailModal
          scholarship={selectedScholarship}
          isSaved={savedIds.includes(selectedScholarship.id)}
          onSave={async (s) => {
            if (savedIds.includes(s.id)) {
              handleRemove(s.id);
            }
            setSelectedScholarship(null);
          }}
          onClose={() => setSelectedScholarship(null)}
        />
      )}
    </div>
  );
}