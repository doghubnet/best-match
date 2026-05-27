# Build Status

## Environment status (Codex)
`npm install` failed in this environment with:

- `npm ERR! code E403`
- `npm ERR! 403 Forbidden - GET https://registry.npmjs.org/@eslint%2fjs`

This indicates the package registry is blocked by environment/security policy.

## What to verify on Vercel or local machine
Run:

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

Because install is blocked here, final dependency-resolution and build verification must be completed on a machine or CI environment with npm registry access.
