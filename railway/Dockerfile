# Railway/Render Dockerfile for Fooocus CPU
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies (minimal for Railway/Render)
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    wget \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Clone Fooocus
RUN git clone --depth 1 https://github.com/lllyasviel/Fooocus.git .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements_versions.txt

# Create directories
RUN mkdir -p outputs models

# Railway/Render uses PORT env variable
ENV PORT=7865
ENV GRADIO_SERVER_NAME=0.0.0.0

EXPOSE ${PORT}

# Run with CPU mode and dynamic port
CMD python entry_with_update.py --listen 0.0.0.0 --port ${PORT} --always-cpu
