import { useState, useEffect } from 'react';
import { Pencil, Save, X, User, BookOpen, Award } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const branches = ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'Other'];
const years = ['I', 'II', 'III', 'IV'];
const genders = ['Male', 'Female', 'Other'];
const colleges = [
  'JNTUA College of Engineering, Ananthapuramu',
  'JNTUA College of Engineering, Kalikiri',
  'JNTUA College of Engineering, Pulivendula',
  'Other',
];

function getEligibilityTags(user) {
  const tags = [];
  if (!user) return tags;
  if (user.gender === 'Female') tags.push({ label: 'Girl Student', color: 'bg-pink-100 text-pink-700 border-pink-200' });
  if (user.gender === 'Male') tags.push({ label: 'Boy Student', color: 'bg-sky-100 text-sky-700 border-sky-200' });
  if (user.branch) tags.push({ label: `${user.branch} Branch`, color: 'bg-blue-100 text-blue-700 border-blue-200' });
  if (user.year) tags.push({ label: `${user.year} Year`, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' });
  if (user.college?.includes('JNTUA')) tags.push({ label: 'JNTUA Student', color: 'bg-amber-100 text-amber-700 border-amber-200' });
  tags.push({ label: 'Merit Eligible', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' });
  return tags;
}

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    base44.auth.me().then((u) => {
      setUser(u);
      setForm({
        full_name: u?.full_name || '',
        college: u?.college || '',
        branch: u?.branch || '',
        year: u?.year || '',
        gender: u?.gender || '',
      });
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  const update = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSave = async () => {
    setIsSaving(true);
    await base44.auth.updateMe(form);
    const u = await base44.auth.me();
    setUser(u);
    setEditing(false);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setForm({
      full_name: user?.full_name || '',
      college: user?.college || '',
      branch: user?.branch || '',
      year: user?.year || '',
      gender: user?.gender || '',
    });
    setEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-border border-t-navy rounded-full animate-spin" />
      </div>
    );
  }

  const eligibilityTags = getEligibilityTags(editing ? { ...user, ...form } : user);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your personal information and preferences.</p>
        </div>
        {!editing && (
          <Button onClick={() => setEditing(true)} variant="outline" className="gap-2 border-navy text-navy hover:bg-navy hover:text-white">
            <Pencil className="w-4 h-4" /> Edit Profile
          </Button>
        )}
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
          <Award className="w-4 h-4" />
          Profile updated successfully!
        </div>
      )}

      {/* Profile card */}
      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        {/* Avatar banner */}
        <div className="bg-navy px-6 py-8 flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gold/20 border-2 border-gold/30 flex items-center justify-center text-3xl font-bold text-gold font-display">
            {(user?.full_name || 'S')[0].toUpperCase()}
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-white">{user?.full_name || 'Student'}</h2>
            <p className="text-white/60 text-sm mt-0.5">{user?.email}</p>
            {user?.college && (
              <p className="text-white/50 text-xs mt-1">{user.college}</p>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Full Name */}
          <div>
            <Label className="text-foreground font-medium text-sm">Full Name</Label>
            {editing ? (
              <Input value={form.full_name} onChange={(e) => update('full_name', e.target.value)}
                className="mt-1.5 h-10" />
            ) : (
              <p className="mt-1.5 text-foreground">{user?.full_name || '—'}</p>
            )}
          </div>

          {/* Email (read-only) */}
          <div>
            <Label className="text-foreground font-medium text-sm">Email Address</Label>
            <p className="mt-1.5 text-muted-foreground text-sm">{user?.email} <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded ml-1">Read-only</span></p>
          </div>

          {/* College */}
          <div>
            <Label className="text-foreground font-medium text-sm">College</Label>
            {editing ? (
              <select value={form.college} onChange={(e) => update('college', e.target.value)}
                className="mt-1.5 w-full h-10 px-3 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select college</option>
                {colleges.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            ) : (
              <p className="mt-1.5 text-foreground">{user?.college || '—'}</p>
            )}
          </div>

          {/* Branch, Year, Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Branch', field: 'branch', options: branches },
              { label: 'Year', field: 'year', options: years.map(y => ({ value: y, label: `${y} Year` })) },
              { label: 'Gender', field: 'gender', options: genders },
            ].map((item) => (
              <div key={item.field}>
                <Label className="text-foreground font-medium text-sm">{item.label}</Label>
                {editing ? (
                  <select value={form[item.field]} onChange={(e) => update(item.field, e.target.value)}
                    className="mt-1.5 w-full h-10 px-3 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select</option>
                    {item.options.map((o) => {
                      const val = typeof o === 'string' ? o : o.value;
                      const label = typeof o === 'string' ? o : o.label;
                      return <option key={val} value={val}>{label}</option>;
                    })}
                  </select>
                ) : (
                  <p className="mt-1.5 text-foreground">
                    {item.field === 'year' && user?.[item.field] ? `${user[item.field]} Year` : (user?.[item.field] || '—')}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Action buttons */}
          {editing && (
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} disabled={isSaving} className="bg-navy text-white hover:bg-navy/90 gap-2">
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outline" onClick={handleCancel} className="gap-2">
                <X className="w-4 h-4" /> Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* My Eligibility */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-gold" />
          <h2 className="font-heading text-lg font-bold text-navy">My Eligibility</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          Based on your profile, you may be eligible for scholarships in these categories:
        </p>
        {eligibilityTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {eligibilityTags.map((tag) => (
              <span key={tag.label} className={cn(
                "text-sm px-3 py-1.5 rounded-full border font-medium",
                tag.color
              )}>
                {tag.label}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm italic">
            Complete your profile to see your eligibility tags.
          </p>
        )}
      </div>
    </div>
  );
}