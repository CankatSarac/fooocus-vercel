# Hugging Face Spaces Dockerfile for Fooocus
FROM python:3.10

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    wget \
    build-essential \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Clone Fooocus
RUN git clone https://github.com/lllyasviel/Fooocus.git .

# Install dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements_versions.txt

# Install Gradio for Spaces integration
RUN pip install --no-cache-dir gradio

# Create directories
RUN mkdir -p outputs models

# Expose port for Hugging Face
EXPOSE 7860

# Set environment variables for HF Spaces
ENV GRADIO_SERVER_NAME=0.0.0.0
ENV GRADIO_SERVER_PORT=7860

# Run on CPU (HF Spaces free tier)
CMD ["python", "entry_with_update.py", "--listen", "0.0.0.0", "--port", "7860", "--always-cpu", "--share"]
