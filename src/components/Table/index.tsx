import { Container } from './styles';

const Head = ({ keys, head }: any) => {
  const tableHead = head || {};
  return (
    <thead>
      <tr>
        {keys.map((key: any) => (
          <th key={key}>{tableHead[key] || key}</th>
        ))}
      </tr>
    </thead>
  );
};

const Row = ({ record }: any) => {
  const keys = Object.keys(record);
  return (
    <tr key={record.id}>
      {keys.map((key: string) => (
        <td key={key}>{record[key]}</td>
      ))}
    </tr>
  );
};

export default function Table({ data, head }: any) {
  const keys = Object.keys(data[0]);
  return (
    <Container>
      <table>
        <Head keys={keys} head={head} />
        <tbody>
          {data.map((record: any) => (
            <Row record={record} />
          ))}
        </tbody>
      </table>
    </Container>
  );
}
