import { Extrinsic } from '../../gql/graphql';

interface Props {
  extrinsics: Extrinsic[];
}

const ExtrinsicList = ({ extrinsics }: Props) => (
  <div>
    <h1>Extrinsics:</h1>
    <div>
      {extrinsics.map(({ hash }, i) => (
        <div key={hash}>
          {i + 1}. {hash}
        </div>
      ))}
    </div>
  </div>
);

export default ExtrinsicList;
