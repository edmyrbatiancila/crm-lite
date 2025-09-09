# Railway Deployment Quick Fix Guide

## Issue: PostgreSQL Connection Error

If you see this error during deployment:
```
SQLSTATE[08006] [7] connection to server at '127.0.0.1', port 5432 failed: Connection refused
```

### Root Cause
Laravel is trying to connect to localhost instead of Railway's PostgreSQL service.

### Solution Applied

1. **Updated `config/database.php`**:
   - Changed `'url' => env('DB_URL')` to `'url' => env('DATABASE_URL', env('DB_URL'))`
   - This ensures Railway's `DATABASE_URL` is used first

2. **Updated `.env.railway`**:
   - Changed from `DB_CONNECTION=sqlite` to `DB_CONNECTION=pgsql`
   - Railway will automatically provide `DATABASE_URL`

3. **Environment Variables for Railway**:
   ```
   APP_NAME=CRM-lite
   APP_ENV=production
   APP_DEBUG=false
   DB_CONNECTION=pgsql
   ```

### Deployment Steps

1. **In Railway Dashboard**:
   - Create PostgreSQL service first
   - Link it to your app
   - Add environment variables from `.env.railway`
   - Don't manually set `DATABASE_URL` - Railway provides it

2. **Deploy from GitHub**:
   - Railway auto-detects Laravel
   - Build process: composer install → npm install → npm run build
   - Migration runs automatically via composer scripts

3. **Verify**:
   - Check Railway logs for successful migration
   - Visit your app URL
   - Test login functionality

### If Still Having Issues

1. Check Railway PostgreSQL service is "Active"
2. Verify environment variables are set correctly
3. Check build logs for specific error messages
4. Ensure `DATABASE_URL` appears in Railway variables (auto-generated)

The key fix was making Laravel use Railway's `DATABASE_URL` instead of individual database connection parameters.
