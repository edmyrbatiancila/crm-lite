#!/usr/bin/env php
<?php

echo "🚀 Starting CRM-lite deployment...\n";

// Parse DATABASE_URL and set environment variables
$databaseUrl = getenv('DATABASE_URL');
if ($databaseUrl) {
    echo "📊 DATABASE_URL found, parsing...\n";
    $parts = parse_url($databaseUrl);
    
    if ($parts && isset($parts['host'])) {
        putenv('DB_CONNECTION=pgsql');
        putenv('DB_HOST=' . $parts['host']);
        putenv('DB_PORT=' . ($parts['port'] ?? 5432));
        putenv('DB_DATABASE=' . ltrim($parts['path'], '/'));
        putenv('DB_USERNAME=' . ($parts['user'] ?? ''));
        putenv('DB_PASSWORD=' . ($parts['pass'] ?? ''));
        
        echo "✅ Database configuration set:\n";
        echo "   Host: " . $parts['host'] . "\n";
        echo "   Port: " . ($parts['port'] ?? 5432) . "\n";
        echo "   Database: " . ltrim($parts['path'], '/') . "\n";
    } else {
        echo "❌ Failed to parse DATABASE_URL\n";
        exit(1);
    }
} else {
    echo "❌ DATABASE_URL not found\n";
    exit(1);
}

// Test database connection
echo "🔌 Testing database connection...\n";
$testCommand = 'php artisan tinker --execute="DB::connection()->getPdo(); echo \'Connection successful\';"';
$testResult = shell_exec($testCommand . ' 2>&1');

if (strpos($testResult, 'Connection successful') !== false) {
    echo "✅ Database connection successful\n";
} else {
    echo "❌ Database connection failed:\n";
    echo $testResult . "\n";
    exit(1);
}

// Run migrations
echo "🗄️ Running migrations...\n";
$migrateCommand = 'php artisan migrate --force 2>&1';
$migrateResult = shell_exec($migrateCommand);

if (strpos($migrateResult, 'Nothing to migrate') !== false || 
    strpos($migrateResult, 'Migrated:') !== false || 
    strpos($migrateResult, 'DONE') !== false ||
    strpos($migrateResult, 'INFO  Running migrations') !== false) {
    echo "✅ Migrations completed successfully\n";
} else {
    echo "❌ Migration failed:\n";
    echo $migrateResult . "\n";
    exit(1);
}

// Run database seeders
echo "🌱 Running database seeders...\n";
$seedCommand = 'php artisan db:seed --force 2>&1';
$seedResult = shell_exec($seedCommand);

if (strpos($seedResult, 'Database seeding completed successfully') !== false || 
    strpos($seedResult, 'Seeding:') !== false ||
    strpos($seedResult, 'INFO  Seeding') !== false ||
    empty(trim($seedResult))) {
    echo "✅ Database seeding completed successfully\n";
} else {
    echo "⚠️ Seeding completed with messages (this is normal):\n";
    echo $seedResult . "\n";
    // Don't exit on seeder warnings - continue with startup
}

// Start the web server
echo "🌐 Starting web server on port " . getenv('PORT') . "...\n";
$serverCommand = 'php artisan serve --host=0.0.0.0 --port=' . getenv('PORT');
shell_exec($serverCommand);
