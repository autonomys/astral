import { useQuery } from '@apollo/client';

import ExtrinsicList from './ExtrinsicList';
import { QUERY_EXTRINSIC_LIST } from './query';

const BlockListContainer = () => {
  const { data, error, loading } = useQuery(QUERY_EXTRINSIC_LIST);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return <ExtrinsicList extrinsics={data.extrinsics} />;
};

export default BlockListContainer;
