import { Header } from "@mantine/core";

function CustomHeader(props) {
  const { children } = props;
  return (
    <Header
      height={160}
      pt="xs"
      className="mb-8 xs:mb-0"
      sx={{
        background: "transparent",
        border: "none",
      }}
    >
      <div className="h-full flex flex-col xs:flex-row justify-evenly xs:justify-between items-center px-4">
        {children}
      </div>
    </Header>
  );
}

export default CustomHeader;
