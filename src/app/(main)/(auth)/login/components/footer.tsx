import Link from 'next/link';

export function Footer() {
  return (
    <div className="text-center text-xs text-muted-foreground">
      <p>
        By signing in, you agree to our{' '}
        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
