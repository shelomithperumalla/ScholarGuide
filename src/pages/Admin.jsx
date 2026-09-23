import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const ADMIN_EMAILS = [
  "perumallabalashelomith123@gmail.com",
  "galenaphose@gmail.com",
  "galenaphos@gmail.com",
  "sudheersamudrala56@gmail.com",
  "madakapoojasri@gmail.com",
];
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Plus, Trash2, Pencil, Shield, GraduationCap, X,
  Search, ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const branchOptions = ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'Any'];
const categoryOptions = ['alumni', 'other', 'government', 'private'];
const sourceOptions = ['JNTUA CEA', 'Buddy4Study', 'NSP (scholarships.gov.in)', 'RDT', 'Other'];
const genderOptions = ['Girls Only', 'Boys Only', 'Any'];

const emptyForm = {
  name: '', institutedBy: '', inMemoryOf: '', amount: '',
  beneficiaries: '', beneficiaryCount: '', eligibility: '',
  branch: 'Any', genderEligibility: 'Any', yearEligibility: '',
  category: 'other', source: 'JNTUA CEA', applyUrl: '', deadline: '', tags: '',
};

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    base44.auth.me().then((u) => {
      const isAdminUser = (u?.email && ADMIN_EMAILS.includes(u.email.toLowerCase())) || u?.role === 'admin';
      if (!isAdminUser) {
        navigate('/dashboard');
        return;
      }
      setUser(u);
      loadScholarships();
    }).catch(() => navigate('/login'));
  }, []);

  const loadScholarships = async () => {
    setLoading(true);
    const data = await base44.entities.Scholarship.list('-created_date', 100);
    setScholarships(data);
    setLoading(false);
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (s) => {
    setForm({
      name: s.name || '',
      institutedBy: s.institutedBy || '',
      inMemoryOf: s.inMemoryOf || '',
      amount: s.amount || '',
      beneficiaries: s.beneficiaries || '',
      beneficiaryCount: s.beneficiaryCount || '',
      eligibility: s.eligibility || '',
      branch: s.branch || 'Any',
      genderEligibility: s.genderEligibility || 'Any',
      yearEligibility: s.yearEligibility || '',
      category: s.category || 'other',
      source: s.source || 'JNTUA CEA',
      applyUrl: s.applyUrl || '',
      deadline: s.deadline || '',
      tags: (s.tags || []).join(', '),
    });
    setEditingId(s.id);
    setShowForm(true);
  };

  const update = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      ...form,
      beneficiaryCount: form.beneficiaryCount ? Number(form.beneficiaryCount) : undefined,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    };
    if (editingId) {
      await base44.entities.Scholarship.update(editingId, data);
    } else {
      await base44.entities.Scholarship.create(data);
    }
    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    loadScholarships();
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    await base44.entities.Scholarship.delete(id);
    setDeletingId(null);
    setConfirmDelete(null);
    loadScholarships();
  };

  const filtered = scholarships.filter((s) => {
    const q = search.toLowerCase();
    return !q || s.name?.toLowerCase().includes(q) || s.institutedBy?.toLowerCase().includes(q);
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice(page * perPage, (page + 1) * perPage);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-navy" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-gold" />
            <h1 className="font-display text-3xl font-bold text-navy">Admin Panel</h1>
          </div>
          <p className="text-muted-foreground text-sm">Manage scholarships — add, edit, or remove entries</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{scholarships.length}</span> scholarships
          </span>
          <Button onClick={openAdd} className="bg-navy text-white hover:bg-navy/90 gap-2">
            <Plus className="w-4 h-4" />
            Add Scholarship
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or donor..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          className="pl-9 h-9"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-5 py-3 font-semibold text-foreground">Name</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground hidden md:table-cell">Source</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-semibold text-foreground">Amount</th>
                <th className="text-right px-5 py-3 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-muted-foreground">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading...
                  </td>
                </tr>
              ) : paged.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-muted-foreground">
                    <GraduationCap className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    {search ? 'No scholarships match your search' : 'No scholarships yet. Add your first one!'}
                  </td>
                </tr>
              ) : (
                paged.map((s) => (
                  <tr key={s.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-foreground line-clamp-1">{s.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{s.institutedBy}</p>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium",
                        s.source === 'JNTUA CEA' ? 'bg-navy/10 text-navy' :
                        s.source === 'Buddy4Study' ? 'bg-orange-100 text-orange-700' :
                        s.source === 'NSP (scholarships.gov.in)' ? 'bg-blue-100 text-blue-700' :
                        'bg-teal-100 text-teal-700'
                      )}>
                        {s.source}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium capitalize",
                        s.category === 'government' ? 'bg-emerald-100 text-emerald-700' :
                        s.category === 'private' ? 'bg-violet-100 text-violet-700' :
                        s.category === 'alumni' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      )}>
                        {s.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-medium text-foreground">{s.amount}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(s)}
                          className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-navy transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(s)}
                          disabled={deletingId === s.id}
                          className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          {deletingId === s.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-border">
            <span className="text-xs text-muted-foreground">
              Page {page + 1} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline" size="sm"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline" size="sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-2xl my-8 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold text-navy">
                {editingId ? 'Edit Scholarship' : 'Add New Scholarship'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label className="text-sm font-medium">Scholarship Name *</Label>
                  <Input value={form.name} onChange={(e) => update('name', e.target.value)}
                    placeholder="e.g. Dr. XYZ Memorial Scholarship" required className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Instituted By</Label>
                  <Input value={form.institutedBy} onChange={(e) => update('institutedBy', e.target.value)}
                    placeholder="Person or organization" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">In Memory Of</Label>
                  <Input value={form.inMemoryOf} onChange={(e) => update('inMemoryOf', e.target.value)}
                    placeholder="Honoree name" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Amount *</Label>
                  <Input value={form.amount} onChange={(e) => update('amount', e.target.value)}
                    placeholder="e.g. ₹25,000/year" required className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Beneficiary Count</Label>
                  <Input type="number" value={form.beneficiaryCount} onChange={(e) => update('beneficiaryCount', e.target.value)}
                    placeholder="e.g. 50" className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-sm font-medium">Beneficiaries</Label>
                  <Input value={form.beneficiaries} onChange={(e) => update('beneficiaries', e.target.value)}
                    placeholder="Who benefits and how" className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-sm font-medium">Eligibility</Label>
                  <Input value={form.eligibility} onChange={(e) => update('eligibility', e.target.value)}
                    placeholder="Eligibility criteria" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Branch</Label>
                  <select value={form.branch} onChange={(e) => update('branch', e.target.value)}
                    className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    {branchOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Gender Eligibility</Label>
                  <select value={form.genderEligibility} onChange={(e) => update('genderEligibility', e.target.value)}
                    className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    {genderOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Year Eligibility</Label>
                  <Input value={form.yearEligibility} onChange={(e) => update('yearEligibility', e.target.value)}
                    placeholder="e.g. 2nd Year" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Category *</Label>
                  <select value={form.category} onChange={(e) => update('category', e.target.value)}
                    className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    {categoryOptions.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Source</Label>
                  <select value={form.source} onChange={(e) => update('source', e.target.value)}
                    className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    {sourceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Apply URL</Label>
                  <Input value={form.applyUrl} onChange={(e) => update('applyUrl', e.target.value)}
                    placeholder="https://..." className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Deadline</Label>
                  <Input value={form.deadline} onChange={(e) => update('deadline', e.target.value)}
                    placeholder="e.g. 31 Jul 2026" className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-sm font-medium">Tags (comma-separated)</Label>
                  <Input value={form.tags} onChange={(e) => update('tags', e.target.value)}
                    placeholder="e.g. merit, engineering, SC/ST" className="mt-1" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="bg-navy text-white hover:bg-navy/90">
                  {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setConfirmDelete(null)} />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-destructive" />
            </div>
            <h2 className="font-heading text-lg font-bold text-foreground mb-1">Delete Scholarship?</h2>
            <p className="text-muted-foreground text-sm mb-5">
              &ldquo;{confirmDelete.name}&rdquo; will be permanently removed from the database. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                disabled={deletingId === confirmDelete.id}
                className="flex-1 border border-border text-muted-foreground py-2.5 rounded-xl text-sm hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                disabled={deletingId === confirmDelete.id}
                className="flex-1 bg-destructive text-destructive-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-destructive/90 transition-colors"
              >
                {deletingId === confirmDelete.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}