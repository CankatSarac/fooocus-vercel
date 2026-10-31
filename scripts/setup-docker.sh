#!/bin/bash

# Fooocus Docker Setup Script
# This script helps you set up Fooocus with Docker + Cloudflare Tunnel

set -e

echo "🚀 Fooocus Docker Setup"
echo "======================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed!"
    echo ""
    echo "Please install Docker Desktop from:"
    echo "https://www.docker.com/products/docker-desktop/"
    echo ""
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed!"
    exit 1
fi

echo "✅ Docker is installed"
echo ""

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p outputs models

# Create placeholder files to ensure directories are tracked
touch outputs/.gitkeep
touch models/.gitkeep

echo "✅ Directories created"
echo ""

# Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ docker-compose.yml not found!"
    echo "Make sure you're in the fooocus-vercel directory"
    exit 1
fi

echo "🏗️  Building Docker images (this may take 10-15 minutes)..."
echo ""

# Build and start containers
if command -v docker-compose &> /dev/null; then
    docker-compose build
    docker-compose up -d
else
    docker compose build
    docker compose up -d
fi

echo ""
echo "✅ Containers started!"
echo ""

# Wait for services to start
echo "⏳ Waiting for Fooocus to start (this may take 2-3 minutes)..."
sleep 30

echo ""
echo "🎉 Setup complete!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📍 Local access:"
echo "   http://localhost:7865"
echo ""
echo "🌐 Public URL (Cloudflare Tunnel):"
echo "   Getting your tunnel URL..."
echo ""

# Get the Cloudflare tunnel URL
sleep 10
if command -v docker-compose &> /dev/null; then
    TUNNEL_URL=$(docker-compose logs cloudflared 2>&1 | grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' | head -1)
else
    TUNNEL_URL=$(docker compose logs cloudflared 2>&1 | grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' | head -1)
fi

if [ -z "$TUNNEL_URL" ]; then
    echo "   ⏳ Tunnel is still starting... Check logs with:"
    echo "   docker-compose logs cloudflared"
else
    echo "   ✅ $TUNNEL_URL"
    echo ""
    echo "   Copy this URL and paste it in your Vercel app!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Useful commands:"
echo ""
echo "  View logs:"
echo "    docker-compose logs -f"
echo ""
echo "  Stop containers:"
echo "    docker-compose down"
echo ""
echo "  Restart containers:"
echo "    docker-compose restart"
echo ""
echo "  View generated images:"
echo "    ls outputs/"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✨ Happy generating! ✨"
echo ""
