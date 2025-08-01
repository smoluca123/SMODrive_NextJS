import { ProfileForm } from './components/profile-form';
import { NotificationSettings } from './components/notification-settings';
import { PrivacySettings } from './components/privacy-settings';
import { SidebarSection } from './components/sidebar-section';

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile, Notification, Privacy (client) */}
        <div className="lg:col-span-2 space-y-6">
          <ProfileForm />
          <NotificationSettings />
          <PrivacySettings />
        </div>
        {/* Sidebar (server) */}
        <SidebarSection />
      </div>
    </div>
  );
}
