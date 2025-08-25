import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { IUserDataType } from '@/lib/types/interfaces/user.interfaces';

interface ReferralItemProps {
  userData: IUserDataType;
}

export function ReferralItem({ userData }: ReferralItemProps) {
  const getInitials = (username: string): string => {
    return username
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  const getFullName = (): string => {
    return `${userData.firstName} ${userData.lastName}`;
  };

  const getJoinedDate = (): string => {
    return new Date(userData.createdAt).toLocaleDateString();
  };

  const getBadgeVariant = () => {
    return userData.isActive ? 'default' : 'secondary';
  };

  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg space-y-3 sm:space-y-0'>
      <div className='flex items-center space-x-4'>
        <Avatar className='flex-shrink-0'>
          <AvatarImage src='/placeholder.png' />
          <AvatarFallback>{getInitials(userData.username)}</AvatarFallback>
        </Avatar>
        <div className='min-w-0 flex-1'>
          <p className='font-medium truncate'>{getFullName()}</p>
          <p className='text-sm text-muted-foreground truncate'>{userData.email}</p>
        </div>
      </div>
      <div className='flex items-center justify-between sm:items-center space-y-2 sm:space-y-0 sm:space-x-4'>
        <div className='text-left sm:text-right'>
          <p className='font-medium'>0</p>
          <p className='text-xs text-muted-foreground'>Joined {getJoinedDate()}</p>
        </div>
        <Badge variant={getBadgeVariant()} className='self-start sm:self-auto'>
          {userData.userRole.roleName}
        </Badge>
      </div>
    </div>
  );
}
