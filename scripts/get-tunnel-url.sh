#!/bin/bash

# Get Cloudflare Tunnel URL
# This script retrieves the public URL from your Cloudflare tunnel

echo "🔍 Getting your Cloudflare Tunnel URL..."
echo ""

# Check if docker-compose is running
if ! docker ps | grep -q "fooocus-tunnel"; then
    echo "❌ Cloudflare tunnel container is not running!"
    echo ""
    echo "Start it with:"
    echo "  docker-compose up -d"
    exit 1
fi

# Get the tunnel URL
if command -v docker-compose &> /dev/null; then
    TUNNEL_URL=$(docker-compose logs cloudflared 2>&1 | grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' | tail -1)
else
    TUNNEL_URL=$(docker compose logs cloudflared 2>&1 | grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' | tail -1)
fi

if [ -z "$TUNNEL_URL" ]; then
    echo "⏳ Tunnel URL not found yet. The tunnel might still be starting..."
    echo ""
    echo "Wait a few seconds and try again, or check the logs:"
    if command -v docker-compose &> /dev/null; then
        echo "  docker-compose logs cloudflared"
    else
        echo "  docker compose logs cloudflared"
    fi
    exit 1
fi

echo "✅ Your public URL is:"
echo ""
echo "   $TUNNEL_URL"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Copy this URL and:"
echo ""
echo "1. Test it in your browser: $TUNNEL_URL"
echo "2. Update your Vercel app with this URL"
echo "3. Or paste it in the connection form"
echo ""
echo "⚠️  Note: This URL changes when you restart the tunnel"
echo ""
