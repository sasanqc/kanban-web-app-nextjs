interface TextInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}
const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
}) => {
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
      <div className="">
        <input
          type="text"
          name={name}
          value={value}
          className=""
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default TextInput;
