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
  data,
  handelData,
}: {
  title: string;
  items: string[];
  data: string;
  handelData: (key: string, value: string) => void;
}) {
  console.log(data);
  return (
    <Select onValueChange={(value) => handelData(title, value)} value={data}>
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
