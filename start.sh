#!/bin/bash

# Railway Startup Script with Enhanced Debugging
echo "🚀 Starting CRM-lite on Railway..."

# Debug environment variables
echo "🔍 Debug: Checking environment variables..."
echo "APP_ENV: $APP_ENV"
echo "DB_CONNECTION: $DB_CONNECTION"
echo "DATABASE_URL: ${DATABASE_URL:0:30}..." # Show first 30 chars only for security
echo "DB_HOST: $DB_HOST"
echo "DB_PORT: $DB_PORT"
echo "DB_DATABASE: $DB_DATABASE"

# Test database connection with more detailed output
echo "⏳ Testing database connection..."
php artisan tinker --execute="
try {
    DB::connection()->getPdo();
    echo 'Database connection successful!\n';
} catch (Exception \$e) {
    echo 'Database connection failed: ' . \$e->getMessage() . '\n';
    exit(1);
}
"

if [ $? -ne 0 ]; then
    echo "❌ Database connection failed during startup"
    exit 1
fi

echo "✅ Database connection established!"

# Run migrations with verbose output
echo "🔄 Running database migrations..."
php artisan migrate --force --verbose

if [ $? -eq 0 ]; then
    echo "✅ Migrations completed successfully!"
else
    echo "❌ Migration failed!"
    echo "📋 Checking migration status..."
    php artisan migrate:status || true
    exit 1
fi

# Start the server
echo "🌐 Starting web server on port $PORT..."
php artisan serve --host=0.0.0.0 --port=$PORT
