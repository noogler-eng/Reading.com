import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectScrollable({
  title,
  items,
  handelData,
}: {
  title: string;
  items: string[];
  handelData: (key: string, value: string) => void;
}) {
  return (
    <Select onValueChange={(value) => handelData(title, value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`${title}`} />
      </SelectTrigger>
      <SelectContent className="bg-black text-white">
        <SelectGroup>
          {items.map((item: string, index: any) => {
            return (
              <SelectItem value={item} key={index}>
                {item}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
