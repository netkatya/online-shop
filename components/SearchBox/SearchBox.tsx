interface SearchBoxProps {
  onChange: (newSearch: string) => void;
  value: string;
}

export default function SearchBox({ onChange, value }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={handleChange}
      className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none w-full md:w-1/3"
    />
  );
}
