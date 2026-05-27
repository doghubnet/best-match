import { Link, Outlet } from 'react-router-dom'
const items=['/app','/app/profile','/app/program-match','/app/documents','/app/bank','/app/interview','/app/report','/app/consultant','/app/tasks','/app/settings','/app/admin']
export default function AppLayout(){return <div className='min-h-screen bg-slate-950 text-slate-100'><div className='container py-4 flex flex-wrap gap-3 border-b border-slate-800'>{items.map(i=><Link key={i} to={i} className='text-sm px-2 py-1 rounded bg-slate-800'>{i.replace('/app','App')}</Link>)}</div><main className='container py-8'><Outlet/></main></div>}
