# Deploy Fooocus to Hugging Face Spaces

This guide shows how to deploy your own Fooocus instance on Hugging Face Spaces with **free GPU**.

## Why Hugging Face Spaces?

- ✅ **Free GPU** (T4 GPU included)
- ✅ **Always-on** (no session timeouts like Colab)
- ✅ **Public URL** (permanent link)
- ✅ **No setup** (fully managed)
- ✅ **Gradio native** (perfect for Fooocus)

## Quick Deploy (5 minutes)

### Step 1: Create Hugging Face Account

1. Go to [huggingface.co](https://huggingface.co)
2. Sign up for free account
3. Verify your email

### Step 2: Create a New Space

1. Click **"New Space"** at [huggingface.co/spaces](https://huggingface.co/spaces)
2. Fill in:
   - **Name:** `fooocus` (or your choice)
   - **License:** MIT
   - **SDK:** Gradio
   - **Hardware:** T4 small (FREE) or upgrade for faster
3. Click **"Create Space"**

### Step 3: Clone Fooocus to Your Space

In your Space settings, open the **Files** tab, then:

**Option A: Using Git (Recommended)**

```bash
# Clone your new Space
git clone https://huggingface.co/spaces/YOUR_USERNAME/fooocus
cd fooocus

# Add Fooocus as remote
git remote add fooocus https://github.com/lllyasviel/Fooocus.git
git pull fooocus main --allow-unrelated-histories

# Push to your Space
git push origin main
```

**Option B: Manual Upload**

1. Download Fooocus: https://github.com/lllyasviel/Fooocus/archive/refs/heads/main.zip
2. Extract the ZIP
3. Upload all files to your Space via the web UI

### Step 4: Configure for Spaces

Create/edit `app.py` in your Space:

```python
import os
import sys

# Set environment for Spaces
os.environ['GRADIO_SERVER_NAME'] = '0.0.0.0'
os.environ['GRADIO_SERVER_PORT'] = '7860'

# Import and run Fooocus
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from webui import *

# This will start the Gradio interface
```

Create `requirements.txt`:

```txt
torch>=2.0.0
torchvision
gradio>=3.50.0
Pillow
numpy
opencv-python
omegaconf
einops
pytorch_lightning
transformers
safetensors
accelerate
```

Create `README.md` (for Space description):

```markdown
---
title: Fooocus
emoji: 🎨
colorFrom: purple
colorTo: pink
sdk: gradio
sdk_version: 3.50.0
app_file: app.py
pinned: false
---

# Fooocus AI Image Generator

Running Fooocus on Hugging Face Spaces with free GPU.
```

### Step 5: Wait for Build

- Space will automatically build (takes 5-10 minutes first time)
- Models will download automatically (~6GB)
- GPU will be allocated
- Your app will be live at: `https://huggingface.co/spaces/YOUR_USERNAME/fooocus`

## Integrate with Your Vercel App

### Option 1: Use Your Space URL Directly

1. Once your Space is running, copy the URL
2. In your Vercel app, paste: `https://YOUR_USERNAME-fooocus.hf.space`
3. That's it! It's now your permanent Fooocus URL

### Option 2: Auto-configure Environment Variable

Update your Vercel deployment:

```bash
vercel env add NEXT_PUBLIC_FOOOCUS_URL production
# Enter: https://YOUR_USERNAME-fooocus.hf.space
vercel --prod
```

Then update `components/FooocusFrame.tsx` to auto-load if env is set:

```typescript
const envUrl = process.env.NEXT_PUBLIC_FOOOCUS_URL;

useEffect(() => {
  if (envUrl && envUrl !== 'https://your-fooocus-server.com') {
    setInputUrl(envUrl);
    setFooocusUrl(envUrl);
    setIsConnected(true);
  } else {
    // Load from localStorage
    const savedUrl = localStorage.getItem('fooocus_url');
    if (savedUrl) {
      setInputUrl(savedUrl);
      setFooocusUrl(savedUrl);
      setIsConnected(true);
    }
  }
}, []);
```

## Hugging Face Spaces Tiers

### Free Tier (T4 GPU)
- **Cost:** $0
- **GPU:** Nvidia T4 (16GB VRAM)
- **Sleep:** After 48h of inactivity
- **Speed:** ~30 seconds per image
- **Best for:** Personal use, testing

### Upgraded (A10G GPU)
- **Cost:** ~$0.60/hour (~$430/month if always-on)
- **GPU:** Nvidia A10G (24GB VRAM)
- **Sleep:** Never (stays on)
- **Speed:** ~10-15 seconds per image
- **Best for:** Production, multiple users

### Comparison with Other Options

| Platform | GPU | Cost | Setup | 24/7 |
|----------|-----|------|-------|------|
| **HF Spaces (Free)** | T4 | Free | Easy | Sleeps after 48h |
| **HF Spaces (Paid)** | A10G | $430/mo | Easy | Yes |
| **Google Colab** | T4 | Free | Easy | No (12h limit) |
| **Vast.ai** | Various | $70-290/mo | Medium | Yes |
| **RunPod** | Various | $220-580/mo | Medium | Yes |

## Advantages of HF Spaces

### vs. Google Colab
- ✅ **Permanent URL** (no link changes)
- ✅ **Longer uptime** (48h vs 12h)
- ✅ **No manual restart** needed
- ✅ **Public sharing** easy

### vs. Vast.ai/RunPod
- ✅ **Easier setup** (no SSH, no tunnels)
- ✅ **Free tier** available
- ✅ **Managed platform** (no DevOps)
- ✅ **Automatic scaling**

## Limitations

### Free Tier
- ⚠️ **Sleeps after 48h** of inactivity
- ⚠️ **Slower than paid** GPUs
- ⚠️ **Queue system** if many users
- ⚠️ **Limited resources** (16GB RAM)

### Solutions
- **Keep-alive ping:** Add a cron job to ping your Space every hour
- **Upgrade:** $0.60/hr for always-on A10G
- **Multiple Spaces:** Create backup Spaces

## Keep Your Space Awake (Free Tier)

### Option 1: Vercel Cron Job

Create `app/api/cron/ping-fooocus/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  const fooocusUrl = process.env.NEXT_PUBLIC_FOOOCUS_URL;

  if (fooocusUrl) {
    try {
      await fetch(fooocusUrl);
      return NextResponse.json({ success: true, pinged: fooocusUrl });
    } catch (error) {
      return NextResponse.json({ success: false, error: 'Ping failed' });
    }
  }

  return NextResponse.json({ success: false, error: 'No URL configured' });
}
```

Add to `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/cron/ping-fooocus",
    "schedule": "0 * * * *"
  }]
}
```

This pings your Space every hour to keep it awake.

### Option 2: External Monitor

Use a free service like:
- **UptimeRobot** - Free monitoring
- **Cron-job.org** - Free scheduled jobs
- **Betterstack** - Free uptime monitoring

Set them to ping your Space URL every hour.

## Troubleshooting

### Space is building for too long
- First build takes 5-15 minutes (downloading models)
- Check "Logs" tab for progress
- If stuck >30 min, restart the Space

### "Application Error"
- Check if all files uploaded correctly
- Verify `app.py` exists
- Check Logs for Python errors

### Slow generation
- Free T4 is slower (~30s per image)
- Upgrade to A10G for 3x faster
- Or use persistent storage to cache models

### Space went to sleep
- Free tier sleeps after 48h no activity
- Click the Space URL to wake it up (takes 1-2 min)
- Or set up keep-alive ping

## Alternative: Replicate API

If you want fully serverless (pay per use):

1. Fork Fooocus on Replicate
2. Get API key
3. Call from Vercel API route
4. No iframe needed, pure API

Cost: ~$0.02-0.05 per image (cheapest for low usage)

See `REPLICATE_INTEGRATION.md` for details (to be created).

## Best Recommendation

**For you (Cankat & Alperen):**

### Option 1: Free (Casual Use)
- Deploy to HF Spaces (Free T4)
- Set up keep-alive ping
- Use when Space is awake
- Cost: **$0/month**

### Option 2: Reliable (Regular Use)
- Deploy to HF Spaces (A10G - $0.60/hr)
- Set to "always on"
- Share cost with Alperen
- Cost: **~$215/month each** ($430 total)

### Option 3: Hybrid (Best Value)
- HF Spaces Free for testing
- Vast.ai spot instance for serious work
- Switch between based on needs
- Cost: **$0-100/month**

## Next Steps

1. Create HF account
2. Deploy Space following this guide
3. Get your Space URL
4. Update Vercel with the URL
5. Test the integration
6. Enjoy permanent Fooocus access!

---

**Questions?** Check [HF Spaces Docs](https://huggingface.co/docs/hub/spaces) or create an issue.
