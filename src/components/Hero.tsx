import { RainbowButton } from "./ui/rainbow-button";
import SparklesText from "@/components/ui/sparkles-text";
import { BookA } from "lucide-react";
import { AudioLines } from 'lucide-react';
import { ChartColumnStacked } from 'lucide-react';


export default function Hero({ course }: any) {
  return (
    <div className="w-full flex flex-col gap-2 min-h-screen py-4">
      <img
        alt="Card background"
        className="object-cover rounded-xl w-full"
        src={course?.image || ""}
        width={""}
      />
      <h1 className="text-4xl w-full py-2 font-extrabold">{course?.title}</h1>
      <div className="flex items-center justify-start w-full pl-1 text-sm gap-1">
        <p className="text-blue-500 font-semibold font-semibold flex gap-1">
          {" "}
          <ChartColumnStacked size={18}/>
          {course.category.toUpperCase()}{" "}
          <span className="text-gray-200 font-semibold">.</span>{" "}
        </p>
        <p className="text-blue-500 font-semibold flex gap-1">
          {" "}
          <AudioLines size={18}/>
          {course.level.toUpperCase()}{" "}
          <span className="text-gray-200 font-extrabold">.</span>{" "}
        </p>
        <p className="text-blue-500 font-semibold flex gap-1">
          {" "}
          <BookA size={18}/>
          {course.language.toUpperCase()}{" "}
        </p>
      </div>
      <div className="flex gap-2">
        <p className="bg-gray-200 p-1 rounded-lg text-black line-through font-extrabold flex items-center">
          Rs. {course.price}
        </p>
        <p className="p-1 rounded-lg bg-gray-200 text-black">
          <SparklesText
            text={`Rs. ${course.sellPrice}`}
            className="text-lg font-semibold"
          ></SparklesText>
        </p>
      </div>
      <div className="flex my-2">
        <div
          dangerouslySetInnerHTML={{ __html: course.des }}
          className="flex flex-col gap-2 p-1"
        />
      </div>
      <RainbowButton className="w-fit">buy course</RainbowButton>
    </div>
  );
}
