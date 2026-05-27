import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useAuth } from './lib/auth'

const Page = ({ title }: { title: string }) => <div className="container py-10"><h1 className="text-3xl font-bold">{title}</h1></div>
const Pricing = () => <div className="container py-10 space-y-6"><h1 className="text-3xl font-bold">Pricing</h1><div className="grid md:grid-cols-3 gap-4">{['Free','Pro','Team'].map(t=><div key={t} className="card"><h3 className="text-xl">{t}</h3><p>Plan built for {t.toLowerCase()} users.</p></div>)}</div></div>
const ScanPage = ({ title }: { title: string }) => <div className="container py-10"><h1 className="text-3xl font-bold">{title}</h1><div className="card mt-4"><label className="block">Paste content to analyze</label><textarea className="mt-2 w-full bg-slate-800 rounded p-3 min-h-40" /></div></div>

function Protected() { const { user } = useAuth(); return user ? <Outlet /> : <Navigate to="/login" replace /> }

function AppLayout() { return <div><nav className="border-b border-slate-800"><div className="container py-3 flex gap-4"><a href="/app">Dashboard</a><a href="/pricing">Pricing</a></div></nav><Outlet /></div> }

function Login() { const { login } = useAuth(); return <div className="container py-10"><h1 className="text-3xl font-bold">Login</h1><button className="btn mt-4" onClick={() => login('user@example.com')}>Sign in</button></div> }

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Page title='Brovi Scan Home' />} />
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Page title='Register' />} />
      <Route path='/forgot-password' element={<Page title='Forgot Password' />} />
      <Route path='/reset-password' element={<Page title='Reset Password' />} />
      <Route path='/privacy' element={<Page title='Privacy Policy' />} />
      <Route path='/terms' element={<Page title='Terms of Service' />} />
      <Route element={<Protected />}>
        <Route path='/app' element={<AppLayout />}>
          <Route index element={<Page title='Dashboard' />} />
          <Route path='profile' element={<Page title='Profile' />} />
          <Route path='program-match' element={<ScanPage title='Program Match' />} />
          <Route path='documents' element={<ScanPage title='Document Scan' />} />
          <Route path='bank' element={<ScanPage title='Bank Statement Analysis' />} />
          <Route path='interview' element={<ScanPage title='Interview Analysis' />} />
          <Route path='report' element={<Page title='Readiness Report' />} />
          <Route path='consultant' element={<Page title='Consultant Connect' />} />
          <Route path='tasks' element={<Page title='Tasks' />} />
          <Route path='settings' element={<Page title='Settings' />} />
          <Route path='admin' element={<Page title='Admin' />} />
        </Route>
      </Route>
      <Route path='*' element={<Page title='404 - Page not found' />} />
    </Routes>
  )
}
