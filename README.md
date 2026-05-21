# Price Field Validation

Small React demo for an advert creation form focused on one production-style field: price.

The field validates a required numeric value from `10` to `100 000 000`, formats thousands with spaces, shows the Thai baht sign as a suffix, and keeps the submitted value normalized as a number.

## Tech

- React + TypeScript + Vite
- Zod for client-side validation
- react-i18next for Russian, English, and Thai messages
- react-number-format for price formatting
- shadcn-style `Field`, `Input`, `Button`, and `ButtonGroup` components

## UX

- Validation runs after blur or submit, so the user is not interrupted on the first keystroke.
- Typed spaces are ignored by the formatter.
- The visible value is formatted, for example `1 000 000 ฿`.
- The internal value remains raw digits and is parsed by Zod before submit.
- Language can be switched with the `RU / EN / TH` button group.

## Scripts

```bash
npm run dev
npm run typecheck
npm run build
```
