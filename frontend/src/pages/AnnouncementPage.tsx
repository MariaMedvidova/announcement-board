import React, { useEffect, useState } from "react";
import AnnouncementForm from "../components/AnnouncementForm";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Announcement, Category, CategorySelect, DbAnnouncement } from "../types/announcement";

const AnnouncementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<CategorySelect[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('/categories');
        const categories = response.data.map((category) => ({
          value: category.id.toString(),
          label: category.name,
        }));
        setCategoryOptions(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchAnnouncement = async () => {
        try {
          const response = await axios.get<Announcement>(`/announcements/${id}`);
          setAnnouncement(response.data);
        } catch (error) {
          console.error("Error fetching announcement:", error);
        }
      };

      fetchAnnouncement();
    }
  }, [id]);

  const handleSubmit = async (announcementData: DbAnnouncement) => {
    try {
      if (id) {
        await axios.put(`/announcements/${id}`, announcementData);
      } else {
        await axios.post("/announcements", announcementData);
      }
      navigate("/");
    } catch (error) {
      alert('Something went wrong!');
      console.error("Error saving announcement:", error);
    }
  };

  return (
    <AnnouncementForm
      announcement={announcement}
      categoryOptions={categoryOptions}
      onSubmit={handleSubmit}
    />
  );
};

export default AnnouncementPage;
