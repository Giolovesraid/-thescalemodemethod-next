# Deploying THESCALEMETHOD to Vercel

This document outlines the steps to deploy the THESCALEMETHOD platform to Vercel and connect your custom domain through Cloudflare.

## Prerequisites

1. **GitHub Account**: For hosting your code repository
2. **Vercel Account**: For deploying your application
3. **MongoDB Atlas Account**: For the database
4. **Cloudflare Account**: For managing your domain DNS
5. **OAuth Credentials**: From Google and/or GitHub

## Setup MongoDB Atlas

1. Create a new project in MongoDB Atlas
2. Build a new cluster (free tier is sufficient to start)
3. Create a database user with read/write permissions
4. Add your IP to the network access list (or use 0.0.0.0/0 for all IPs)
5. Once your cluster is created, click "Connect" → "Connect your application"
6. Copy the connection string, you'll need it for your Vercel environment variables

## Setup OAuth Providers

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Go to "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth client ID"
5. Configure the consent screen if needed
6. Set the application type to "Web application"
7. Add your Vercel deployment URL (https://your-app.vercel.app) and localhost to the authorized JavaScript origins
8. Add your Vercel callback URL (https://your-app.vercel.app/api/auth/callback/google) and localhost equivalent to the authorized redirect URIs
9. Create the client and note your Client ID and Client Secret

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details
4. Set the homepage URL to your Vercel deployment URL (https://your-app.vercel.app)
5. Set the callback URL to https://your-app.vercel.app/api/auth/callback/github
6. Register the application
7. Generate a client secret and note your Client ID and Client Secret

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
6. Add Environment Variables:
   - `NEXTAUTH_URL`: Your full Vercel URL (https://your-app.vercel.app)
   - `NEXTAUTH_SECRET`: Generate a secure random string (e.g., use `openssl rand -base64 32`)
   - `GOOGLE_ID`: Your Google OAuth Client ID
   - `GOOGLE_SECRET`: Your Google OAuth Client Secret
   - `GITHUB_ID`: Your GitHub OAuth Client ID
   - `GITHUB_SECRET`: Your GitHub OAuth Client Secret
   - `MONGODB_URI`: Your MongoDB Atlas connection string
7. Click "Deploy"

## Connect Custom Domain with Cloudflare

1. In your Vercel project, go to "Domains"
2. Add your domain (e.g., thescalemethod.com)
3. In Cloudflare, go to your domain's DNS settings
4. Add a CNAME record:
   - Type: CNAME
   - Name: @ (or www, depending on your needs)
   - Target: cname.vercel-dns.com
   - TTL: Auto
5. Ensure Cloudflare's SSL is set to "Full" or "Full (strict)" under the SSL/TLS tab
6. In Cloudflare, under the SSL/TLS tab → Edge Certificates, enable "Always Use HTTPS"

## Verify Deployment

1. Visit your domain to verify the site is working correctly
2. Test authentication by signing in with Google and GitHub
3. Verify that authenticated pages are only accessible when signed in

## Troubleshooting

If you encounter any issues:

1. Check your Vercel deployment logs
2. Verify environment variables are correctly set
3. Ensure your MongoDB connection string is correct
4. Check that OAuth callback URLs are properly configured
5. Verify Cloudflare DNS settings are correct (may take up to 24 hours to propagate)

## Maintenance

- Use the Vercel dashboard to monitor site performance
- Check MongoDB Atlas for database metrics
- Update environment variables as needed through the Vercel dashboard