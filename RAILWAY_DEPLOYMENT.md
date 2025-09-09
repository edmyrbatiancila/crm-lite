# Railway Deployment Fix Guide

## Issue: PostgreSQL Connection Error During Build

If you see this error during Railway deployment:
```
SQLSTATE[08006] [7] connection to server at "127.0.0.1", port 5432 failed: Connection refused
Script php artisan migrate --force handling the post-install-cmd event returned with error code 1
```

### Root Cause
The issue occurred because:
1. **Migrations ran during build**: `composer install` triggered `post-install-cmd` which ran `php artisan migrate --force`
2. **DATABASE_URL not available during build**: Railway's `DATABASE_URL` is only available at runtime, not during the Docker build process
3. **Fallback to localhost**: Laravel defaulted to connecting to `127.0.0.1:5432` (localhost) which doesn't exist in the build container

### Solution Applied ✅

#### 1. **Removed Migration from Build Process**
**File**: `composer.json`
```json
// BEFORE (causing the issue)
"post-install-cmd": [
    "php artisan clear-compiled",
    "php artisan optimize", 
    "chmod -R 755 storage",
    "php artisan migrate --force"  // ❌ This ran during build
]

// AFTER (fixed)
"post-install-cmd": [
    "php artisan clear-compiled",
    "php artisan optimize",
    "chmod -R 755 storage"         // ✅ No migration during build
]
```

#### 2. **Added DATABASE_URL Parser**
**File**: `bootstrap/database_url_parser.php`
- Automatically parses Railway's `DATABASE_URL` into individual Laravel DB variables
- Runs before Laravel bootstrap to ensure proper configuration
- Handles PostgreSQL URL format: `postgresql://user:password@host:port/database`

#### 3. **Created Smart Startup Script**
**File**: `start.sh`
- Waits for database connection to be available
- Runs migrations only when DATABASE_URL is properly configured
- Graceful error handling and logging
- Only starts web server after successful database setup

#### 4. **Updated Deployment Configuration**
**Files**: `Procfile`, `railway.json`
- Changed from direct PHP commands to startup script
- Ensures proper sequence: Database Ready → Migrate → Start Server

### Deployment Files Updated

1. **composer.json**: Removed migration from post-install-cmd
2. **bootstrap/app.php**: Added DATABASE_URL parser inclusion
3. **bootstrap/database_url_parser.php**: New parser for Railway DATABASE_URL
4. **start.sh**: Smart startup script with database checks
5. **Procfile**: Updated to use startup script
6. **railway.json**: Updated deploy commands

### Railway Environment Variables Required

Set these in Railway Dashboard → Variables:
```env
APP_NAME=CRM-lite
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=pgsql
APP_KEY=base64:your_generated_key_here
```

**Important**: 
- Don't set `DATABASE_URL` manually - Railway provides it automatically
- Generate `APP_KEY` with: `php artisan key:generate --show`

### How the Fix Works

1. **Build Phase**: 
   - Dependencies install without database operations
   - No migrations attempted during build
   - Build completes successfully

2. **Runtime Phase**:
   - Railway provides `DATABASE_URL` environment variable
   - `database_url_parser.php` converts it to Laravel DB config
   - `start.sh` waits for database availability
   - Migrations run with proper database connection
   - Web server starts only after successful setup

### Verification Steps

1. **Check Railway Logs**: Should show successful build without database errors
2. **Runtime Logs**: Should show database connection established and migrations completed
3. **Application Access**: CRM-lite should be accessible via Railway URL
4. **Database Check**: Login functionality should work (confirms database connection)

### If You Still Get Errors

1. **Ensure PostgreSQL Service**: Verify PostgreSQL service is created and linked in Railway
2. **Check Environment Variables**: Confirm all required variables are set
3. **Review Logs**: Check both build logs and runtime logs for specific errors
4. **DATABASE_URL**: Verify it appears in Railway environment (auto-generated)

## Success Indicators ✅

- **Build Logs**: No database connection errors during `composer install`
- **Runtime Logs**: Shows "Database connection established!" and "Migrations completed successfully!"
- **Application**: Accessible and login works correctly

The key insight was separating build-time operations (dependency installation) from runtime operations (database migrations), ensuring Railway's DATABASE_URL is available when needed.
