// next.config.js
module.exports = {
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
