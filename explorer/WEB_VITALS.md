# Web Vitals CI/CD

Minimal web vitals monitoring for the explorer app using Lighthouse CI.

## What it does

- Runs Lighthouse performance audit on every push/PR
- Checks Core Web Vitals: LCP, CLS, FCP
- Uploads reports as GitHub artifacts
- Warns if performance drops below thresholds

## ✅ Requirements Checklist

### 📦 Packages (Already Installed)

- ✅ `web-vitals: ^3.5.2` - Core web vitals library
- ✅ `next: ^14.2.26` - Next.js framework
- ✅ `@lhci/cli` - Installed in CI workflow (not in package.json)

### 🔧 GitHub Secrets (Required)

Set these in **Settings → Secrets and variables → Actions**:

```bash
# Required for app build
AUTO_DRIVE_API_KEY=your_auto_drive_key
AUTO_EVM_RPC_URL=your_evm_rpc_url
USER_SESSION_CONTRACT_ADDRESS=your_contract_address
USER_SESSION_PRIVATE_KEY=your_private_key
NEXT_PUBLIC_MAINNET_INDEXERS=your_mainnet_indexers
NEXT_PUBLIC_TAURUS_INDEXERS=your_taurus_indexers
```

### 🌍 Environment Setup

1. **Node.js**: ≥20.19.0 ✅ (specified in package.json)
2. **Yarn**: Package manager ✅ (working)
3. **Repository access**: GitHub Actions enabled ✅

### 📁 Files Structure

```
explorer/
├── .github/workflows/web-vitals.yml  ✅ Created
├── lighthouserc.js                   ✅ Created
├── package.json                      ✅ Updated
└── WEB_VITALS.md                     ✅ This file
```

## Configuration

The setup uses these files:

- `.github/workflows/web-vitals.yml` - GitHub Actions workflow
- `lighthouserc.js` - Lighthouse CI configuration

## Thresholds

- **Performance Score**: > 75%
- **LCP (Largest Contentful Paint)**: < 2.5s
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s

## Reports

After each run, check:

1. **GitHub Actions summary** for quick results
2. **Artifacts** for detailed Lighthouse reports

## 🔍 Testing Setup

### Local testing

```bash
# Install Lighthouse CI globally
npm install -g @lhci/cli

# Test locally
yarn build && yarn start &
lhci autorun
```

### Verify GitHub Secrets

1. Go to **Settings → Secrets and variables → Actions**
2. Ensure all required secrets are set
3. Test with a small PR to verify workflow runs

## 🚨 Troubleshooting

### Common Issues:

1. **Missing secrets**: Build will fail - add required secrets
2. **Node version**: Ensure Node.js ≥20.19.0 in CI
3. **Yarn cache**: Clear if dependencies fail to install

### Debug Steps:

```bash
# Check if dependencies install
yarn install

# Test build locally
yarn build

# Test server starts
yarn start
```

That's it! 🚀
