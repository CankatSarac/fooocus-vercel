# Fooocus Vercel Platform

A secure authentication wrapper for Fooocus AI image generation, deployed on Vercel.

## Overview

This Next.js application provides:
- Simple username/password authentication
- Secure access to Fooocus via iframe
- Clean, responsive UI
- Easy deployment to Vercel

## Important Note

**Fooocus itself does NOT run on Vercel.** This app provides a secure web interface that connects to your Fooocus instance running elsewhere (Google Colab, RunPod, dedicated server, etc.).

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Login Credentials

Default credentials:
- **Username:** `cankat` | **Password:** `cankat123`
- **Username:** `alperen` | **Password:** `alperen123`

To change credentials, edit `lib/auth.ts`

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push this code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

Follow the prompts to complete deployment.

## How to Use

### Step 1: Start Fooocus with Share Link

You need to run Fooocus somewhere with GPU support. Here are your options:

#### Option A: Google Colab (Recommended for testing)

```python
!pip install pygit2==1.15.1
%cd /content
!git clone https://github.com/lllyasviel/Fooocus.git
%cd /content/Fooocus
!python entry_with_update.py --share --always-high-vram
```

This will generate a Gradio share link like: `https://abc123xyz.gradio.live`

#### Option B: RunPod / Vast.ai / Other GPU Providers

1. Rent a GPU instance
2. Install Fooocus
3. Run with `--share` flag
4. Copy the Gradio link

#### Option C: Local Machine with GPU

```bash
git clone https://github.com/lllyasviel/Fooocus.git
cd Fooocus
python entry_with_update.py --share
```

### Step 2: Access Your Vercel App

1. Go to your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Login with your credentials
3. Paste the Fooocus Gradio link
4. Click "Connect"
5. Start generating images!

## Project Structure

```
fooocus-vercel/
├── app/
│   ├── api/
│   │   └── auth/          # Authentication API routes
│   ├── login/             # Login page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (authenticated)
│   └── globals.css        # Global styles
├── components/
│   ├── FooocusFrame.tsx   # Fooocus iframe component
│   └── LogoutButton.tsx   # Logout button
├── lib/
│   └── auth.ts            # Authentication logic
├── public/                # Static files
├── next.config.js         # Next.js configuration
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies
```

## Security Notes

1. **Change Default Passwords:** The default passwords are for demo purposes only. Change them in `lib/auth.ts` before deploying.

2. **HTTPS Only:** Vercel automatically provides HTTPS, which is required for secure authentication.

3. **Session Cookies:** Authentication uses httpOnly cookies that expire after 7 days.

4. **Gradio Links:** Gradio share links are temporary and expire when you stop the Fooocus process.

## Customization

### Change Credentials

Edit `lib/auth.ts`:

```typescript
const VALID_USERS = new Map([
  ['username1', 'password1'],
  ['username2', 'password2'],
]);
```

### Modify Styles

- Login page: `app/login/login.module.css`
- Main page: `app/page.module.css`
- Fooocus frame: `components/FooocusFrame.module.css`

### Update Branding

Edit the title and colors in:
- `app/layout.tsx` (page title)
- CSS files (color scheme)

## Troubleshooting

### "Cannot connect to Fooocus"

- Make sure Fooocus is running with the `--share` flag
- Verify the Gradio link is still active
- Check that you copied the entire URL

### "Invalid credentials"

- Verify username and password are correct
- Check `lib/auth.ts` for valid credentials

### Iframe not loading

- Some browsers block iframes - check browser console
- Ensure Fooocus is running and accessible
- Try opening the Gradio link directly first

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- React 18
- Vercel for hosting

## License

MIT

## Support

For issues with:
- **This wrapper:** Open an issue in this repository
- **Fooocus itself:** Visit [Fooocus GitHub](https://github.com/lllyasviel/Fooocus)
- **Vercel deployment:** Check [Vercel Docs](https://vercel.com/docs)
