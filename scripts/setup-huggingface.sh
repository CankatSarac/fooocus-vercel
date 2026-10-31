#!/bin/bash

# Hugging Face Spaces Setup Script
# This script helps you deploy Fooocus to Hugging Face Spaces

set -e

echo "🤗 Hugging Face Spaces Setup"
echo "============================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed!"
    exit 1
fi

echo "Please provide the following information:"
echo ""

# Get user input
read -p "Your Hugging Face username: " HF_USERNAME
read -p "Your Space name (e.g., fooocus-cpu): " SPACE_NAME

if [ -z "$HF_USERNAME" ] || [ -z "$SPACE_NAME" ]; then
    echo "❌ Username and Space name are required!"
    exit 1
fi

# Validate Space name
if [[ ! "$SPACE_NAME" =~ ^[a-z0-9-]+$ ]]; then
    echo "❌ Space name can only contain lowercase letters, numbers, and hyphens"
    exit 1
fi

echo ""
echo "📋 Configuration:"
echo "   Username: $HF_USERNAME"
echo "   Space: $SPACE_NAME"
echo "   URL: https://huggingface.co/spaces/$HF_USERNAME/$SPACE_NAME"
echo ""

read -p "Is this correct? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Setup cancelled"
    exit 1
fi

# Create Space directory
SPACE_DIR="hf-space-$SPACE_NAME"
echo ""
echo "📁 Creating Space directory: $SPACE_DIR"
mkdir -p "$SPACE_DIR"

# Copy files
echo "📄 Copying files..."
cp huggingface/Dockerfile "$SPACE_DIR/"
cp huggingface/README.md "$SPACE_DIR/"

cd "$SPACE_DIR"

# Initialize git
echo "🔧 Initializing git repository..."
git init
git lfs install

# Add Hugging Face remote
echo "🔗 Connecting to Hugging Face..."
git remote add origin "https://huggingface.co/spaces/$HF_USERNAME/$SPACE_NAME"

# Create initial commit
echo "📦 Creating initial commit..."
git add .
git commit -m "Initial commit: Deploy Fooocus to Hugging Face Spaces"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo ""
echo "1. Create a Space at Hugging Face:"
echo "   https://huggingface.co/new-space"
echo ""
echo "   Settings:"
echo "   - Space name: $SPACE_NAME"
echo "   - License: MIT"
echo "   - SDK: Docker"
echo "   - Blank template: Yes"
echo ""
echo "2. Push your code:"
echo "   cd $SPACE_DIR"
echo "   git push -u origin main"
echo ""
echo "3. Wait 10-15 minutes for build to complete"
echo ""
echo "4. Your Space will be live at:"
echo "   https://huggingface.co/spaces/$HF_USERNAME/$SPACE_NAME"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
