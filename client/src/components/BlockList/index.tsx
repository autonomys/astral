import { useQuery } from '@apollo/client';

import BlockList from './BlockList';
import { QUERY_BLOCK_LIST } from './query';

const BlockListContainer = () => {
  const { data, error, loading } = useQuery(QUERY_BLOCK_LIST);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return <BlockList blocks={data.blocks} />;
};

export default BlockListContainer;
