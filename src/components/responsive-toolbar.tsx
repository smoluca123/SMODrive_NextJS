'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface ResponsiveToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterBy: string;
  onFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function ResponsiveToolbar({
  searchQuery,
  onSearchChange,
  filterBy,
  onFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: ResponsiveToolbarProps) {
  const FilterControls = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Filter</label>
        <Select value={filterBy} onValueChange={onFilterChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="file">Files</SelectItem>
            <SelectItem value="folder">Folders</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Sort by</label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="size">Size</SelectItem>
            <SelectItem value="downloads">Downloads</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <Card>
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="flex items-center space-x-2 flex-1 sm:max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Mobile Filter Sheet */}
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Filters & Sorting</h3>
                    <FilterControls />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="hidden sm:flex items-center space-x-4">
            <Select value={filterBy} onValueChange={onFilterChange}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="file">Files</SelectItem>
                <SelectItem value="folder">Folders</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="size">Size</SelectItem>
                <SelectItem value="downloads">Downloads</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewModeChange('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile View Mode Toggle */}
          <div className="flex sm:hidden items-center justify-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="flex-1"
            >
              <Grid3X3 className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="flex-1"
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
