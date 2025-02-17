import { useState, useCallback, useEffect } from "react";
import { Container, Stack, Tabs, Text } from "@mantine/core";
import { orderBy } from "lodash";
import { useNavigate, useLocation } from "react-router-dom";

import { useGetBlogs } from "@/api/services";
import { BlogListHorizontal } from "@/components/Blog/BlogListHorizontal";
import { POST_SORT_OPTIONS } from "@/utils/constants";
import BlogSort from "@/components/Blog/BlogSort";

const defaultFilters = {
  publish: "all",
};

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

export default function BlogList() {
  const [sortBy, setSortBy] = useState<string>("latest");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [filteredBlogs, setFilteredBlogs] = useState<Post[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const { blogs, blogsLoading } = useGetBlogs();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const querySortBy = searchParams.get("sortBy") || "latest";
    const queryPublish = searchParams.get("publish") || "all";

    setSortBy(querySortBy);
    setFilters({ publish: queryPublish });
  }, [location.search]);

  useEffect(() => {
    setFilteredBlogs(applyFilter({ inputData: blogs, filters, sortBy }));
  }, [blogs, filters, sortBy]);

  const handleSortBy = useCallback(
    (newValue: string) => {
      setSortBy(newValue);
      navigate(`?sortBy=${newValue}&publish=${filters.publish}`);
    },
    [filters.publish, navigate]
  );

  const handleFilters = useCallback(
    (name: keyof Filters, value: string) => {
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      navigate(`?sortBy=${sortBy}&publish=${value}`);
    },
    [sortBy, navigate]
  );

  const handleFilterPublish = useCallback(
    (value: string | null) => {
      if (value !== null) {
        handleFilters("publish", value);
      }
    },
    [handleFilters]
  );

  const handleDelete = useCallback((id: string) => {
    setFilteredBlogs((prevBlogs) => prevBlogs.filter((post) => post.id !== id));
  }, []);

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

      <BlogListHorizontal
        posts={filteredBlogs}
        loading={blogsLoading}
        onDelete={handleDelete}
      />
    </Container>
  );
}

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
