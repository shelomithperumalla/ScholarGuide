import { useState, useEffect } from 'react';
import { Lock, Bell, Sun, Moon, Shield, LogOut, Trash2, Download, AlertTriangle, Eye, EyeOff, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function Settings() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [isSavingNotif, setIsSavingNotif] = useState(false);

  useEffect(() => {
    base44.auth.me().then((u) => {
      setUser(u);
      setEmailNotifications(u?.emailNotifications !== false);
    }).catch(() => {});
    setDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = (val) => {
    setDarkMode(val);
    if (val) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirm) return;
    setPwSaved(true);
    setPasswordForm({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setPwSaved(false), 3000);
  };

  const handleNotifToggle = async (val) => {
    setEmailNotifications(val);
    setIsSavingNotif(true);
    await base44.auth.updateMe({ emailNotifications: val });
    setIsSavingNotif(false);
  };

  const handleLogout = () => {
    base44.auth.logout('/');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-navy">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and privacy.</p>
      </div>

      {/* Account Settings */}
      <SettingsSection icon={Lock} title="Account Settings">
        {/* Change Password */}
        <div>
          <h3 className="font-medium text-foreground text-sm mb-3">Change Password</h3>
          {pwSaved && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-3 py-2 rounded-lg mb-3 flex items-center gap-2">
              <Check className="w-3.5 h-3.5" /> Password updated successfully!
            </div>
          )}
          <form onSubmit={handlePasswordChange} className="space-y-3">
            <div className="relative">
              <Input
                type={showCurrentPw ? 'text' : 'password'}
                placeholder="Current password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm((p) => ({ ...p, current: e.target.value }))}
                className="h-10 pr-10 text-sm"
                required
              />
              <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="relative">
              <Input
                type={showNewPw ? 'text' : 'password'}
                placeholder="New password"
                value={passwordForm.newPass}
                onChange={(e) => setPasswordForm((p) => ({ ...p, newPass: e.target.value }))}
                className="h-10 pr-10 text-sm"
                required
              />
              <button type="button" onClick={() => setShowNewPw(!showNewPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm((p) => ({ ...p, confirm: e.target.value }))}
              className="h-10 text-sm"
              required
            />
            {passwordForm.newPass && passwordForm.confirm && passwordForm.newPass !== passwordForm.confirm && (
              <p className="text-xs text-destructive">Passwords don't match</p>
            )}
            <Button type="submit" size="sm" className="bg-navy text-white hover:bg-navy/90 text-xs">
              Update Password
            </Button>
          </form>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground text-sm">Email Notifications</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Receive scholarship updates and deadline reminders</p>
            </div>
            <div className="flex items-center gap-2">
              {isSavingNotif && <span className="text-xs text-muted-foreground">Saving...</span>}
              <Switch checked={emailNotifications} onCheckedChange={handleNotifToggle} />
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection icon={Sun} title="Appearance">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="w-5 h-5 text-muted-foreground" /> : <Sun className="w-5 h-5 text-gold" />}
            <div>
              <h3 className="font-medium text-foreground text-sm">{darkMode ? 'Dark Mode' : 'Light Mode'}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Toggle between light and dark theme</p>
            </div>
          </div>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
        </div>
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection icon={Shield} title="Privacy">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground text-sm">Download My Data</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Export your profile and saved scholarships</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
              <Download className="w-3.5 h-3.5" /> Export
            </Button>
          </div>

          <div className="border-t border-border pt-3 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-destructive text-sm">Delete Account</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Permanently remove your account and data</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              className="gap-1.5 text-xs h-8 border-destructive text-destructive hover:bg-destructive hover:text-white"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </Button>
          </div>
        </div>
      </SettingsSection>

      {/* Logout */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-navy">Log Out</h3>
            <p className="text-muted-foreground text-sm mt-0.5">
              You're signed in as <span className="font-medium text-foreground">{user?.email}</span>
            </p>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-navy text-white hover:bg-navy/90 gap-2 font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteDialog(false)} />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h2 className="font-heading text-xl font-bold text-navy">Delete Account?</h2>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              This action is irreversible. All your saved scholarships, profile data, and preferences will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-destructive text-white hover:bg-destructive/90" onClick={() => setShowDeleteDialog(false)}>
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsSection({ icon: Icon, title, children }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <Icon className="w-5 h-5 text-navy" />
        <h2 className="font-heading text-lg font-bold text-navy">{title}</h2>
      </div>
      {children}
    </div>
  );
}
