import React from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0rem 1rem;
  border-bottom: 1px solid #ddd;
`;

const PageInfo = styled.span`
  font-size: 0.8rem;
  color: #000;
  margin-right: 1rem;
`;

const Divider = styled.div`
  width: 1px;
  height: 46px;
  background-color: #ddd;
  margin-right: 1rem;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PageButton = styled.button<{ disabled: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background-color: white;
  color: ${(props) => (props.disabled ? "#999" : "#000")};
  cursor: pointer;
  border-radius: 4px;
  border-left: 1px solid #ddd;
  &:hover {
    background-color: ${(props) => (props.disabled ? "#ddd" : "#f1f1f1")};
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <PaginationWrapper>
      <Divider />
      <PageInfo>
        Page {currentPage} of {totalPages}
      </PageInfo>
      <PaginationControls>
        <PageButton disabled={currentPage === 1} onClick={handlePrevClick}>
          {"<"}
        </PageButton>
        <PageButton
          disabled={currentPage === totalPages}
          onClick={handleNextClick}
        >
          {">"}
        </PageButton>
      </PaginationControls>
    </PaginationWrapper>
  );
};

export default CustomPagination;
