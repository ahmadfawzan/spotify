import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { VscSearch } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function InputSearch({ Search, setSearch }) {
  const hendSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="divSearch">
      <Link to={`/Search/${Search}`}>
        <InputGroup size="sm" className="mb-3">
          {" "}
          <div className="divVscSearch">
            <VscSearch className="vscSearch"></VscSearch>
          </div>
          <Form.Control
            placeholder=" What do you want to listen to? "
            value={Search}
            onChange={hendSearch}
            className="inputSearch"
          />
        </InputGroup>
      </Link>
    </div>
  );
}
