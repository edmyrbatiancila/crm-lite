<?php

/**
 * Parse DATABASE_URL for Railway deployment
 * This script runs before Laravel bootstrap to parse DATABASE_URL into individual DB variables
 */

if (!function_exists('parseDatabaseUrl')) {
    function parseDatabaseUrl() {
        // Try different ways to get DATABASE_URL
        $databaseUrl = $_ENV['DATABASE_URL'] ?? getenv('DATABASE_URL') ?? null;
        
        if (!$databaseUrl) {
            return;
        }
        
        $parsedUrl = parse_url($databaseUrl);
        
        if ($parsedUrl && isset($parsedUrl['host'])) {
            $_ENV['DB_CONNECTION'] = 'pgsql';
            $_ENV['DB_HOST'] = $parsedUrl['host'];
            $_ENV['DB_PORT'] = $parsedUrl['port'] ?? 5432;
            $_ENV['DB_DATABASE'] = ltrim($parsedUrl['path'] ?? '', '/');
            $_ENV['DB_USERNAME'] = $parsedUrl['user'] ?? '';
            $_ENV['DB_PASSWORD'] = $parsedUrl['pass'] ?? '';
            
            // Also set for putenv() for older systems
            putenv("DB_CONNECTION=pgsql");
            putenv("DB_HOST=" . $_ENV['DB_HOST']);
            putenv("DB_PORT=" . $_ENV['DB_PORT']);
            putenv("DB_DATABASE=" . $_ENV['DB_DATABASE']);
            putenv("DB_USERNAME=" . $_ENV['DB_USERNAME']);
            putenv("DB_PASSWORD=" . $_ENV['DB_PASSWORD']);
            
            // Debug output
            error_log("DATABASE_URL parsed successfully:");
            error_log("DB_HOST: " . $_ENV['DB_HOST']);
            error_log("DB_PORT: " . $_ENV['DB_PORT']);
            error_log("DB_DATABASE: " . $_ENV['DB_DATABASE']);
        } else {
            error_log("Failed to parse DATABASE_URL: " . $databaseUrl);
        }
    }
}

// Parse DATABASE_URL if it exists
parseDatabaseUrl();
