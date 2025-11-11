# Fooocus Web Platform

A secure, authenticated web interface for Fooocus AI image generation with one-click Google Colab integration.

## What This Is

A Next.js web app that provides:
- **Simple authentication** (cankat & alperen users)
- **One-click Colab launch** - Start Fooocus with a single button
- **Auto-reconnect** - Saves your Gradio link for easy access
- **Clean, responsive UI** that works on any device

## Quick Start (Easiest Method)

### 1. Deploy to Vercel

```bash
# Clone and install
git clone https://github.com/YOUR_USERNAME/fooocus-vercel.git
cd fooocus-vercel
npm install

# Deploy
npm i -g vercel
vercel login
vercel --prod
```

That's it! Your platform is now live at `https://your-app.vercel.app`

### 2. Use the Platform

1. Visit your Vercel URL
2. Login with:
   - **Username:** `cankat` | **Password:** `cankat123`
   - **Username:** `alperen` | **Password:** `alperen123`
3. Click **"Launch Fooocus in Google Colab"**
4. In Colab, click **Runtime → Run all** (or Ctrl+F9)
5. Wait 2-3 minutes for Fooocus to start
6. Copy the Gradio link (e.g., `https://abc123.gradio.live`)
7. Paste it in your web app and click **Connect**
8. Start generating images!

## How It Works

```
┌─────────┐         ┌─────────┐         ┌──────────────┐
│  User   │────────▶│ Vercel  │────────▶│Google Colab  │
│ Browser │◀────────│ (Auth)  │◀────────│  (Fooocus)   │
└─────────┘         └─────────┘         └──────────────┘
    │                    │                      │
  Login            Validates              Free GPU
  Page            Credentials             Gradio Link
```

## Features

### 1. One-Click Colab Launch
- Button opens Fooocus Colab notebook
- No installation or setup required
- Free GPU provided by Google

### 2. Persistent Connection
- Saves Gradio URL in browser
- Auto-reconnects when you return
- Easy disconnect/reconnect

### 3. Secure Authentication
- Only authorized users (cankat & alperen)
- Session-based cookies
- HTTPS enforced

### 4. Clean Interface
- Material Design inspired
- Responsive for mobile/desktop
- Loading states and error handling

## Using Google Colab (Free)

### Pros
- **Free** - No cost
- **No setup** - Works in browser
- **Good GPU** - T4 or better
- **One-click launch** from the web app

### Cons
- **Session expires** after ~12 hours of inactivity
- **Need to restart** and get new Gradio link
- **Can't run 24/7** without interaction

### How to Keep Colab Running
1. Keep the Colab tab open
2. Occasionally interact with it (prevents timeout)
3. Or restart when needed (takes 2-3 minutes)

## Alternative: 24/7 Hosting

For always-on access, you can host Fooocus on:

### Option 1: Vast.ai (Cheapest)
**Cost:** $0.10-0.40/hour (~$70-290/month)

```bash
# On Vast.ai instance
git clone https://github.com/lllyasviel/Fooocus.git
cd Fooocus
python entry_with_update.py --listen 0.0.0.0

# Use ngrok or cloudflare tunnel
cloudflared tunnel --url http://localhost:7865
```

### Option 2: RunPod
**Cost:** $0.30-0.80/hour (~$220-580/month)

Same setup as Vast.ai

### Option 3: Your Own PC
**Cost:** Electricity only (~$10-30/month)

Requirements:
- Nvidia GPU (GTX 1060 6GB minimum)
- Keep PC running 24/7
- Use ngrok/cloudflare tunnel for public access

See `DEPLOYMENT.md` for detailed setup.

## Configuration

### Change Login Credentials

Edit `lib/auth.ts`:

```typescript
const VALID_USERS = new Map([
  ['cankat', 'YOUR_NEW_PASSWORD'],
  ['alperen', 'YOUR_NEW_PASSWORD'],
]);
```

Redeploy: `vercel --prod`

### Add More Users

Edit `lib/auth.ts`:

```typescript
const VALID_USERS = new Map([
  ['cankat', 'cankat123'],
  ['alperen', 'alperen123'],
  ['newuser', 'newpass'],  // Add here
]);
```

### Customize Colors

Edit CSS files:
- `app/login/login.module.css` - Login page
- `app/page.module.css` - Main page
- `components/FooocusFrame.module.css` - Fooocus interface

Current gradient: `#667eea` → `#764ba2` (purple)
Colab button: `#F9AB00` → `#F57C00` (orange)

## Development

### Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

### Project Structure

```
fooocus-vercel/
├── app/
│   ├── api/auth/          # Login/logout API
│   ├── login/             # Login page
│   ├── page.tsx           # Main page
│   └── layout.tsx         # Root layout
├── components/
│   ├── FooocusFrame.tsx   # Fooocus interface
│   └── LogoutButton.tsx   # Logout button
├── lib/
│   └── auth.ts            # Auth logic
└── vercel.json            # Vercel config
```

## Troubleshooting

### "Launch Fooocus" button does nothing
- Check if pop-ups are blocked
- Enable pop-ups for your domain
- Try right-click → Open in new tab

### Can't connect to Gradio link
- Make sure Fooocus is running in Colab
- Check the link is copied correctly
- Verify link starts with `https://`
- Try opening the Gradio link directly first

### "Failed to load Fooocus"
- Gradio link may have expired (Colab session ended)
- Restart Colab and get a new link
- Check browser console for errors

### Iframe shows blank/error
- Some browsers block third-party iframes
- Try in Chrome or Firefox
- Check if Gradio link works directly

### Colab session keeps disconnecting
- Colab free tier has idle timeout (~12 hours)
- Keep the tab active
- Consider upgrading to Colab Pro ($10/month for longer sessions)
- Or use a dedicated GPU server for 24/7 access

### Lost my saved Gradio link
- Saved in browser localStorage
- Clearing browser data removes it
- Just reconnect with a new link

## Cost Comparison

### Option 1: Google Colab (Recommended for casual use)
- **Cost:** Free
- **Uptime:** Need to restart every ~12 hours
- **Best for:** Occasional use, testing, learning

### Option 2: Vast.ai (Best value for 24/7)
- **Cost:** ~$70-290/month
- **Uptime:** 24/7
- **Best for:** Regular use, sharing with friends

### Option 3: RunPod
- **Cost:** ~$220-580/month
- **Uptime:** 24/7
- **Best for:** Professional use, high reliability

### Option 4: Own PC
- **Cost:** ~$10-30/month (electricity)
- **Uptime:** As long as PC runs
- **Best for:** Already have gaming PC with good GPU

All options use **Vercel for free** (hosting the web interface).

## Security Notes

### Current Security
- ✅ HTTPS enforced (Vercel)
- ✅ HttpOnly session cookies
- ✅ 7-day session expiry
- ⚠️ Simple password auth (stored in code)

### Recommended for Production
- Use bcrypt for password hashing
- Store credentials in environment variables
- Add rate limiting
- Enable 2FA
- Use database for user management

For now, simple auth is fine for personal use with trusted users (cankat & alperen).

## URL Persistence

The app automatically saves your Gradio URL in browser localStorage:
- **Persists** across page refreshes
- **Survives** browser restarts
- **Stored** locally in your browser
- **Cleared** when you click Disconnect

This means you only need to paste the Gradio link once!

## Tips & Tricks

### Quick Restart
If your Colab session expires:
1. Click **Disconnect** in the web app
2. Go back to Colab tab
3. Click **Runtime → Restart and run all**
4. Wait 2-3 minutes
5. Copy new Gradio link
6. Paste and reconnect

### Share with Friends
- Send them your Vercel URL
- Give them their username/password
- They can use your Colab session (if running)
- Or they can launch their own Colab

### Mobile Access
- Works great on phone/tablet
- Same login credentials
- Responsive design
- Full Fooocus features

## Support

- **App issues:** Create GitHub issue
- **Fooocus problems:** [Fooocus GitHub](https://github.com/lllyasviel/Fooocus)
- **Vercel help:** [Vercel Docs](https://vercel.com/docs)
- **Colab help:** [Colab FAQ](https://research.google.com/colaboratory/faq.html)

## License

MIT

---

**Ready to start?** Deploy to Vercel and start generating images! 🚀
