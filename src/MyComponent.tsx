import React from "react";

interface MyComponentProps {
  message: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ message }) => {
  return <div>{message}</div>;
};
