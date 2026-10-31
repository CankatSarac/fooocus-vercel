# Fooocus Docker Image with CPU Support
FROM python:3.10-slim

LABEL maintainer="fooocus-vercel"
LABEL description="Fooocus AI Image Generation with CPU support"

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    wget \
    build-essential \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Clone Fooocus repository
RUN git clone https://github.com/lllyasviel/Fooocus.git .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements_versions.txt

# Create necessary directories
RUN mkdir -p outputs models

# Expose Gradio default port
EXPOSE 7865

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5m --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:7865')" || exit 1

# Run Fooocus with CPU mode and listen on all interfaces
CMD ["python", "entry_with_update.py", "--listen", "0.0.0.0", "--always-cpu", "--port", "7865"]
