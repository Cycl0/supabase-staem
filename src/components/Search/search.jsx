import { TextInput, Select } from "@mantine/core";
import "./search.scss";

function Search(props) {
  const { onSearch, setSort, sort } = props;
  return (
    <div
      className="search w-[95%] sm:flex justify-between align-center font-bold"
      style={{
        fontSize: "1rem !important",
      }}
    >
      <TextInput
        onChange={onSearch}
        placeholder="Search"
        radius="xl"
        size="md"
        sx={{
          minWidth: "245px",
        }}
      />
      <div className="mt-2 sm:mt-0 flex flex-column">
        <span className="min-w-[84px] mr-0 sm:mr-4 text-white flex items-center">
          Sort by:
        </span>
        <Select
          value={sort}
          onChange={setSort}
          radius="xl"
          size="md"
          className="w-[245] sm:w-[480]"
          data={[
            { value: "title", label: "Name" },
            { value: "id", label: "ID" },
          ]}
        />
      </div>
    </div>
  );
}

export default Search;
