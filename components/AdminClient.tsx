'use client';

import { useState } from 'react';
import { PropertyAdmin } from '@/components/PropertyAdmin';
import type { Property, SiteSettings } from '@/types';

export function AdminClient({
  initialProperties,
  initialSettings,
}: {
  initialProperties: Property[];
  initialSettings: SiteSettings;
}) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const adminFetch = (url: string, method: string, body?: unknown) =>
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPassword },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });

  const addProperty = async (newProperty: Property) => {
    const res = await adminFetch('/api/admin/properties', 'POST', newProperty);
    if (res.ok) setProperties((prev) => [newProperty, ...prev]);
  };

  const updateProperty = async (updated: Property) => {
    const res = await adminFetch('/api/admin/properties', 'PUT', updated);
    if (res.ok) setProperties((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProperty = async (id: string) => {
    const res = await adminFetch(`/api/admin/properties?id=${encodeURIComponent(id)}`, 'DELETE');
    if (res.ok) setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const updateSettings = async (newSettings: SiteSettings) => {
    const res = await adminFetch('/api/admin/settings', 'POST', newSettings);
    if (res.ok) setSettings(newSettings);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      if (res.ok) {
        setAdminPassword(passwordInput);
        setIsAuthenticated(true);
        setLoginError(false);
      } else {
        setLoginError(true);
        setTimeout(() => setLoginError(false), 2000);
      }
    } catch {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="flex-1 pt-40 pb-24 px-6 bg-neutral-100 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-12 rounded-[2.5rem] shadow-2xl border border-neutral-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold serif italic mb-2">CMS Access</h1>
            <p className="text-neutral-400 text-sm">Authorized Personnel Only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              placeholder="Password"
              className={`w-full p-4 border rounded-xl outline-none text-center text-xl transition-all ${loginError ? 'border-red-500' : 'border-neutral-200'}`}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-4 bg-lake text-white font-black rounded-xl hover:bg-neutral-800 transition-colors uppercase tracking-widest text-xs"
            >
              Unlock Backend
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 pt-40 pb-24 px-6 bg-neutral-100 min-h-screen flex items-center justify-center">
      <PropertyAdmin
        properties={properties}
        onAdd={addProperty}
        onUpdate={updateProperty}
        onDelete={deleteProperty}
        settings={settings}
        onUpdateSettings={updateSettings}
        adminPassword={adminPassword}
        onLogout={() => {
          setIsAuthenticated(false);
          setPasswordInput('');
          setAdminPassword('');
        }}
      />
    </main>
  );
}
