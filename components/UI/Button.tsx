interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  classes?: string;
  label: string;
  type: string;
}
const Button: React.FC<ButtonProps> = ({ label, type, classes, onClick }) => {
  return (
    <button
      className={`text-lg   rounded-full  px-6 font-bold cursor-pointer  transition-colors ${classes} ${
        type?.includes("primary")
          ? "text-white bg-primary2 hover:bg-primary1"
          : ""
      } ${
        type?.includes("secondary")
          ? "bg-secondary1 hover:bg-secondary2 text-primary2"
          : ""
      } ${
        type?.includes("destructive")
          ? " text-white bg-destructive2 hover:bg-destructive1"
          : ""
      }
      ${type.includes("small") ? "text-base py-2" : ""} ${
        type.includes("large") ? "py-4" : ""
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
