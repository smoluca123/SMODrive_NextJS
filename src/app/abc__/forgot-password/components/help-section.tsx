import Link from 'next/link';

export function HelpSection() {
  return (
    <div className="text-center text-xs text-muted-foreground">
      <p>
        Still having trouble?{' '}
        <Link href="/contact" className="hover:underline">
          Contact support
        </Link>
      </p>
    </div>
  );
}
