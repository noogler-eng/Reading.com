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
  console.log(items);
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select a ${title}`} />
      </SelectTrigger>
      <SelectContent className="bg-black text-white">
        <SelectGroup>
          {items.map((item: string, index: any) => {
            return (
              <SelectItem
                value={item}
                key={index}
                onSelect={() => handelData(title, item)}
              >
                {item}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
