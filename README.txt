AutoPin Report V38 - Design Freeze / Mobile Pilot Fix

What changed:
- Desktop and tablet navigation preserved exactly.
- Mobile (<768px) header uses a compact hamburger menu.
- Mobile Start Project button remains visible and no longer gets clipped on the right edge.
- Contact email remains: Hello.AutoPinhelp@gmail.com
- Browser local saving remains enabled via localStorage.
- No design, workflow, reporting, PDF, save, or project-management changes.

Important:
Deploy this full folder to Vercel/GitHub. Do not test by opening index.html from the iPhone Files app, because local file preview can block JavaScript and assets.

After deployment:
1. Open https://autopin-report.vercel.app/ on mobile Safari/Chrome.
2. Hard refresh the page.
3. Confirm the hamburger menu opens/closes.
4. Confirm Start Project is fully visible.
5. Confirm Save Progress / Continue Later works on the same browser/device.
