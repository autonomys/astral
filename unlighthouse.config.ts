export default {
  // Site will be provided via CLI, but you can set it here too
  // site: 'https://your-site.com',

  ci: {
    // More granular budget control (optional - CLI budget of 75 will override this)
    budget: {
      performance: 75,
      accessibility: 80,
      "best-practices": 75,
      seo: 75,
    },
  },

  scanner: {
    // Device to emulate (mobile, desktop, or both)
    device: "desktop",

    // Number of samples per page for more accurate results
    samples: 1,

    // Throttling settings
    throttle: true,
  },

  discovery: {
    // Maximum pages to scan (useful for large sites)
    maxPages: 50,

    // Skip external links
    skipJavascript: false,
  },

  // Lighthouse configuration
  lighthouse: {
    // Additional Lighthouse options if needed
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  },
};
