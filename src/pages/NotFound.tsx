import { Link } from 'react-router-dom';
export default function NotFound(){return <main className='container py-16'><div className='card space-y-3'><h1 className='text-3xl'>We could not find that page.</h1><p className='text-slate-300'>Try returning to home and continuing your readiness workflow.</p><Link className='btn inline-block' to='/'>Back home</Link></div></main>}
