import React from "react";
import Button from "./UI/Button";
interface DeleteProps {
  title: string;
  description: string;
}
const Delete: React.FC<DeleteProps> = ({ title, description }) => {
  return (
    <div className=" modal-content">
      <h2 className="text-destructive2 mb-6">{title}</h2>
      <p className=" text-base text-gray3 mb-6">{description}</p>
      <div className="flex justify-center gap-x-4">
        <Button
          label={"Delete"}
          type={"small destructive"}
          classes={"w-full"}
          onClick={() => {}}
        />
        <Button
          label={"Cancel"}
          type={"small secondary"}
          classes={"w-full"}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Delete;
