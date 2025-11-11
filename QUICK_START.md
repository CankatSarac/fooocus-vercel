# Quick Start Guide

Get your Fooocus platform running in 3 simple steps!

## TL;DR

**Fastest way (5 minutes):**
1. Deploy to Vercel: `vercel --prod`
2. Login and click "Launch Fooocus in Google Colab"
3. Paste Gradio link and start generating!

**Best free permanent solution (15 minutes):**
1. Deploy to Vercel: `vercel --prod`
2. Deploy Fooocus to Hugging Face Spaces (see below)
3. Add HF Space URL to Vercel env variable
4. Done - permanent URL, $0/month!

---

## Option 1: With Google Colab (Easiest)

### What You Get
- ✅ Free
- ✅ Works immediately
- ✅ No configuration
- ❌ Need to restart every ~12 hours

### Steps

**1. Deploy to Vercel**
```bash
cd fooocus-vercel
npm install
vercel --prod
```

**2. Use Your App**
1. Go to your Vercel URL
2. Login: `cankat` / `cankat123`
3. Click "Launch Fooocus in Google Colab"
4. In Colab: Runtime → Run all
5. Wait 2-3 minutes
6. Copy the Gradio link
7. Paste in your app
8. Generate images!

**Done!** Use anytime, just restart Colab when it expires.

---

## Option 2: With Hugging Face Spaces (Best Free)

### What You Get
- ✅ Free
- ✅ Permanent URL
- ✅ No environment variables needed
- ⚠️ Sleeps after 48h (1-2 min to wake)

### Steps

**1. Create HF Account**
- Go to [huggingface.co](https://huggingface.co)
- Sign up (free)

**2. Create a Space**
- Click "New Space"
- Name: `fooocus`
- SDK: Gradio
- Hardware: T4 small (FREE)
- Create

**3. Clone Fooocus to Space**
```bash
# Clone your Space
git clone https://huggingface.co/spaces/YOUR_USERNAME/fooocus
cd fooocus

# Get Fooocus files
git clone https://github.com/lllyasviel/Fooocus.git temp
mv temp/* .
rm -rf temp

# Create app.py
cat > app.py << 'EOF'
import os
os.environ['GRADIO_SERVER_PORT'] = '7860'

from webui import *
EOF

# Push
git add .
git commit -m "Initial Fooocus setup"
git push
```

**4. Wait for Build** (5-10 minutes)
Your Space will build automatically.

**5. Get Your URL**
Once built, your Fooocus is at:
`https://YOUR_USERNAME-fooocus.hf.space`

**6. Connect Your Vercel App**

Just paste your HF Space URL in the app!

Or set as default:
```bash
vercel env add NEXT_PUBLIC_FOOOCUS_URL production
# Enter: https://YOUR_USERNAME-fooocus.hf.space
vercel --prod
```

**Done!** Now it auto-loads when you login.

---

## Option 3: 24/7 Hosting (Paid)

For always-on access without wake-up delays:

### Hugging Face Spaces (Upgraded)

**Cost:** $430/month (~$215 each if sharing)

```bash
# After creating free Space:
1. Go to Space settings
2. Change hardware to "A10G small"
3. Enable "Always On"
4. Done!
```

### Vast.ai (Cheapest 24/7)

**Cost:** $100-200/month (~$50-100 each if sharing)

See `DEPLOYMENT.md` for full guide.

---

## Comparison

| Method | Cost | Setup Time | Always On | Best For |
|--------|------|------------|-----------|----------|
| **Colab** | Free | 2 min | No | Starting out |
| **HF Spaces Free** | Free | 15 min | Yes* | Personal use |
| **HF Spaces Paid** | $430/mo | 15 min | Yes | Production |
| **Vast.ai** | $100-200/mo | 60 min | Yes | Best value |

*Sleeps after 48h, wakes in 1-2 min

---

## What I Recommend

### For You (Cankat & Alperen)

**Week 1-2:** Start with Google Colab
- Test everything
- See how much you use it
- Costs: $0

**If you like it:** Deploy to HF Spaces (Free)
- 15 minute setup
- Permanent URL
- Still free
- Wake it when needed

**If you use it daily:** Consider Vast.ai or HF Spaces upgrade
- Split the cost
- Always available
- ~$50-215 each/month

---

## Troubleshooting

### Vercel deployment fails
```bash
npm install
vercel --prod
```

### Colab link doesn't work
- Make sure to run all cells in Colab
- Wait for "Running on public URL" message
- Copy the full HTTPS link

### HF Space stuck building
- First build takes 5-15 minutes
- Check "Logs" tab for progress
- If stuck >30 min, restart Space

### Can't connect to iframe
- Check if URL is correct
- Try opening URL directly in browser
- Make sure it starts with `https://`

---

## Next Steps

1. ✅ Choose your hosting method (Colab recommended for start)
2. ✅ Deploy to Vercel
3. ✅ Test the platform
4. ✅ Share with Alperen
5. ✅ Change default passwords (see README.md)
6. ✅ Enjoy generating images!

---

## Need Help?

- **Colab issues:** Check Colab tab for errors
- **HF Spaces:** Read `HUGGINGFACE_DEPLOYMENT.md`
- **24/7 hosting:** Read `HOSTING_OPTIONS.md`
- **Other questions:** Check `README.md`

Happy generating! 🎨
