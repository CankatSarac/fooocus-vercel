---
title: Fooocus CPU
emoji: 🎨
colorFrom: purple
colorTo: orange
sdk: docker
pinned: false
license: mit
app_port: 7860
---

# Fooocus AI Image Generation (CPU)

This is a Hugging Face Space running Fooocus for AI image generation on CPU.

## Features

- AI-powered image generation
- Text-to-image with Stable Diffusion
- CPU-optimized for free tier
- Web-based interface

## Usage

Simply enter your prompt and click generate. Note: CPU generation is slower than GPU but completely free!

## Integration

This Space can be embedded in your web application:

```html
<iframe
    src="https://huggingface.co/spaces/YOUR_USERNAME/fooocus-cpu"
    frameborder="0"
    width="100%"
    height="600"
></iframe>
```

## Local Development

```bash
docker build -t fooocus-cpu .
docker run -p 7860:7860 fooocus-cpu
```

## Credits

Based on [Fooocus](https://github.com/lllyasviel/Fooocus) by lllyasviel
