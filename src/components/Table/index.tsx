import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    //await api.delete(`/${link}/${id}`);
    navigate(`/${link}`);
  };

  return (
    <tr key={record.id}>
      {keys.map((key: string) => (
        <td key={key}>{record[key]}</td>
      ))}
      <td>
        <Link to={'/' + link + '/' + record.id}>
          <AiFillEdit />
        </Link>
        {/* <button
          onClick={() => {
            handleDelete(record.id);
          }}
        >*/}
        <AiFillDelete />
        {/*</button> */}
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
