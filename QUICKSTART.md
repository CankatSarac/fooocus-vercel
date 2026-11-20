# ⚡ Quick Start Guide

Choose your deployment method and get started in minutes!

---

## 🐳 Option 1: Docker (Local 24/7)

**Run Fooocus on your own PC with public access**

### One-Command Setup
```bash
bash scripts/setup-docker.sh
```

That's it! The script will:
1. ✅ Check Docker installation
2. 🏗️ Build containers
3. 🚀 Start Fooocus
4. 🌐 Create public tunnel
5. 📋 Show you the public URL

### Manual Setup
```bash
# Start containers
docker-compose up -d

# Get your public URL
bash scripts/get-tunnel-url.sh

# View logs
docker-compose logs -f
```

### Access
- **Local:** http://localhost:7865
- **Public:** https://xxx.trycloudflare.com (changes on restart)

---

## 🤗 Option 2: Hugging Face Spaces (Zero Maintenance)

**Deploy to cloud for free, forever**

### Automated Setup
```bash
bash scripts/setup-huggingface.sh
```

Follow the prompts to deploy!

### Manual Setup

1. **Create Space**
   - Go to https://huggingface.co/new-space
   - Name: `fooocus-cpu`
   - SDK: Docker
   - Visibility: Private or Public

2. **Deploy**
   ```bash
   cd huggingface
   git clone https://huggingface.co/spaces/YOUR_USERNAME/fooocus-cpu
   cp Dockerfile README.md fooocus-cpu/
   cd fooocus-cpu
   git add . && git commit -m "Deploy Fooocus" && git push
   ```

3. **Wait 10-15 minutes** for build

4. **Access at:**
   ```
   https://huggingface.co/spaces/YOUR_USERNAME/fooocus-cpu
   ```

---

## 🚂 Option 3: Railway (Professional)

**Deploy with one click**

### Setup

1. **Go to Railway**
   - Visit https://railway.app
   - Sign in with GitHub

2. **New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `fooocus-vercel`

3. **Done!**
   - Railway auto-detects `railway.json`
   - Builds and deploys automatically
   - Get your URL: `https://your-app.railway.app`

### Cost
- Free: 500 hours/month ($5 credit)
- Paid: ~$5-10/month

---

## 🎨 Option 4: Render

**Simple, reliable hosting**

### Setup

1. **Go to Render**
   - Visit https://render.com
   - Sign in with GitHub

2. **New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Choose `fooocus-vercel`

3. **Deploy**
   - Render detects `render.yaml`
   - Click "Create Web Service"
   - Wait 10-15 minutes

4. **Access at:**
   ```
   https://your-app.onrender.com
   ```

### Cost
- Free: 750 hours/month (spins down after 15min)
- Paid: $7/month (always on)

---

## 🔗 Integrate with Your Vercel App

After deploying, update your app to use the new URL:

### Option A: Environment Variable (Recommended)

1. **Add to Vercel**
   ```bash
   vercel env add NEXT_PUBLIC_FOOOCUS_URL
   # Paste your URL when prompted
   ```

2. **Use in code** (`components/FooocusFrame.tsx`)
   ```typescript
   const fooocusUrl = process.env.NEXT_PUBLIC_FOOOCUS_URL || savedUrl;
   ```

3. **Redeploy**
   ```bash
   vercel --prod
   ```

### Option B: Keep Dynamic

Your current setup already works! Just paste any URL:
- Docker tunnel URL
- Hugging Face Space URL
- Railway/Render URL
- Google Colab URL

---

## 📊 Which One Should I Choose?

| Choose | If You Want |
|--------|-------------|
| **Docker** | Fastest speeds, full control, have 24/7 PC |
| **Hugging Face** | Free forever, zero maintenance |
| **Railway** | Easy deployment, good monitoring, can pay $5/mo |
| **Render** | Simple setup, reliable, can pay $7/mo |

---

## 🆘 Troubleshooting

### Docker won't start
```bash
# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Can't find tunnel URL
```bash
# Check logs
docker-compose logs cloudflared

# Or use the helper script
bash scripts/get-tunnel-url.sh
```

### Hugging Face build failed
- Check build logs in the "Building" tab
- Ensure Dockerfile is uploaded correctly
- Try rebuilding from Space settings

### Railway/Render deployment timeout
- Check logs in dashboard
- First build takes 15-20 minutes
- Contact support if stuck

---

## 🎓 Learn More

For detailed guides, see:
- **Complete Options Guide:** `DEPLOYMENT_OPTIONS.md`
- **Hosting Guide:** `HOSTING.md`
- **Main README:** `README.md`

---

## 💡 Pro Tips

1. **Keep models cached:** First run downloads ~4GB. Docker volumes preserve this.

2. **Monitor with UptimeRobot:** Free monitoring at https://uptimerobot.com

3. **Speed up generation:**
   - Use 512x512 images (not 1024x1024)
   - Reduce steps to 20-25 (default 30)
   - Simpler prompts = faster

4. **Backup images:** Your outputs are in `outputs/` folder

5. **Update Fooocus:**
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

---

**Ready?** Choose your method above and start generating! 🚀
