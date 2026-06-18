AutoPin Report V38.1 - Mobile Header Alignment Fix

What changed:
- Desktop and tablet navigation preserved exactly.
- Mobile hamburger header retained.
- Mobile Start Project button moved fully inside the screen and reduced slightly so it does not get clipped on iPhone/Safari/WhatsApp browser.
- Contact email remains: Hello.AutoPinhelp@gmail.com
- Browser local saving remains enabled via localStorage.
- No design, workflow, reporting, PDF, save, or project-management changes.

Important:
Deploy this full folder to GitHub/Vercel. Do not test by opening index.html from the iPhone Files app, because local file preview can block JavaScript and assets.

After deployment:
1. Open https://autopin-report.vercel.app/ on mobile Safari/Chrome.
2. Hard refresh the page.
3. Confirm hamburger menu opens/closes.
4. Confirm Start Project is fully visible on the top-right.
5. Confirm Save Progress / Continue Later works on the same browser/device.
