import { Anchor, Blockquote, Code, Divider, List, Table } from "@mantine/core";
import { createStyles, MantineTheme } from "@mantine/styles";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Link } from "react-router-dom";

interface MarkdownProps {
  content: string;
}

const useStyles = createStyles((theme: MantineTheme) => ({
  root: {
    "h1, h2, h3, h4, h5, h6": {
      margin: 0,
      fontWeight: 600,
    },
    p: {
      margin: 0,
    },
    blockquote: {
      borderLeft: `4px solid ${theme.colors.gray[6]}`,
      paddingLeft: theme.spacing.md,
      fontStyle: "italic",
    },
    pre: {
      backgroundColor: theme.colors.dark[7],
      padding: theme.spacing.md,
      borderRadius: theme.radius.sm,
      overflowX: "auto",
    },
    code: {
      backgroundColor: theme.colors.gray[1],
      padding: "2px 4px",
      borderRadius: theme.radius.xs,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      "th, td": {
        border: `1px solid ${theme.colors.gray[5]}`,
        padding: theme.spacing.xs,
      },
    },
  },
}));

const components = {
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) =>
    href?.startsWith("http") ? (
      <Anchor href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </Anchor>
    ) : (
      <Anchor component={Link} to={href || ""}>
        {children}
      </Anchor>
    ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <Blockquote>{children}</Blockquote>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <Code>{children}</Code>
  ),
  hr: () => <Divider my="sm" />,
  ul: ({ children }: { children?: React.ReactNode }) => (
    <List withPadding>{children}</List>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <List type="ordered">{children}</List>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <Table>{children}</Table>
  ),
};

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
