import React, { useState, useEffect } from "react";
import axios from "axios";
import AnnouncementTable from "../components/AnnouncementTable";
import { Announcement } from "../types/announcement";
import Pagination from "../components/Pagination";

const ListPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`/announcements?page=${page}&limit=${limit}`)
      .then((response) => {
        setAnnouncements(response.data.announcements);
        setTotalPages(response.data.pagination.totalPages);
      })
      .catch((error) => console.error("Error fetching announcements:", error));
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <AnnouncementTable announcements={announcements} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ListPage;
