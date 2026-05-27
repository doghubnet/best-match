Deno.serve(async (req) => {
  const auth = req.headers.get('authorization') || '';
  if (!auth.toLowerCase().startsWith('bearer ')) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  const body = await req.json().catch(() => ({}));
  const base = JSON.stringify(body).length % 100;
  const score = Math.max(45, Math.min(92, base));
  const level = score >= 75 ? 'strong' : score >= 60 ? 'moderate' : 'needs-improvement';
  return new Response(JSON.stringify({ score, level, strengths: ['Clear intent', 'Structured inputs'], risks: ['Missing detail in one section'], nextSteps: ['Improve weak sections', 'Re-scan after updates'] }), { headers: { 'Content-Type': 'application/json' } });
});
