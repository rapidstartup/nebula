# Platform Deployment Fix Guide

**Issue:** Production site returning placeholder content instead of React app
**Status:** 🔴 CRITICAL - Blocking all adoption work

---

## Quick Diagnosis Summary

| Component | Status | Details |
|-----------|--------|---------|
| Local Build | ✅ PASS | `npm run build` succeeds |
| Build Output | ✅ PASS | dist/ has correct files |
| Production URL | 🔴 FAIL | Shows placeholder content |
| Root Cause | ⚠️ UNKNOWN | Likely CDN cache or deployment config |

---

## Step-by-Step Fix Instructions

### Option 1: Clear Cloudflare Cache (Most Likely Fix)

If using Cloudflare as CDN:

1. **Log into Cloudflare Dashboard**
   - URL: https://dash.cloudflare.com
   - Select domain: nebula.rapidstartup.io

2. **Purge Cache**
   - Go to "Caching" → "Configuration"
   - Click "Purge Everything"
   - Confirm purge

3. **Wait 2-5 minutes**
   - Check site again: https://nebula.rapidstartup.io

4. **Verify Fix**
   ```bash
   curl -I https://nebula.rapidstartup.io
   # Should show fresh content
   ```

---

### Option 2: Trigger Vercel Redeploy

If hosted on Vercel:

1. **Log into Vercel Dashboard**
   - URL: https://vercel.com/dashboard
   - Select nebula project

2. **Redeploy**
   - Go to "Deployments" tab
   - Find latest deployment
   - Click "Redeploy"
   - Select "Use existing Build Cache: NO"

3. **Alternative: Force New Build**
   - Go to project settings
   - Add dummy environment variable
   - This triggers fresh build

4. **Check Build Logs**
   - Look for errors in deployment
   - Verify dist files uploaded correctly

---

### Option 3: Check DNS Configuration

1. **Verify DNS Records**
   ```bash
   nslookup nebula.rapidstartup.io
   # Should point to correct hosting provider
   ```

2. **Check CNAME/A Records**
   - If using Vercel: Should have CNAME to cname.vercel-dns.com
   - If using Netlify: Should have CNAME to [site].netlify.app
   - If using Cloudflare Pages: Should show CF IPs

3. **Verify Domain in Hosting Dashboard**
   - Ensure nebula.rapidstartup.io is added to project
   - Check SSL certificate is active

---

### Option 4: Environment Variables Check

1. **Check Production Env Vars**
   - Vite requires `VITE_` prefix for client-side vars
   - Verify all required vars are set

2. **Required Variables:**
   ```
   VITE_WALLETCONNECT_PROJECT_ID=[your_project_id]
   VITE_ENV=production
   ```

3. **Rebuild After Env Changes**
   - Any env changes require full rebuild

---

## Alternative: Deploy Fresh Build

If above doesn't work, manually deploy:

### Using Vercel CLI:
```bash
# Install Vercel CLI if not already
npm i -g vercel

# Deploy dist folder
vercel --prod dist/
```

### Using Netlify CLI:
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy dist folder
netlify deploy --prod --dir=dist
```

### Using Surge (Quick Alternative):
```bash
# Install Surge
npm i -g surge

# Deploy
cd dist
surge
# Follow prompts, use nebula.rapidstartup.io
```

---

## Build Verification

Before deploying, verify build locally:

```bash
# Production build
npm run build

# Preview locally
npm run preview

# Check in browser at http://localhost:4173
# Should show full Nebula app with wallet connection
```

---

## Rollback Plan

If new deployment fails:

1. **Vercel:** Go to Deployments → Previous working version → "Promote to Production"
2. **Netlify:** Go to Deploys → Previous version → "Publish deploy"
3. **Cloudflare Pages:** Go to Deployments → Rollback

---

## Post-Fix Checklist

After fix confirmed:

- [ ] Site loads with correct title (not "Cosmic Innovation Hub")
- [ ] Wallet connection works
- [ ] DAO creation flow functional
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Grant application links updated (if URL changed)

---

## Emergency Workaround

If fix takes >24 hours, use temporary URL:

1. **Deploy to temp URL:**
   ```bash
   # Use Surge for instant deployment
   cd dist
   surge nebula-demo-[date].surge.sh
   ```

2. **Update grant application:**
   - Replace live URL with temp URL
   - Add note about main site maintenance

3. **Notify prospects:**
   - Send temp demo link
   - Explain site upgrade in progress

---

## Prevention

1. **Enable Build Notifications**
   - Slack/Discord webhook on failed builds
   - Email alerts for deployment issues

2. **Add Health Check**
   - Ping site every hour
   - Alert if title/content changes unexpectedly

3. **Staging Environment**
   - Deploy to staging first
   - Verify before production

---

## Contact for Help

If stuck:
- Vercel Support: https://vercel.com/help
- Cloudflare Support: https://support.cloudflare.com
- Netlify Support: https://www.netlify.com/support/

---

**Priority:** 🔴 CRITICAL - Fix before any grant submission or outreach

**Estimated Fix Time:** 10-30 minutes once started

**Next Action:** Try Option 1 (Cloudflare Purge) first, then Option 2 (Vercel Redeploy)
