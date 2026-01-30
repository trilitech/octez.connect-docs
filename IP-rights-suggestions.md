# IP rights and public documentation — suggestions

This document provides pragmatic, non-legal suggestions to reduce the risk of intellectual-property or trademark conflicts when publishing documentation that previously used the Beacon name and `@airgap` package references.

High-level guidance
- Use factual descriptions: Explain what the original Beacon project provided and clearly mark historical references as such.
- Replace package strings and branding in code examples with the new names (`@tezos-x/octez.connect-*`) where you control the packages.
- Keep a short "About the original project" section where you explicitly state attribution (e.g., "Previously published by AirGap as Beacon / @airgap/*"). This helps with transparency.

Practical steps to reduce risk
1. Replace package import strings and references in code examples (this repo) to the new `@tezos-x/octez.connect-*` names.
2. Remove or avoid using AirGap logos and trademarked artwork unless you have explicit permission.
3. Where the docs must refer to the old project for historical context, label those sections as "Legacy / historical" and avoid implying endorsement.
4. For copy/paste code snippets that mirror original project code, prefer writing idiomatic examples that use the new package names and cite the original project in a short note.

Legal cautions (non-legal summary)
- Renaming package references in documentation does not by itself change copyright or trademark ownership. For legal certainty, consult qualified counsel.
- If content (text, images, diagrams) was originally authored by the Beacon project and you do not hold rights, either get permission, substantially rewrite, or remove the content.

Operational suggestions
- Maintain a separate “attribution” or “credits” page documenting original authors and licenses.
- When publishing the site (especially if it will replace or duplicate docs.walletbeacon.io), verify hosting and domain alignment to avoid confusing users about official ownership.
- If you plan to publish packages under `@tezos-x`, ensure package names are available and that source code licensing is compatible with your intended usage.

If you want, I can:
- Scan the repo for images, logos or other non-code assets that might require permission.
- Produce a short "legacy attribution" snippet to include on the site.
