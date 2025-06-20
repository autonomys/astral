import { parseDeposit } from '@autonomys/auto-consensus';
import { ApiPromise, WsProvider } from '@polkadot/api';

async function testQuery() {
  // Connect to the remote endpoint
  const provider = new WsProvider('wss://rpc.taurus.subspace.foundation/ws');
  const api = await ApiPromise.create({ provider });
  const api2 = await api.at('0xeed6d02ff3a86950e6a0a70b6b615af93e12c85202ca92db021a7d5755e6d0ae');
  console.log('Connected to chain');
  
  // Wait for the API to be ready
  await api.isReady;
  
  try {
    // console.log('\n=== Testing known working combinations ===');
    
    // Test the combinations we know work from the previous run
    const workingCombos = [
      { operatorId: 9, domainId: 0, epochIndex: 16850 },
    ];
    
    for (const combo of workingCombos) {
      console.log(`\nTesting operator ${combo.operatorId}, domain ${combo.domainId}, epoch ${combo.epochIndex}`);
      try {
        const result = await api.query.domains.operatorEpochSharePrice(
          combo.operatorId, 
          [combo.domainId, combo.epochIndex]
        );
        console.log(`✅ Result: ${result.toString()}`);
        console.log(`   isEmpty: ${result.isEmpty}`);
        console.log(`   toJSON: ${JSON.stringify(result.toJSON())}`);
      } catch (e: any) {
        console.log(`❌ Error: ${e.message}`);
      }
    }
    
    const result = await api2.query.domains.deposits(651,"sugH8z68ybhdCU1T6CyAE671c8VsvnBxHJEehxciKNmuDdeYg");
    console.log(result.toHuman());
    // for (const [key, value] of result) {
      // Use parseDeposit to properly extract operatorId and accountId  
      const deposit = parseDeposit([result[0], result[1]]);
      const operatorId = deposit.operatorId.toString();
      const accountId = deposit.account;

  
      const known = deposit.known;
      const pending = deposit.pending;
  
      const knownShares: bigint = BigInt(known.shares.toString());
      const knownStorageFD: bigint = BigInt(known.storageFeeDeposit.toString());
      console.log(operatorId, accountId, knownShares, knownStorageFD);
    // }
    
  } catch (error: any) {
    console.error('Test failed:', error.message);
  }
  
  await api.disconnect();
}

testQuery().catch(console.error); 