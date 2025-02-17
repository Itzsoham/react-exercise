import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Title,
  Group,
  Divider,
  Stack,
  Badge,
  Loader,
  Button,
} from "@mantine/core";
import { useGetBlog } from "@/api/services";
import BlogDetailsHero from "@/components/Blog/BlogDetailsHero";
import Markdown from "@/components/MarkDown";

export default function BlogDetails() {
  const navigate = useNavigate();
  const { title } = useParams<{ title: string }>();
  const { blog, blogLoading } = useGetBlog(title || "");

  const post = blog?.post;

  if (blogLoading) return <Loader />;

  if (!blog) return null;

  return (
    <Container>
      <Group align="apart" my="xl">
        <Button onClick={() => navigate("/blogs")}>Back</Button>
      </Group>

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
      </Stack>

      <Divider my="lg" mb={100} />
    </Container>
  );
}
