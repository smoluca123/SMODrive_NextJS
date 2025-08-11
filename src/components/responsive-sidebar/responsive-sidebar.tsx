'use client';

import { useState, useEffect } from 'react';
import { SidebarContent, MobileSidebar } from './components';

interface ResponsiveSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function ResponsiveSidebar({
  collapsed,
  onToggle,
}: ResponsiveSidebarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isMobile) {
    return <MobileSidebar />;
  }

  return (
    <div className="hidden md:block">
      <SidebarContent collapsed={collapsed} onToggle={onToggle} />
    </div>
  );
}
