import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { CiEdit } from "react-icons/ci";
import { Announcement } from "../types/announcement";

type TableData = Announcement;

const TableWrapper = styled.div`
  margin: 1rem;
  margin-top: 2rem;
  margin-bottom: 0;
`;

const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 0.8rem;
`;

const TableHead = styled.thead`
  background-color: white;
`;

const TableHeader = styled.th<{ columnWidth: string }>`
  text-align: left;
  padding: 1rem;
  border-bottom: 2px solid #dee2e6;
  width: ${(props) => props.columnWidth};
`;

const FirstTableHeader = styled(TableHeader)`
  padding-left: 3rem;
`;

const TableBody = styled.tbody`
  background-color: white;
`;

const TableRow = styled.tr``;

const TableCell = styled.td<{ columnWidth: string }>`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid #dee2e6;
  width: ${(props) => props.columnWidth};
`;

const FirstTableCell = styled(TableCell)`
  padding-left: 3rem;
`;
const LastTableCell = styled(TableCell)`
  text-align: right;
`;

const ActionButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.25rem;

  &:hover {
    color: #0056b3;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
`;

const AnnouncementTable: React.FC<{ announcements: TableData[] }> = ({
  announcements,
}) => {
  const formatDate = (dateString: string) =>
    format(new Date(dateString), "MMM dd, yyyy HH:mm");

  return (
    <TableWrapper>
      <Title>Announcements</Title>
      <TableStyled>
        <TableHead>
          <tr>
            <FirstTableHeader columnWidth="20%">Title</FirstTableHeader>
            <TableHeader columnWidth="15%">Publication Date</TableHeader>
            <TableHeader columnWidth="15%">Last Update</TableHeader>
            <TableHeader columnWidth="20%">Categories</TableHeader>
            <TableHeader columnWidth="40%"></TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          {announcements.map((announcement) => (
            <TableRow key={announcement.id}>
              <FirstTableCell columnWidth="30%">
                {announcement.title}
              </FirstTableCell>
              <TableCell columnWidth="15%">
                {formatDate(announcement.publicationDate)}
              </TableCell>
              <TableCell columnWidth="15%">
                {formatDate(announcement.updatedAt)}
              </TableCell>
              <TableCell columnWidth="20%">
                {announcement.categories
                  .map((category) => category.name)
                  .join(", ")}
              </TableCell>
              <LastTableCell columnWidth="40%">
                <ActionButton
                  onClick={() =>
                    (window.location.href = `/announcements/edit/${announcement.id}`)
                  }
                >
                  <CiEdit />
                </ActionButton>
              </LastTableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableStyled>
    </TableWrapper>
  );
};

export default AnnouncementTable;
