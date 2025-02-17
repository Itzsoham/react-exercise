import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor } from "@mantine/tiptap";
import { Text } from "@mantine/core";

export default function ProductRichTextEditor({
  content,
}: {
  content: string;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Highlight],
    content,
  });

  return (
    <div>
      <Text size="sm" fw={500} mb={5}>
        Description
      </Text>
      <RichTextEditor editor={editor} variant="subtle">
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content
          style={{ height: "200px", overflowY: "auto" }}
        />
      </RichTextEditor>
    </div>
  );
}
