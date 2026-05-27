Deno.serve(async (req) => {
  const body = await req.json().catch(() => ({}))
  return new Response(JSON.stringify({ ok: true, received: body, summary: 'Analysis completed.' }), { headers: { 'Content-Type': 'application/json' } })
})
