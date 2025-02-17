import { useState } from "react";
import { Button, Menu, MenuItem, Text, Group } from "@mantine/core";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";

interface SortOption {
  value: string;
  label: string;
}

interface BlogSortProps {
  sort: string;
  sortOptions: SortOption[];
  onSort: (value: string) => void;
}

export default function BlogSort({ sort, sortOptions, onSort }: BlogSortProps) {
  const [opened, setOpened] = useState(false);

  return (
    <Menu opened={opened} onChange={setOpened} width={140}>
      <Menu.Target>
        <Button
          variant="subtle"
          color="dark"
          onClick={() => setOpened(!opened)}
        >
          Sort By:
          <Text ml={5} fw={700}>
            {sort}
          </Text>
          {opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {sortOptions.map((option) => (
          <MenuItem key={option.value} onClick={() => onSort(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
