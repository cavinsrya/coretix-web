import { Search } from "lucide-react";
import Input from "../atoms/Input";

export default function SearchBar() {
  return (
    <div className="flex items-center flex-1 relative ml-auto">
      <Input
        id="searchbar"
        name="searchbar"
        placeholder="Cari Event Seru di sini"
        className="w-full py-2 px-4 rounded-md bg-white text-black text-sm"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        <Search className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  );
}
