# 🚀 Complete CPU Deployment Guide for Fooocus

This guide provides **THREE complete solutions** to run Fooocus on CPU with online access and authentication.

---

## 📊 Quick Comparison

| Option | Cost | Setup Time | Uptime | Speed | Best For |
|--------|------|------------|--------|-------|----------|
| **Docker Local + Tunnel** | $0 | 15 min | 24/7* | Fast (your CPU) | Have PC running 24/7 |
| **Hugging Face Spaces** | $0 | 5 min | 24/7 | Slow (2 CPU) | Zero maintenance |
| **Railway/Render** | $5/mo | 10 min | 24/7 | Medium | Professional use |

*Requires your PC to stay on

---

## 🎯 Option 1: Docker + Cloudflare Tunnel (RECOMMENDED)

**Best if:** You have a PC/laptop that can run 24/7

### ✅ Advantages
- **Free** - Zero cost except electricity
- **Fast** - Uses your own CPU
- **Private** - Data stays on your machine
- **Full control** - Customize everything
- **Integrates** - Works with your existing Vercel auth

### 📋 Requirements
- Docker Desktop installed
- PC/laptop that can run 24/7
- 4GB+ RAM
- Windows/Mac/Linux

### 🛠️ Setup Steps

#### 1. Install Docker Desktop
```bash
# Windows/Mac: Download from https://www.docker.com/products/docker-desktop/

# Linux (Ubuntu/Debian):
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

#### 2. Start Fooocus with Docker Compose
```bash
cd /path/to/fooocus-vercel

# Build and start containers
docker-compose up -d

# Check logs
docker-compose logs -f
```

This will:
- Start Fooocus on http://localhost:7865
- Start Cloudflare tunnel for public access
- Auto-restart if crashes

#### 3. Get Your Public URL

**Option A: Cloudflare Tunnel (Already configured)**
```bash
# Check the tunnel logs to get your public URL
docker-compose logs cloudflared

# Look for a line like:
# https://abc-123-def.trycloudflare.com
```

**Option B: Ngrok (If you prefer)**
```bash
# Uncomment ngrok section in docker-compose.yml
# Add your ngrok token:
docker-compose up -d

# Get URL from:
http://localhost:4040
```

#### 4. Update Your Vercel App

Edit `components/FooocusFrame.tsx` to use your tunnel URL:
```typescript
// Change the Colab notebook link to your Docker URL
const FOOOCUS_URL = 'https://your-tunnel-url.trycloudflare.com';
```

Or keep it dynamic - let users paste their own URL!

### 🔧 Management Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Update Fooocus
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# View generated images
ls outputs/

# Clean old images
docker system prune -a
```

### ⚡ Performance Tuning

Edit `docker-compose.yml`:
```yaml
environment:
  # Adjust based on your CPU cores
  - OMP_NUM_THREADS=8  # Change 4 to 8 if you have 8+ cores
  - MKL_NUM_THREADS=8
```

### 🔒 Security Notes

- Tunnel URLs are temporary - they change when you restart
- For permanent URLs, use Cloudflare Tunnel with custom domain
- Your Vercel app already handles authentication
- Consider adding IP whitelist if needed

---

## 🤗 Option 2: Hugging Face Spaces

**Best if:** You want zero maintenance and don't care about speed

### ✅ Advantages
- **Completely free** - No costs ever
- **Zero maintenance** - No server to manage
- **Always online** - 24/7 uptime
- **Built-in sharing** - Public or private access
- **No hardware needed** - Cloud-based

### ⚠️ Disadvantages
- **Slower** - CPU only (3-5min per image)
- **Public** - Anyone can access (unless private)
- **Limited resources** - 2 CPU cores, 16GB RAM

### 🛠️ Setup Steps

#### 1. Create Hugging Face Account
1. Go to https://huggingface.co/join
2. Create free account

#### 2. Create New Space
1. Click "New Space" at https://huggingface.co/new-space
2. Name: `fooocus-cpu`
3. License: MIT
4. SDK: **Docker**
5. Visibility: Private (or Public)

#### 3. Upload Files
Upload from the `huggingface/` folder:
- `Dockerfile`
- `README.md`

Or use Git:
```bash
# Clone your space
git clone https://huggingface.co/spaces/YOUR_USERNAME/fooocus-cpu
cd fooocus-cpu

# Copy files
cp ../fooocus-vercel/huggingface/* .

# Push
git add .
git commit -m "Initial Fooocus setup"
git push
```

#### 4. Wait for Build
- First build takes 10-15 minutes
- Watch progress in the "Build" tab
- When done, your app is live!

#### 5. Get Your Space URL
```
https://huggingface.co/spaces/YOUR_USERNAME/fooocus-cpu
```

#### 6. Integrate with Your Vercel App

**Option A: Embed in iframe**
```typescript
// In components/FooocusFrame.tsx
const HF_SPACE_URL = 'https://huggingface.co/spaces/YOUR_USERNAME/fooocus-cpu';
```

**Option B: Use HF API**
```typescript
// Call the space programmatically
const response = await fetch('https://YOUR_USERNAME-fooocus-cpu.hf.space/api/predict', {
  method: 'POST',
  body: JSON.stringify({ data: ["your prompt"] })
});
```

### 🔐 Authentication

**Add password protection:**
1. Go to Space Settings
2. Set visibility to "Private"
3. Or add Gradio authentication:

Edit the Dockerfile to add:
```python
CMD ["python", "entry_with_update.py", "--listen", "0.0.0.0", "--port", "7860", "--always-cpu", "--share", "--gradio-auth", "cankat:cankat123"]
```

### 📈 Monitoring
- View logs in the "Logs" tab
- Check resource usage in "Files"
- See visitor stats (if public)

---

## 🚂 Option 3: Railway / Render

**Best if:** You need reliability and can pay $5/month

### Railway ($5/month after free tier)

#### ✅ Advantages
- **Easy deployment** - Connect GitHub and deploy
- **Free $5 credit** - 500 hours free/month
- **Auto-updates** - Redeploys on git push
- **Metrics** - Built-in monitoring

#### 🛠️ Setup Steps

1. **Sign up at Railway.app**
   - https://railway.app
   - Connect GitHub account

2. **Create New Project**
   ```bash
   # Click "New Project"
   # Select "Deploy from GitHub repo"
   # Choose your fooocus-vercel repo
   ```

3. **Configure**
   - Railway auto-detects the `railway.json` file
   - Uses `railway/Dockerfile` automatically
   - Assigns public URL

4. **Environment Variables** (Optional)
   ```
   PORT=7865
   GRADIO_SERVER_NAME=0.0.0.0
   ```

5. **Get Your URL**
   ```
   https://your-app.railway.app
   ```

#### 💰 Pricing
- Free tier: 500 hours/month ($5 credit)
- After free tier: ~$5-10/month
- Charged per minute of usage

### Render ($0-7/month)

#### ✅ Advantages
- **750 hours free** - More than Railway
- **Simple pricing** - Free or $7/month
- **Easy setup** - Similar to Railway

#### 🛠️ Setup Steps

1. **Sign up at Render.com**
   - https://render.com
   - Connect GitHub

2. **Create Web Service**
   ```bash
   # Click "New +"
   # Select "Web Service"
   # Choose your repo
   ```

3. **Configure**
   - Render detects `render.yaml`
   - Auto-configures everything

4. **Deploy**
   - Click "Create Web Service"
   - Wait 10-15 minutes for build

5. **Get URL**
   ```
   https://your-app.onrender.com
   ```

#### ⚠️ Free Tier Limitations
- **Spins down after 15 min** of inactivity
- **Cold start** takes 30-60 seconds
- **750 hours/month** limit

#### 💰 Pricing
- Free: 750 hours/month (spins down)
- Paid: $7/month (always on)

---

## 🔄 Integration with Your Vercel App

All three options work with your existing authentication! Here's how:

### Method 1: Dynamic URL (Recommended)
Keep your current setup where users paste the Gradio URL - works with any option!

### Method 2: Hardcoded URL
```typescript
// In components/FooocusFrame.tsx
const FOOOCUS_URLS = {
  docker: 'https://your-tunnel.trycloudflare.com',
  huggingface: 'https://huggingface.co/spaces/USER/fooocus-cpu',
  railway: 'https://your-app.railway.app'
};

// Choose one based on your deployment
const FOOOCUS_URL = FOOOCUS_URLS.docker; // or .huggingface or .railway
```

### Method 3: Environment Variable
```bash
# In Vercel dashboard, add:
NEXT_PUBLIC_FOOOCUS_URL=https://your-deployment-url.com
```

```typescript
// In your components
const fooocusUrl = process.env.NEXT_PUBLIC_FOOOCUS_URL;
```

---

## 📊 Detailed Comparison

### Speed Test (512x512 image, 30 steps)

| Platform | CPU | Generation Time | Notes |
|----------|-----|----------------|-------|
| **Your PC (Docker)** | i7-10700K | ~2-3 min | Fast, depends on your CPU |
| **Hugging Face** | 2 vCPU | ~3-5 min | Slower, shared resources |
| **Railway** | 4 vCPU | ~2-3 min | Good performance |
| **Render** | 1 vCPU | ~4-6 min | Slowest option |

### Cost Breakdown (Monthly)

| Platform | Free Tier | After Free | 24/7 Cost |
|----------|-----------|------------|-----------|
| **Docker Local** | Unlimited | $0 | $5-15 (electricity) |
| **Hugging Face** | Unlimited | $0 | $0 |
| **Railway** | 500 hours | $5/mo | $5-10/mo |
| **Render** | 750 hours | $7/mo | $7/mo |
| **Google Colab** | ~12hr sessions | $0 | Not 24/7 |

### Feature Comparison

| Feature | Docker | HF Spaces | Railway | Render |
|---------|--------|-----------|---------|--------|
| Custom domain | ✅ | ✅ | ✅ | ✅ |
| Persistent storage | ✅ | ⚠️ | ⚠️ | ✅ |
| Auto-restart | ✅ | ✅ | ✅ | ✅ |
| Metrics/logs | ⚠️ | ✅ | ✅ | ✅ |
| CI/CD | ⚠️ | ✅ | ✅ | ✅ |
| API access | ✅ | ✅ | ✅ | ✅ |

---

## 🎯 Which Should You Choose?

### Choose Docker Local if:
- ✅ You have a PC that can run 24/7
- ✅ You want the fastest generation
- ✅ You care about privacy
- ✅ You're comfortable with Docker

### Choose Hugging Face if:
- ✅ You want completely free forever
- ✅ You don't mind slower generation
- ✅ You want zero maintenance
- ✅ You don't have local hardware

### Choose Railway/Render if:
- ✅ You can spend $5-7/month
- ✅ You want professional reliability
- ✅ You need good monitoring
- ✅ You want easy scaling

---

## 🚀 Quick Start Commands

### Docker Local
```bash
cd fooocus-vercel
docker-compose up -d
docker-compose logs cloudflared | grep "https://"
```

### Hugging Face
```bash
cd fooocus-vercel/huggingface
git clone https://huggingface.co/spaces/YOUR_USERNAME/fooocus-cpu
cp * fooocus-cpu/
cd fooocus-cpu
git add . && git commit -m "Deploy" && git push
```

### Railway
```bash
# Just connect your GitHub repo at railway.app
# It auto-detects railway.json and deploys
```

### Render
```bash
# Connect GitHub repo at render.com
# It auto-detects render.yaml and deploys
```

---

## 🆘 Troubleshooting

### Docker: Container won't start
```bash
# Check logs
docker-compose logs

# Rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Docker: Out of memory
```bash
# Increase Docker memory limit in Docker Desktop settings
# Settings → Resources → Memory → 8GB
```

### HF Spaces: Build failed
- Check Dockerfile syntax
- View build logs in "Building" tab
- Ensure all files are uploaded

### Railway: Deployment timeout
- Increase healthcheck timeout in railway.json
- Check logs for errors
- Free tier has CPU limits

### General: Slow generation
- CPU generation is inherently slow (3-5 min per image)
- Consider using fewer inference steps (20 instead of 30)
- Use smaller image sizes (512x512 instead of 1024x1024)
- Upgrade to GPU if speed is critical

---

## 📝 Next Steps

1. **Choose your deployment method**
2. **Follow the setup steps above**
3. **Test with a simple prompt**
4. **Update your Vercel app with the new URL**
5. **Share with your users!**

---

## 🎓 Additional Resources

- [Fooocus GitHub](https://github.com/lllyasviel/Fooocus)
- [Docker Documentation](https://docs.docker.com)
- [Cloudflare Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [Hugging Face Spaces Guide](https://huggingface.co/docs/hub/spaces-overview)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)

---

## 💡 Pro Tips

1. **Keep models cached**: The first run downloads ~4GB of models. Keep the `models/` folder to avoid re-downloading.

2. **Persistent storage**: All options support persistent storage for generated images.

3. **Monitoring**: Set up uptime monitoring with [UptimeRobot](https://uptimerobot.com) (free).

4. **Backups**: Regularly backup your `outputs/` folder.

5. **Performance**: For faster generation, consider:
   - Fewer inference steps (20-25 instead of 30)
   - Smaller images (512x512)
   - Simpler prompts

---

**Need help?** Open an issue on GitHub or check the troubleshooting section above!
