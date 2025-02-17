import { useState } from "react";
import { Button, Tooltip, Menu, MenuItem, Group, Box } from "@mantine/core";
import {
  IconExternalLink,
  IconEdit,
  IconCloudUpload,
  IconFileText,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface PublishOption {
  value: string;
  label: string;
}

interface BlogDetailsToolbarProps {
  publish: string;
  backLink: string;
  editLink: string;
  liveLink: string;
  publishOptions: PublishOption[];
  onChangePublish: (value: string) => void;
  sx?: React.CSSProperties;
}

export default function BlogDetailsToolbar({
  publish,
  backLink,
  editLink,
  liveLink,
  publishOptions,
  onChangePublish,
  sx,
}: BlogDetailsToolbarProps) {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <Group align="apart" style={{ marginBottom: 20, ...sx }}>
        <Button component={Link} to={backLink}>
          Back
        </Button>

        <Box style={{ flexGrow: 1 }} />

        {publish === "published" && (
          <Tooltip label="Go Live" withArrow>
            <Button component={Link} to={liveLink} variant="subtle">
              <IconExternalLink size={20} />
            </Button>
          </Tooltip>
        )}

        <Tooltip label="Edit" withArrow>
          <Button component={Link} to={editLink} variant="subtle">
            <IconEdit size={20} />
          </Button>
        </Tooltip>

        <Menu opened={menuOpened} onClose={() => setMenuOpened(false)}>
          <Menu.Target>
            <Button
              variant="filled"
              color="gray"
              onClick={() => setMenuOpened((o) => !o)}
            >
              {publish || "Loading…"}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {publishOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => {
                  setMenuOpened(false);
                  onChangePublish(option.value);
                }}
              >
                {option.value === "published" ? (
                  <IconCloudUpload size={16} style={{ marginRight: 8 }} />
                ) : (
                  <IconFileText size={16} style={{ marginRight: 8 }} />
                )}
                {option.label}
              </MenuItem>
            ))}
          </Menu.Dropdown>
        </Menu>
      </Group>
    </>
  );
}
