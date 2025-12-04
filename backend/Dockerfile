FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential

# Set working directory
WORKDIR /app

# Copy dependencies
COPY requirements.txt .

# Install Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY . .

# Expose port
EXPOSE 8080

# Run FastAPI with 4 workers (you can raise to 6–8)
CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "8080", "--workers", "4"]
