import { useState, useCallback } from "react";
import { Container, Stack, Tabs, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import { useGetBlogs, useSearchBlogs } from "@/api/services";

import BlogSort from "@/components/Blog/BlogSort";
import { BlogListHorizontal } from "@/components/Blog/BlogList";
import { orderBy } from "lodash";

// ----------------------------------------------------------------------

const defaultFilters = {
  publish: "all",
};

export const POST_SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------

interface Post {
  id: string;
  title: string;
  publish: "published" | "draft";
  createdAt: string;
  totalViews: number;
  author: { name: string; avatarUrl: string };
  coverUrl: string;
  totalShares: number;
  totalComments: number;
  description: string;
}

interface Filters {
  publish: string;
}

export default function PostList() {
  const [sortBy, setSortBy] = useState<string>("latest");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery] = useDebouncedValue(searchQuery, 300);

  const { blogs, blogsLoading } = useGetBlogs();
  const { searchResults, searchLoading } = useSearchBlogs(debouncedQuery);

  const dataFiltered = applyFilter({
    inputData: blogs,
    filters,
    sortBy,
  });

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleFilters = useCallback((name: keyof Filters, value: string) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSearch = useCallback((inputValue: string) => {
    setSearchQuery(inputValue);
  }, []);

  const handleFilterPublish = useCallback(
    (value: string | null) => {
      if (value !== null) {
        handleFilters("publish", value);
      }
    },
    [handleFilters]
  );

  return (
    <Container mt={50}>
      <Stack
        gap="md"
        justify="space-between"
        align="center"
        mb={{ base: 3, md: 5 }}
      >
        <BlogSort
          sort={sortBy}
          onSort={handleSortBy}
          sortOptions={POST_SORT_OPTIONS}
        />
      </Stack>

      <Tabs
        value={filters.publish}
        onChange={handleFilterPublish}
        mb={{ base: 3, md: 5 }}
        style={{ display: "flex" }}
      >
        {["all", "published", "draft"].map((tab) => (
          <Tabs.Tab
            key={tab}
            value={tab}
            rightSection={
              <Text
                color={
                  tab === "published"
                    ? "blue"
                    : tab === "draft"
                    ? "gray"
                    : "inherit"
                }
                fw={tab === filters.publish ? "bold" : "normal"}
              >
                {tab === "all" && blogs.length}
                {tab === "published" &&
                  blogs.filter((post: Post) => post.publish === "published")
                    .length}
                {tab === "draft" &&
                  blogs.filter((post: Post) => post.publish === "draft").length}
              </Text>
            }
          >
            {tab}
          </Tabs.Tab>
        ))}
      </Tabs>

      <BlogListHorizontal posts={dataFiltered} loading={blogsLoading} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
  sortBy,
}: {
  inputData: Post[];
  filters: Filters;
  sortBy: string;
}) => {
  const { publish } = filters;

  if (sortBy === "latest") {
    inputData = orderBy(inputData, ["createdAt"], ["desc"]);
  }

  if (sortBy === "oldest") {
    inputData = orderBy(inputData, ["createdAt"], ["asc"]);
  }

  if (sortBy === "popular") {
    inputData = orderBy(inputData, ["totalViews"], ["desc"]);
  }

  if (publish !== "all") {
    inputData = inputData.filter((post) => post.publish === publish);
  }

  return inputData;
};
