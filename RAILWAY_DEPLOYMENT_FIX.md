# Railway HTTPS Mixed Content Fix

## The Problem
Railway deploys your app with HTTPS, but Laravel is generating HTTP URLs for assets, causing "Mixed Content" errors.

## Solution Steps

### 1. Update Railway Environment Variables

In your Railway dashboard, go to your project → Variables and set these:

```env
APP_NAME=CRM-lite
APP_ENV=production
APP_DEBUG=false
APP_URL=https://crm-lite-production-d24e.up.railway.app
APP_KEY=base64:vw2YiVkm4hGqlT25KQ1cjHyYaiKHzkddzr1HeKjujB8=

# Important: Make sure APP_URL uses HTTPS and your actual Railway domain
ASSET_URL=https://crm-lite-production-d24e.up.railway.app

# Database - Railway will auto-provide DATABASE_URL
DB_CONNECTION=pgsql

# Session & Cache
SESSION_DRIVER=database
SESSION_LIFETIME=120
CACHE_STORE=database
QUEUE_CONNECTION=database

# Mail
MAIL_MAILER=log
MAIL_FROM_ADDRESS=noreply@crmlite.app
MAIL_FROM_NAME=CRM-lite

# Logging
LOG_CHANNEL=stack
LOG_LEVEL=info
```

### 2. Replace RAILWAY_PUBLIC_DOMAIN

**Important**: Don't use `${RAILWAY_PUBLIC_DOMAIN}` - use your actual Railway domain with HTTPS:
- Replace: `APP_URL=${RAILWAY_PUBLIC_DOMAIN}`
- With: `APP_URL=https://your-actual-railway-domain.up.railway.app`

### 3. Add ASSET_URL

Set `ASSET_URL` to the same HTTPS URL to force all assets to use HTTPS.

### 4. Redeploy

After updating the environment variables, trigger a new deployment in Railway.

### 5. Verify

Check that:
- `APP_URL` starts with `https://`
- `ASSET_URL` starts with `https://`
- `APP_ENV=production`

## Quick Test Commands

Once deployed, you can verify with:

```bash
# In Railway console or locally with production .env
php artisan tinker
config('app.url')  // Should return https://...
asset('css/app.css')  // Should return https://...
```

## Alternative: Direct Environment Variables

If the above doesn't work immediately, set these directly in Railway:

1. `FORCE_HTTPS=true`
2. `ASSET_URL=https://crm-lite-production-d24e.up.railway.app`
3. `APP_URL=https://crm-lite-production-d24e.up.railway.app`

The updated AppServiceProvider.php will automatically detect and enforce HTTPS.