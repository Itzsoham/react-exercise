import {
  Avatar,
  Box,
  Container,
  Stack,
  Text,
  Tooltip,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconShare } from "@tabler/icons-react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

interface Author {
  name: string;
  avatarUrl: string;
}

interface SocialAction {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface BlogDetailsHeroProps {
  title: string;
  author?: Author;
  coverUrl: string;
  createdAt?: string;
  socials?: SocialAction[];
}

const BlogDetailsHero: React.FC<BlogDetailsHeroProps> = ({
  title,
  author,
  coverUrl,
  createdAt,
  socials = [],
}) => {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        height: 480,
        position: "relative",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.64), rgba(0, 0, 0, 0.64)), url(${coverUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      <Container size="lg" style={{ height: "100%", position: "relative" }}>
        <Text
          size="xl"
          fw={700}
          style={{ position: "absolute", top: 32, maxWidth: 480 }}
        >
          {title}
        </Text>

        {author && createdAt && (
          <Stack
            align="center"
            gap="md"
            style={{
              position: "absolute",
              bottom: 32,
              left: 32,
              display: "flex",
            }}
          >
            <Avatar
              src={author.avatarUrl}
              alt={author.name}
              size={64}
              radius="xl"
            />
            <Stack gap={2}>
              <Text fw={500}>{author.name}</Text>
              <Text size="sm" opacity={0.7}>
                {dayjs(createdAt).format("MMM D, YYYY")}
              </Text>
            </Stack>
          </Stack>
        )}

        <Stack style={{ position: "absolute", bottom: 32, right: 32 }} gap="xs">
          <Tooltip label="Share post" position="left">
            <ActionIcon size="lg" variant="light" color="gray">
              <IconShare size={20} />
            </ActionIcon>
          </Tooltip>

          {socials.map((action) => (
            <Tooltip key={action.name} label={action.name} position="left">
              <ActionIcon size="lg" variant="light" color={action.color}>
                {action.icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

BlogDetailsHero.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
  coverUrl: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  socials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      color: PropTypes.string.isRequired,
    }) as PropTypes.Validator<SocialAction>
  ),
};

export default BlogDetailsHero;
