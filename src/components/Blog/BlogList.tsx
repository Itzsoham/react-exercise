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
  Button,
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
}

export function BlogListHorizontal({
  posts,
  loading,
}: BlogListHorizontalProps) {
  return (
    <>
      <Box
        style={{
          display: "grid",
          gap: "12px",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {loading
          ? Array.from({ length: 16 }).map((_, index) => (
              <PostItemSkeleton key={index} />
            ))
          : posts.map((post) => (
              <PostItemHorizontal key={post.id} post={post} />
            ))}
      </Box>
      {posts.length > 8 && <Pagination total={8} mt="xl" />}
    </>
  );
}

interface PostItemHorizontalProps {
  post: Post;
}

export function PostItemHorizontal({ post }: PostItemHorizontalProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Stack>
        <Group align="apart">
          <Text
            size="xs"
            color={post.publish === "published" ? "blue" : "gray"}
          >
            {post.publish}
          </Text>
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
          <ActionIcon onClick={toggle} color={opened ? "blue" : "gray"}>
            <IconDots size={16} />
          </ActionIcon>
          <Group gap="xs" color="dimmed">
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
        </Group>
      </Stack>

      <Menu opened={opened} onClose={close} width={140} withinPortal>
        <Menu.Item
          leftSection={<IconEye size={16} />}
          onClick={() => navigate(`/blog/${paramCase(post.title)}`)}
        >
          View
        </Menu.Item>
        <Menu.Item
          leftSection={<IconEdit size={16} />}
          onClick={() => console.log("Edit Post")}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          leftSection={<IconTrash size={16} />}
          color="red"
          onClick={() => console.log("Delete Post")}
        >
          Delete
        </Menu.Item>
      </Menu>
    </Card>
  );
}

export function PostItemSkeleton() {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      Loading...
    </Card>
  );
}
