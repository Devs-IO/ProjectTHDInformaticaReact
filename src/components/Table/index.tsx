import { AiFillDelete, AiFillEdit, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import api from '../../services/api';
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

const Row = ({ record, link }: any) => {
  const keys = Object.keys(record);

  const handleDelete = async (id: string) => {
    await api.put(`/${link}/uploadActive/${id}`);
    window.location.reload();
  };

  return (
    <tr key={record.id}>
      {keys.map((key: string) => (
        <td key={key}>
          {key === 'active' ? (
            record[key] ? (
              <AiOutlineCheckCircle size={20} color="#00ff00" />
            ) : (
              <AiOutlineCloseCircle size={20} color="#ff0000" />
            )
          ) : (
            record[key]
          )}
        </td>
      ))}

      <td key={record.id}>
        <Link to={'/' + link + '/' + record.id}>
          <AiFillEdit />
        </Link>

        <AiFillDelete onClick={() => handleDelete(record.id)} />
      </td>
    </tr>
  );
};

export default function Table({ data, head, link }: any) {
  const keys = Object.keys(data[0]);
  return (
    <Container>
      <table>
        <Head keys={keys} head={head} />
        <tbody>
          {data.map((record: any) => (
            <Row record={record} link={link} />
          ))}
        </tbody>
      </table>
    </Container>
  );
}
