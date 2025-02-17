import { paramCase } from "@/utils";
import {
  Card,
  Stack,
  Box,
  Pagination,
  Text,
  Avatar,
  Menu,
  ActionIcon,
  Group,
  Image,
  Badge,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDots,
  IconEye,
  IconEdit,
  IconTrash,
  IconMessageCircle,
  IconShare,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  author: { name: string; avatarUrl: string };
  createdAt: string | Date;
  publish: string;
  coverUrl: string;
  totalViews: number;
  totalShares: number;
  totalComments: number;
  description: string;
}

interface BlogListHorizontalProps {
  posts: Post[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export function BlogListHorizontal({
  posts,
  loading,
  onDelete,
}: BlogListHorizontalProps) {
  return (
    <>
      <Box
        style={{
          display: "grid",
          gap: "12px",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        }}
        mb={100}
      >
        {loading
          ? Array.from({ length: 16 }).map((_, index) => (
              <PostItemSkeleton key={index} />
            ))
          : posts.map((post) => (
              <PostItemHorizontal
                key={post.id}
                post={post}
                onDelete={onDelete}
              />
            ))}
      </Box>
    </>
  );
}

interface PostItemHorizontalProps {
  post: Post;
  onDelete: (id: string) => void;
}

export function PostItemHorizontal({
  post,
  onDelete,
}: PostItemHorizontalProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(post.id);
  };

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Group wrap="nowrap" align="start">
        <Image
          src={post.coverUrl}
          alt={post.title}
          width={220}
          height={100}
          radius="md"
        />
        <Stack gap="xs" style={{ flex: 1 }}>
          <Group align="apart">
            <Badge color={post.publish === "published" ? "blue" : "gray"}>
              {post.publish}
            </Badge>
            <Text size="xs" color="dimmed">
              {format(new Date(post.createdAt), "PP")}
            </Text>
          </Group>
          <Text fw={500} lineClamp={2}>
            {post.title}
          </Text>
          <Text size="sm" color="dimmed" lineClamp={2}>
            {post.description}
          </Text>
          <Group align="apart">
            <Group gap="xs">
              <Avatar src={post.author.avatarUrl} size={30} radius="xl" />
              <Text size="sm">{post.author.name}</Text>
            </Group>
            <Group gap="xs">
              <Group gap={4} color="dimmed">
                <Group gap={4}>
                  <IconMessageCircle size={16} /> {post.totalComments}
                </Group>
                <Group gap={4}>
                  <IconEye size={16} /> {post.totalViews}
                </Group>
                <Group gap={4}>
                  <IconShare size={16} /> {post.totalShares}
                </Group>
              </Group>
              <Menu opened={opened} onClose={close} width={140} withinPortal>
                <Menu.Target>
                  <ActionIcon onClick={toggle} color={opened ? "blue" : "gray"}>
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconEye size={16} />}
                    onClick={() => navigate(`/blog/${paramCase(post.title)}`)}
                  >
                    View
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconEdit size={16} />}
                    onClick={() => navigate(`/blog/${paramCase(post.title)}`)}
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconTrash size={16} />}
                    color="red"
                    onClick={handleDelete}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
}

export function PostItemSkeleton() {
  return (
    <Card shadow="sm" h={200} padding="md" radius="md" withBorder>
      <Group align="center" justify="center" style={{ height: "100%" }}>
        <Loader />
      </Group>
    </Card>
  );
}
