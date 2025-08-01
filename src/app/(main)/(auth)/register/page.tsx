import { RegisterForm } from './components/register-form';
import { BenefitsCard } from './components/benefits-card';
import { Logo } from '@/components/logo';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Logo />
        <RegisterForm />
        <BenefitsCard />
      </div>
    </div>
  );
}
