#!/bin/bash

# Railway Startup Script
# This script ensures the database is ready before starting the application

echo "🚀 Starting CRM-lite on Railway..."

# Wait for database to be ready
echo "⏳ Waiting for database connection..."
php artisan tinker --execute="DB::connection()->getPdo();" 2>/dev/null
while [ $? -ne 0 ]; do
    echo "💤 Database not ready, waiting 2 seconds..."
    sleep 2
    php artisan tinker --execute="DB::connection()->getPdo();" 2>/dev/null
done

echo "✅ Database connection established!"

# Run migrations
echo "🔄 Running database migrations..."
php artisan migrate --force

if [ $? -eq 0 ]; then
    echo "✅ Migrations completed successfully!"
else
    echo "❌ Migration failed!"
    exit 1
fi

# Start the server
echo "🌐 Starting web server..."
php artisan serve --host=0.0.0.0 --port=$PORT
