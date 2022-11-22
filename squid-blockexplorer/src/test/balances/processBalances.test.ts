import tap from 'tap';
import sinon from 'sinon';
import { processBalancesFactory } from '../../balances';
import { processCall } from '../../balances/processCall';
import { CallItem, Context, EventItem } from '../../processor';
import { callItemWithSignature, contextMock, eventItemWithExtrinsic } from '../../mocks/mocks';
import BlockHeaderMock from '../../mocks/BlockHeader.json';

tap.test('processBalances should process balance-related items and save accounts', async (t) => {
  const dependencies = {
    processCall,
    processEvent: () => null,
    saveAccounts: () => Promise.resolve(),
  }
  const saveAccountsSpy = sinon.spy(dependencies, 'saveAccounts');
  const processCallSpy = sinon.spy(dependencies, 'processCall');
  const processEvent = sinon.spy(dependencies, 'processEvent');

  const processBalances = processBalancesFactory(dependencies);

  const items = [
    eventItemWithExtrinsic as EventItem,
    callItemWithSignature as CallItem,
  ];

  const blocks = [{
    header: {
      ...BlockHeaderMock,
      id: 'first block id',
      height: 10,
    },
    items,
  }]

  const context = { ...contextMock, blocks } as Context;

  await processBalances(context);

  t.ok(processCallSpy.calledOnce); 
  t.ok(processEvent.calledOnce); 
  // currently there are two saveAccounts calls in processBalances: within a loop and at the end
  // TODO: consider refactoring 
  t.ok(saveAccountsSpy.calledTwice); 

  t.end();
});
