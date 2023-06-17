import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface TextInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

interface ImperativeInput {
  error: (message: string) => void;
}

const TextInput = forwardRef<ImperativeInput, TextInputProps>(
  ({ label, name, placeholder, value, onChange }, ref) => {
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({
      error: (message: string) => {
        setError(message);
      },
    }));
    console.log("render: ", error);
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={name}
            className="block mb-2 text-gray3 text-sm font-bold"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type="text"
            name={name}
            value={value}
            ref={inputRef}
            className={`w-full border text-base  focus:border-primary2 py-2 px-4 rounded-md outline-none dark:bg-black2  dark:placeholder:text-gray3 placeholder:opacity-25 focus:ring-0 ${
              error ? "  border-destructive2" : "border-black1 "
            }`}
            placeholder={placeholder}
            onChange={onChange}
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
export default TextInput;
