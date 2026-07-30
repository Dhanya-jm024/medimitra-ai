#!/usr/bin/env bash

echo "===================================================="
echo "🏥 MediMitra AI — Automated Development Setup"
echo "===================================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18+ first."
    exit 1
fi

echo "✅ Node.js detected: $(node -v)"

# Install Frontend Dependencies
echo "📦 Installing Frontend Dependencies..."
cd frontend || exit 1
npm install

# Setup Local Environment
if [ ! -f ".env.local" ]; then
    echo "📝 Creating frontend/.env.local from .env.example..."
    cp ../.env.example .env.local
fi

echo "===================================================="
echo "🎉 Setup Complete! To start MediMitra AI:"
echo "   cd frontend && npm run dev"
echo "===================================================="
