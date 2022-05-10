import { FiX } from 'react-icons/fi';
import { Container } from './styles';

const Head = ({ keys, head }: any) => {
  const tableHead = head || {};
  return (
    <thead>
      <tr>
        {keys.map((key: any) => (
          <th key={key}>{tableHead[key]}</th>
        ))}
        <th> Ações </th>
      </tr>
    </thead>
  );
};

const Row = ({ record }: any) => {
  const keys = Object.keys(record);

  const handleDelete = async (id: string) => {};

  return (
    <tr key={record.id}>
      {keys.map((key: string) => (
        <td key={key}>{record[key]}</td>
      ))}

      <td key={record.id}>
        <FiX size={20} color="#9C1524" onClick={() => handleDelete(record.id)} />
      </td>
    </tr>
  );
};

export function TableSells({ data, head }: any) {
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
