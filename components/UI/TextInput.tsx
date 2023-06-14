interface TextInputProps {
  label: string;
  name: string;
  placeholder: string;
}
const TextInput: React.FC<TextInputProps> = ({ label, name, placeholder }) => {
  return (
    <div className="">
      <label htmlFor={name} className="block  text-gray3 text-sm font-bold">
        {label}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={name}
          className=""
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};

export default TextInput;
