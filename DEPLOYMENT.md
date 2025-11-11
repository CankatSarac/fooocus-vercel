# Quick Deployment Guide

Follow these steps to get your Fooocus platform running 24/7.

## Step 1: Choose Your Hosting Option

### Recommended: Vast.ai (Cheapest)

1. Visit [vast.ai](https://vast.ai)
2. Sign up and add $10-20 credit
3. Click "Search" → Filter:
   - GPU: RTX 3060 or better
   - VRAM: 12GB minimum
   - Sort by: $/hr (lowest first)
4. Click "Rent" on a cheap option ($0.15-0.30/hr)
5. SSH into your instance (credentials provided)

### Alternative: RunPod

1. Visit [runpod.io](https://runpod.io)
2. Sign up and add credits
3. Create pod → RTX 3090 or A4000
4. SSH into instance

## Step 2: Install Fooocus on GPU Server

SSH into your rented server and run:

```bash
# Install dependencies
apt-get update
apt-get install -y git python3-pip screen

# Clone Fooocus
git clone https://github.com/lllyasviel/Fooocus.git
cd Fooocus

# Install requirements
pip install -r requirements.txt

# Start Fooocus in screen (so it stays running)
screen -S fooocus
python entry_with_update.py --listen 0.0.0.0 --port 7865

# Press Ctrl+A then D to detach from screen
```

Fooocus is now running on port 7865.

## Step 3: Expose Fooocus Publicly

### Option A: Ngrok (Easiest)

```bash
# Install ngrok
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | \
  sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | \
  sudo tee /etc/apt/sources.list.d/ngrok.list
sudo apt update && sudo apt install ngrok

# Get free authtoken from ngrok.com
ngrok config add-authtoken YOUR_TOKEN_HERE

# Start tunnel in screen
screen -S ngrok
ngrok http 7865

# Note the HTTPS URL (e.g., https://abc123.ngrok.io)
# Press Ctrl+A then D to detach
```

### Option B: Cloudflare Tunnel (Free, No Signup)

```bash
# Install cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# Start tunnel
screen -S tunnel
cloudflared tunnel --url http://localhost:7865

# Note the HTTPS URL provided
# Press Ctrl+A then D to detach
```

**Save this URL!** You'll need it for Vercel.

## Step 4: Deploy to Vercel

### Quick Method (GitHub)

1. Push this code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/fooocus-vercel.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repo
5. Add Environment Variable:
   - **Name:** `NEXT_PUBLIC_FOOOCUS_URL`
   - **Value:** Your ngrok/cloudflare URL
6. Click "Deploy"

### Alternative: Vercel CLI

```bash
npm install
npm i -g vercel
vercel login
vercel

# Add environment variable
vercel env add NEXT_PUBLIC_FOOOCUS_URL production
# Paste your Fooocus URL

# Deploy to production
vercel --prod
```

## Step 5: Test

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Login:
   - Username: `cankat` | Password: `cankat123`
   - Username: `alperen` | Password: `alperen123`
3. Fooocus should load automatically!

## Keeping It Running 24/7

### Monitor Your Server

SSH back into your server anytime:

```bash
# Check if Fooocus is running
screen -r fooocus

# Check if tunnel is running
screen -r ngrok  # or 'screen -r tunnel' for cloudflare

# List all screens
screen -ls
```

### Auto-Restart on Crash

Create a simple watchdog script:

```bash
nano ~/restart-fooocus.sh
```

Add:

```bash
#!/bin/bash
while true; do
  cd ~/Fooocus
  python entry_with_update.py --listen 0.0.0.0 --port 7865
  echo "Fooocus crashed, restarting in 5 seconds..."
  sleep 5
done
```

Make executable and run:

```bash
chmod +x ~/restart-fooocus.sh
screen -S fooocus
~/restart-fooocus.sh
# Ctrl+A then D to detach
```

### Cost Optimization

- **Pause when not in use:** Stop your GPU instance when sleeping
- **Use spot instances:** 50-70% cheaper (may be interrupted)
- **Downgrade GPU:** RTX 3060 works fine, just slower
- **Share costs:** Split with alperen

## Troubleshooting

### Fooocus won't start
```bash
# Check Python version
python3 --version  # Should be 3.10+

# Reinstall requirements
cd Fooocus
pip install -r requirements.txt --upgrade
```

### Ngrok tunnel dies
- Ngrok free tunnels timeout after 2 hours
- Use Cloudflare Tunnel instead (no timeout)
- Or pay for ngrok ($8/month)

### Vercel shows "Configuration Required"
- Check environment variable is set
- Redeploy: `vercel --prod`
- URL must start with `https://`

### Can't connect to GPU server
- Server may have been stopped (check Vast.ai/RunPod dashboard)
- Restart server and Fooocus
- Update `NEXT_PUBLIC_FOOOCUS_URL` in Vercel if URL changed

## Monthly Costs

Budget example:

- GPU Server (Vast.ai): $100-200/month
- Vercel: Free
- Ngrok (optional): $8/month
- **Total: ~$100-210/month**

Share with alperen → **$50-105/month each**

## Next Steps

- [ ] Change default passwords in `lib/auth.ts`
- [ ] Set up auto-restart scripts
- [ ] Bookmark your Vercel URL
- [ ] Test image generation
- [ ] Enjoy!
