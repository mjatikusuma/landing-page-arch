# Architek — Minimalist Architecture & Spatial Design Landing Page

Architek is an ultra-minimalist, modern, dark-themed responsive architectural agency portfolio landing page. Inspired by the **Architek Framer Template**, it is built entirely using vanilla modern frontend standards: **HTML5, CSS3, and ES6 Javascript**.

It contains zero compiler overhead, loads instantly, integrates beautiful typography (Outfit & Plus Jakarta Sans), sleek layouts (Flexbox & Grid), glassmorphic elements, infinite client marquee scrolling, hover effects, and fade-in scroll reveal animations using the Intersection Observer API.

---

## 📂 Project Structure

```text
landing-page-arch/
├── assets/
│   ├── hero.jpg             # Stunning dusk modern architecture render
│   ├── project-1.jpg        # Cantilevered lake villa render
│   ├── project-2.jpg        # Concrete interior shadow study render
│   └── project-3.jpg        # Public timber pavilion render
├── index.html               # Main page layout & SEO tags
├── styles.css               # Theme styling, layout, variables & animations
├── script.js                # Interactions, navbar sticky, filters & reveals
├── push-to-github.ps1       # Deployment script using GitHub API
└── README.md                # Project documentation
```

---

## 💻 Local Preview

To view the landing page locally:
1. Double-click the `index.html` file in your explorer to open it directly in any modern browser.
2. Alternatively, you can use any light static server extension (e.g., Live Server in VS Code) to serve the folder.

---

## 🚀 Push to GitHub Repository

Since Git is not globally configured in some workspace sandboxes, we have provided an automated PowerShell script that utilizes the **GitHub REST API** to push your files.

### Using the API Deployment Script:
1. Open a PowerShell terminal in the project directory.
2. Run the script:
   ```powershell
   ./push-to-github.ps1
   ```
3. Input your **GitHub Personal Access Token (PAT)** when prompted.
   > **Note**: You can generate a PAT in your GitHub settings under **Developer settings > Personal access tokens > Tokens (classic)**. Make sure to check the `repo` scope.
4. The script will automatically encode your assets and push them directly to your repository: `https://github.com/mjatikusuma/landing-page-arch.git`.

### Using Manual Git:
If you have Git installed on your host machine:
```bash
git init
git add .
git commit -m "Initial commit: Architek premium landing page"
git branch -M main
git remote add origin https://github.com/mjatikusuma/landing-page-arch.git
git push -u origin main --force
```

---

## 🌐 Deploying to Cloudflare Pages

Cloudflare Pages supports static websites natively with fast globally-distributed load speeds.

1. Go to your **Cloudflare Dashboard** and select **Workers & Pages**.
2. Click **Create Application** and choose the **Pages** tab.
3. Click **Connect to Git** and select your repository: `mjatikusuma/landing-page-arch`.
4. In the Set up builds and deployments configuration:
   - **Framework preset**: `None`
   - **Build command**: (Leave blank)
   - **Build output directory**: `/` (or leave blank to deploy root)
5. Click **Save and Deploy**.
6. Cloudflare will automatically build and assign a free custom domain (e.g. `landing-page-arch.pages.dev`) for your website!
