interface FilesToolbarSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterBy: string;
  onFilterChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function FilesToolbarSection({
  searchQuery,
  onSearchChange,
  filterBy,
  onFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: FilesToolbarSectionProps) {
  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
      {/* Search */}
      <input
        type='text'
        placeholder='Search files...'
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className='border rounded-md px-3 py-2 w-full sm:w-64'
      />
      {/* Filter, Sort, View Mode */}
      <div className='flex flex-wrap gap-2 items-center'>
        <select
          value={filterBy}
          onChange={(e) => onFilterChange(e.target.value)}
          className='border rounded-md px-2 py-1'
        >
          <option value='all'>All</option>
          <option value='file'>Files</option>
          <option value='folder'>Folders</option>
          <option value='active'>Active</option>
          <option value='pending'>Pending</option>
          <option value='inactive'>Inactive</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className='border rounded-md px-2 py-1'
        >
          <option value='name'>Name</option>
          <option value='date'>Date</option>
          <option value='size'>Size</option>
          <option value='downloads'>Downloads</option>
        </select>
        <div className='flex gap-1'>
          <button
            className={`px-2 py-1 rounded-md border ${
              viewMode === 'grid' ? 'bg-primary text-white' : ''
            }`}
            onClick={() => onViewModeChange('grid')}
            type='button'
          >
            Grid
          </button>
          <button
            className={`px-2 py-1 rounded-md border ${
              viewMode === 'list' ? 'bg-primary text-white' : ''
            }`}
            onClick={() => onViewModeChange('list')}
            type='button'
          >
            List
          </button>
        </div>
      </div>
    </div>
  );
}
