import { ResponsiveStatsGrid } from '@/components/responsive-stats-grid';
import { DollarSign, Download, Eye, FileText } from 'lucide-react';

const stats = [
  {
    title: 'Total Earnings',
    value: '$2,847.50',
    change: '+12.5%',
    icon: DollarSign,
    color: 'text-green-600',
  },
  {
    title: 'Total Downloads',
    value: '12,453',
    change: '+8.2%',
    icon: Download,
    color: 'text-blue-600',
  },
  {
    title: 'Total Views',
    value: '45,672',
    change: '+15.3%',
    icon: Eye,
    color: 'text-purple-600',
  },
  {
    title: 'Active Files',
    value: '28',
    change: '+2',
    icon: FileText,
    color: 'text-orange-600',
  },
];

export function DashboardStats() {
  return <ResponsiveStatsGrid stats={stats} />;
}
