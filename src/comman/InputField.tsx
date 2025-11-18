import React from "react";

interface InputFieldProps {
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode; // Optional left icon (e.g., <GoPerson />)
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
  icon,
}) => {
  return (
    <div className="relative flex flex-col">
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            {icon}
          </span>
        )}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className={`w-full ${
            icon ? "pl-12" : "pl-4"
          } pr-4 py-3 md:py-4 rounded-md bg-white border text-gray-800 
          placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:ring-yellow-500 focus:border-transparent"
          }`}
        />
      </div>

      {/* Error message (below input) */}
      {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
    </div>
  );
};

export default InputField;
