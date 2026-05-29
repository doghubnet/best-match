import { useAuth } from '@/lib/auth';
export default function Admin(){const {user}=useAuth();if(user?.role!=='admin') return <div className='card'>Admin access required.</div>; return <div className='card'><h1 className='text-3xl'>Admin Panel</h1><p>Protected metrics visible to admin role only.</p></div>}
