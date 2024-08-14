import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

export const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const PublishButton = styled.button`
  align-self: flex-end; 
  padding: 10px 20px;
  background-color: #ffb64a;
  color: #000;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 700;
  right: 0px;
`;
