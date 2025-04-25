import Locus from "../Locus/Locus";
import Module from "../Module/Module";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function FilterBar() {
  return (
    <div className="flex gap-4 items-center">
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="border border-slate-6 rounded-md p-2 w-full"
        />
        <Button type="submit">Search</Button>
        <Select>
          <SelectTrigger className="bg-slate-1">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expiry">Expiry date</SelectItem>
            <SelectItem value="upload">Upload date</SelectItem>
          </SelectContent>
        </Select>
      </form>
    </div>
  );
}
