import { Logo } from '@/components/logo';
import { LoginForm } from './components/login-form';
import { Footer } from './components/footer';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100dvh-4rem-1px)] bg-gradient-to-br from-primary/5 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Logo />
        <LoginForm />
        <Footer />
      </div>
    </div>
  );
}
