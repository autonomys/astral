module.exports = {
  ci: {
    collect: {
      startServerCommand: 'cd explorer && yarn start',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.75 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
