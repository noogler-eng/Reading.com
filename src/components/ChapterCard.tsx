import { Youtube } from "lucide-react";
import { Image } from "lucide-react";
import { Link } from "lucide-react";

export default function ChapterCard({ chapter }: { chapter: any }) {
  return (
    <div className="flex gap-2 w-full bg-gray-500 items-center p-3 justify-between p-1">
      <h2 className="text-xl items-center flex gap-2">
        {chapter.fileType == "youtube" ? (
          <Youtube size={18}/>
        ) : chapter.fileType == "image" ? (
          <Image size={18}/>
        ) : (
          <Link size={18}/>
        )}
        {chapter.title}
      </h2>
      <button
        onClick={() => {}}
        className="text-sm border rounded-xl py-1 px-2"
      >
        view
      </button>
    </div>
  );
}
