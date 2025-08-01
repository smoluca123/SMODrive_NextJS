'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { ResponsiveSidebar } from '@/components/responsive-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-collapse sidebar on smaller screens
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="flex max-h-[calc(100dvh-4rem-1px)] bg-background min-h-[calc(100dvh-4rem-1px)] overflow-hidden">
      <ResponsiveSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`flex-1 overflow-auto ${isMobile ? 'pt-16' : ''}`}>
        {children}
      </main>
    </div>
  );
}
