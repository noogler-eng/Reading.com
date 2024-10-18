import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { RainbowButton } from "./ui/rainbow-button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function CourseCard({ courseData }: any) {
  console.log(courseData);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="py-2 w-3/12 bg-[#181818] text-white">
      <CardHeader className="pb-0 px-4 flex-col items-start gap-3">
        <p className="text-tiny uppercase font-bold">
          <Badge variant="default">{courseData.category}</Badge>
        </p>
        <div className="flex gap-2 w-full items-center">
          <Avatar src={courseData.instImage} />
          <div className="flex flex-col">
            <small className="text-default-500 text-xl">
              {courseData.instName}
            </small>
            <small className="text-blue-500">verified</small>
          </div>
        </div>
        <h4 className="font-bold text-large">{courseData.title.slice(0, 60)}...</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 w-full flex flex-col gap-2">
        {!isOpen ? (
          <Image
            isZoomed
            alt="Card background"
            className="object-cover rounded-xl w-fit"
            src={courseData.image}
            width={""}
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <div onClick={() => setIsOpen(!isOpen)} className="w-full">
            <p className="">{courseData.message}</p>
            <div className="flex gap-2 items-center">
              <small className="text-default-500">{courseData.level}</small>
              <small className="text-default-500">{courseData.language}</small>
            </div>
          </div>
        )}
        <RainbowButton className="w-full">Buy Course</RainbowButton>
      </CardBody>
    </Card>
  );
}
