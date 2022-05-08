import React, { useState } from "react";
import { TextInput, Select, useMantineTheme } from "@mantine/core";
import "./search.scss";

function Search(props) {
  const { onSearch, setSort, sort } = props;
  const theme = useMantineTheme();
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
            { value: "id", label: "ID" },
            { value: "price", label: "Price" },
            { value: "title", label: "Name" },
          ]}
        />
      </div>
    </div>
  );
}

export default Search;
