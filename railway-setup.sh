#!/bin/bash

# Railway Environment Setup Script
# Run this after creating your Railway project and PostgreSQL service

echo "Setting up Railway environment variables..."

# Copy environment variables to Railway
echo "Please copy these environment variables to your Railway project dashboard:"
echo ""
echo "=== Environment Variables for Railway ==="
cat .env.railway
echo ""
echo "=== Instructions ==="
echo "1. Go to your Railway project dashboard"
echo "2. Click on 'Variables' tab"
echo "3. Add each variable above (except comments starting with #)"
echo "4. Make sure your PostgreSQL service is connected to your app"
echo "5. Railway will automatically provide DATABASE_URL"
echo "6. Deploy your project"
echo ""
echo "Note: Don't manually set DATABASE_URL - Railway provides it automatically"
