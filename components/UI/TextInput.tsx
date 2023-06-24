import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface TextInputProps {
  label?: string;
  name?: string;
  placeholder?: string;
  id?: string;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

interface ImperativeInput {
  error: (message: string) => void;
}

const TextInput = forwardRef<ImperativeInput, TextInputProps>(
  ({ label, id, name, placeholder, value, onChange }, ref) => {
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({
      error: (message: string) => {
        setError(message);
      },
    }));

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      e.stopPropagation();
      if (error) {
        setError("");
      }
      onChange(e);
    };
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block mb-2 text-gray3 text-sm font-bold"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type="text"
            name={name}
            id={id}
            value={value}
            ref={inputRef}
            className={`w-full border text-base  focus:border-primary2 py-2 px-4 rounded-md outline-none dark:bg-black2  dark:placeholder:text-white placeholder:text-black placeholder:opacity-25 focus:ring-0 ${
              error
                ? "  border-destructive2"
                : "dark:border-black1 border-black border-opacity-25"
            }`}
            placeholder={placeholder}
            onChange={handleChange}
            required
          />
          {error && (
            <div className="absolute top-[50%] translate-y-[-50%] right-4 text-destructive2 text-base">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }
);
TextInput.displayName = "TextInput";
export default TextInput;
