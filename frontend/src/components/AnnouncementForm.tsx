import React, { useState, useEffect } from "react";
import Select, { MultiValue, ActionMeta } from "react-select";
import makeAnimated from "react-select/animated";
import { useParams } from "react-router-dom";
import { Announcement, CategorySelect, DbAnnouncement } from "../types/announcement";
import {
  Container,
  Heading,
  Label,
  Input,
  TextArea,
  PublishButton,
} from "./FormElements";

const animatedComponents = makeAnimated();

interface AnnouncementFormProps {
  announcement: Announcement | null;
  categoryOptions: CategorySelect[];
  onSubmit: (announcementData: DbAnnouncement) => void;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  announcement,
  categoryOptions,
  onSubmit,
}) => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    CategorySelect[]
  >([]);
  const [publicationDate, setPublicationDate] = useState("");
  const [dateError, setDateError] = useState("");

  // MM/DD/YYYY HH:mm
  const isValidDateFormat = (dateString: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4}) (\d{2}):(\d{2})$/;
    return regex.test(dateString);
  };
  
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

  const convertToISODate = (dateString: string): string => {
    const [datePart, timePart] = dateString.split(" ");
    const [month, day, year] = datePart.split("/").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);

    // YYYY-MM-DDTHH:mm:ss
    return new Date(year, month - 1, day, hours, minutes).toISOString();
  };

  useEffect(() => {
    if (announcement) {
      setTitle(announcement.title);
      setContent(announcement.content || "");
      setPublicationDate(formatDate(announcement.publicationDate));

      setSelectedCategories(
        announcement.categories.map((category) => ({
          value: category.id.toString(),
          label: category.name,
        }))
      );
    }
  }, [announcement]);

  const handleCategoriesChange = (
    newValue: MultiValue<CategorySelect>,
    actionMeta: ActionMeta<CategorySelect>
  ) => {
    setSelectedCategories(Array.isArray(newValue) ? newValue : []);
  };

  const handlePublicationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPublicationDate(value);

    if (!isValidDateFormat(value)) {
      setDateError("Publication date must be in format MM/DD/YYYY HH:mm.");
    } else {
      setDateError("");
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !selectedCategories.length || !publicationDate) {
      alert("All fields are required.");
      return;
    }

    if (!isValidDateFormat(publicationDate)) {
      setDateError("Publication date must be in format MM/DD/YYYY HH:mm.");
      return;
    }

    const isoDate = convertToISODate(publicationDate);

    const payload: DbAnnouncement = {
      id: announcement?.id || 0,
      title,
      content,
      categoryIds: selectedCategories.map((category) => parseInt(category.value, 10)),
      publicationDate: isoDate,
      updatedAt: announcement?.updatedAt || "",
    };

    try {
      onSubmit(payload);
    } catch (error) {
      console.error("Error saving announcement:", error);
    }
  };

  return (
    <Container>
      <Heading>
        {id ? "Edit the announcement" : "Add a new announcement"}
      </Heading>

      <Label>Title</Label>
      <Input
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />

      <Label>Content</Label>
      <TextArea
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        rows={4}
      />

      <Label>Categories</Label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={categoryOptions}
        value={selectedCategories}
        onChange={handleCategoriesChange}
        styles={{
          container: (base) => ({
            ...base,
            marginBottom: "16px",
          }),
        }}
      />

      <Label>Publication Date</Label>
      <Input
        type="text"
        value={publicationDate}
        onChange={handlePublicationDateChange}
      />
      {dateError && <div style={{ color: "red", marginBottom: "16px" }}>{dateError}</div>}

      <PublishButton onClick={handleSubmit}>Publish</PublishButton>
    </Container>
  );
};

export default AnnouncementForm;
