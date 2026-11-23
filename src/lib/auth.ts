export const isClerkConfigured = () => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return Boolean(key && !key.includes('placeholder') && key.startsWith('pk_'));
};

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'provider' | 'admin';
  phone: string;
}

export const defaultDemoUsers: Record<string, DemoUser> = {
  customer: {
    id: 'user_cust_001',
    name: 'Devraj Singh',
    email: 'devraj@example.com',
    role: 'customer',
    phone: '+91 98765 43210',
  },
  provider: {
    id: 'user_prov_001',
    name: 'Green Valley Lawn (Owner)',
    email: 'host@greenvalley.com',
    role: 'provider',
    phone: '+91 98222 33445',
  },
  admin: {
    id: 'user_adm_001',
    name: 'UtsavNest Admin',
    email: 'admin@utsavnest.in',
    role: 'admin',
    phone: '+91 98000 11223',
  },
};
