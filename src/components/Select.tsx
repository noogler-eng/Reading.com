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
}: {
  title: string;
  items: string[];
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
