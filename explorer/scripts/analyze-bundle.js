#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Analyze bundle size and identify optimization opportunities
function analyzeBundle() {
  console.log('🔍 Analyzing bundle for optimization opportunities...\n')

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies }

  // Large packages that should be lazy loaded
  const largePackages = [
    'ethers',
    '@nivo/core',
    '@nivo/line',
    '@nivo/bar',
    '@nivo/pie',
    'd3',
    'swiper',
    'formik',
    'yup',
    'lodash',
    'react-icons',
    '@polkadot/extension-dapp',
    '@polkadot/react-identicon',
    'lottie-react',
    'qrcode.react',
    'react-json-view',
    'swagger-ui-react',
    'xlsx',
    'pako',
  ]

  console.log('📦 Large packages that should be lazy loaded:')
  largePackages.forEach((pkg) => {
    if (dependencies[pkg]) {
      console.log(`  ✅ ${pkg} - ${dependencies[pkg]}`)
    }
  })

  console.log('\n🚀 Optimization recommendations:')
  console.log('1. Use dynamic imports for large packages')
  console.log('2. Implement code splitting for routes')
  console.log('3. Lazy load heavy components')
  console.log('4. Use tree shaking for unused code')
  console.log('5. Optimize images and assets')
  console.log('6. Enable compression and caching')

  console.log('\n📊 Bundle analysis complete!')
}

// Check for duplicate dependencies
function checkDuplicates() {
  console.log('\n🔍 Checking for duplicate dependencies...')

  try {
    const yarnLock = fs.readFileSync('yarn.lock', 'utf8')
    const lines = yarnLock.split('\n')
    const duplicates = {}
    let currentPackage = null

    lines.forEach((line) => {
      if (line.startsWith('"') && line.includes('@')) {
        currentPackage = line.split('"')[1]
        if (!duplicates[currentPackage]) {
          duplicates[currentPackage] = []
        }
      } else if (line.startsWith('  version ') && currentPackage) {
        const version = line.split('"')[1]
        if (!duplicates[currentPackage].includes(version)) {
          duplicates[currentPackage].push(version)
        }
      }
    })

    const actualDuplicates = Object.keys(duplicates).filter((dep) => duplicates[dep].length > 1)

    if (actualDuplicates.length > 0) {
      console.log('⚠️  Found duplicate dependencies:')
      actualDuplicates.forEach((dep) => {
        console.log(`  ${dep}: ${duplicates[dep].join(', ')}`)
      })
    } else {
      console.log('✅ No duplicate dependencies found')
    }
  } catch (error) {
    console.log('⚠️  Could not check for duplicates (yarn.lock not found)')
  }
}

// Main execution
if (require.main === module) {
  analyzeBundle()
  checkDuplicates()
}

module.exports = { analyzeBundle, checkDuplicates }
