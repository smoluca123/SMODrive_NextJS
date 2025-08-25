import { useGetReferralUsersQuery } from '@/app/(main)/dashboard/referrals/components/recent-referrals-list/querys';
import { ReferralItem } from '@/app/(main)/dashboard/referrals/components/recent-referrals-list/referral-item';
import InfiniteScrollContainer from '@/components/infinite-scroll-container';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { IUserDataType } from '@/lib/types/interfaces/user.interfaces';
import { useDebounce } from '@uidotdev/usehooks';
import { Loader2, Search } from 'lucide-react';
import { useState } from 'react';

export default function RecentReferralsListDialog({
  onClose,
  open,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const { data, isFetching, fetchNextPage, hasNextPage } = useGetReferralUsersQuery({
    userNameOrEmail: debouncedSearchValue,
  });

  const handleDialogClose = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Check if there are no referrals to display
  const hasNoReferrals = data && data.pages[0].data.items.length === 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent>
        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle>Recent Referrals</DialogTitle>
          <DialogDescription>Users who joined through your referral link</DialogDescription>
        </DialogHeader>

        <Separator />

        {/* Search Input */}
        <div className='relative w-full h-9'>
          <Input
            placeholder='Enter username or email'
            className='absolute left-0 right-0 top-0 bottom-0 h-9'
            value={searchValue}
            onChange={handleSearchChange}
          />
          <Search className='size-4 absolute right-3 top-1/2 -translate-y-1/2' />
        </div>

        {/* Infinite Scroll Container for Referrals List */}
        <InfiniteScrollContainer
          isShowInViewElement={hasNextPage}
          onBottomReached={fetchNextPage}
          className='max-h-125 overflow-y-scroll'
        >
          {data?.pages.map((page) =>
            page.data.items.map((referralData) => (
              <ReferralItem key={referralData.id} userData={referralData.user as IUserDataType} />
            )),
          )}
        </InfiniteScrollContainer>

        {/* Empty State Message */}
        {hasNoReferrals && (
          <h1 className='text-center text-muted-foreground'>
            {"You don't have any referrals to show"}
          </h1>
        )}

        {/* Loading Indicator */}
        {isFetching && <Loader2 className='mx-auto text-primary animate-spin' />}
      </DialogContent>
    </Dialog>
  );
}
