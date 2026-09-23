import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, GraduationCap, Sparkles, ArrowRight, Clock, Compass } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import Explore from '@/pages/Explore';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    base44.auth.me().then((u) => {
      setUser(u);
      setSavedIds(u?.savedScholarships || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-border border-t-navy rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Greeting bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy">
            Welcome back, {user?.full_name?.split(' ')[0] || 'Scholar'} 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {user?.college ? `${user.college}` : 'Your scholarship dashboard'}
            {user?.branch ? ` · ${user.branch}` : ''}
            {user?.year ? ` · ${user.year} Year` : ''}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/jntua-cea"
            className="inline-flex items-center gap-2 bg-navy text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-navy/90 transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            JNTUA CEA
          </Link>
          <Link
            to="/saved"
            className="inline-flex items-center gap-2 border border-border text-foreground text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-secondary transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            Saved ({savedIds.length})
          </Link>
        </div>
      </div>

      {/* Explore content embedded */}
      <Explore />
    </div>
  );
}