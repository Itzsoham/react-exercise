import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Divider,
  Checkbox,
  Avatar,
  Stack,
  Badge,
  Loader,
} from "@mantine/core";
import { IconHeart, IconArrowLeft } from "@tabler/icons-react";
import { useGetBlog } from "@/api/services";
import BlogDetailsToolbar from "@/components/Blog/BlogDetailsToolbar";
import BlogDetailsHero from "@/components/Blog/BlogDetailsHero";
import Markdown from "@/components/MarkDown";

export const POST_PUBLISH_OPTIONS = [
  {
    value: "published",
    label: "Published",
  },
  {
    value: "draft",
    label: "Draft",
  },
];

export default function BlogDetails() {
  const { title } = useParams<{ title: string }>();

  const [publish, setPublish] = useState<string>("");

  const { blog, blogLoading } = useGetBlog(title || "");
  const post = blog?.post;

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  useEffect(() => {
    if (post) {
      setPublish(post?.publish || "");
    }
  }, [post]);

  if (blogLoading) return <Loader />;

  if (!blog) return null;

  return (
    <Container>
      <BlogDetailsToolbar
        backLink={"/blogs"}
        editLink={"/"}
        liveLink={"/"}
        publish={publish || ""}
        onChangePublish={handleChangePublish}
        publishOptions={POST_PUBLISH_OPTIONS}
      />

      <BlogDetailsHero title={post.title} coverUrl={post.coverUrl} />

      <Stack gap="md" align="center" mt="xl">
        <Title order={2}>{post.description}</Title>
        <Markdown content={post.content} />

        <Group gap="xs">
          {post.tags.map((tag: string) => (
            <Badge key={tag} color="blue" variant="light">
              {tag}
            </Badge>
          ))}
        </Group>

        <Group gap="sm">
          <Checkbox
            defaultChecked
            color="red"
            icon={() => <IconHeart />}
            label={post.totalFavorites.toString()}
          />

          <Group gap="xs">
            {post.favoritePerson.map(
              (person: { name: string; avatarUrl: string }) => (
                <Avatar
                  key={person.name}
                  src={person.avatarUrl}
                  radius="xl"
                  size="md"
                />
              )
            )}
          </Group>
        </Group>
      </Stack>

      <Divider my="lg" />
    </Container>
  );
}
