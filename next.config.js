const appHosts   = ['app.localhost',   'app.hurudza.tech'];
const adminHosts = ['admin.localhost', 'admin.yourdomain.com'];

// next.config.js
module.exports = {
    eslint: {
        ignoreDuringBuilds: true,
      },
    async rewrites() {
        return [
            {
                source: '/rewritetest',
                has: [{ type: 'host', value: 'app.localhost' }],
                destination: '/subdomains/app/',
            },
            {
                source: '/',
                has: [{ type: 'host', value: 'app.localhost' }],
                destination: '/subdomains/app ',
            },
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'app.localhost' }],
                destination: '/subdomains/app/:path*',
            },

            {
                source: '/',
                has: [{ type: 'host', value: 'admin.localhost' }],
                destination: '/subdomains/admin',
            },
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'admin.localhost' }],
                destination: '/subdomains/admin/:path*',
            },

        ]
    },
}
