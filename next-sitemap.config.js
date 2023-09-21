module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL,
	generateRobotsTxt: true,
	changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
		'/404',
		'/*/404',
		'/500',
		'/*/500',
	],
  robotsTxtOptions: {
    policies: (process.env.NEXT_PUBLIC_ALLOW_ROBOTS ? [
      {
        userAgent: '*',
        disallow: [
					'/404',
					'/*/404',
					'/500',
					'/*/500',
				],
      },
      { 
				userAgent: '*', 
				allow: '/' 
			},
    ] : [{ userAgent: '*', disallow: '/' }]),
  },
	// Default transformation function
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  additionalPaths: async (config) => [
    await config.transform(config, ''),
  ],
};