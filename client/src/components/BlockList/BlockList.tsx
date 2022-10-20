import { Block } from '../../gql/graphql';

interface Props {
  blocks: Block[];
}

const BlockList = ({ blocks }: Props) => (
  <div>
    <h1>Blocks:</h1>
    <div>
      {blocks.map(({ hash, height }) => (
        <div key={hash}>
          {height} - {hash}
        </div>
      ))}
    </div>
  </div>
);

export default BlockList;
