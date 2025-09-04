#!/bin/bash

# Railway deployment script
echo "Starting Railway deployment..."

# Install PHP dependencies
composer install --no-dev --optimize-autoloader --no-interaction

# Install Node dependencies and build assets
npm ci
npm run build

# Clear Laravel caches
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# Generate application key if not set
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --no-interaction
fi

# Run database migrations
php artisan migrate --force --no-interaction

# Optimize Laravel for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Deployment completed!"
