import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { RainbowButton } from "./ui/rainbow-button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../../store/user/userAtom";
import { CircleX } from "lucide-react";
import { Pencil } from "lucide-react";
import firebaseCourses from "../../lib/serverless/courses";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ courseData }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const handelEdit = async () => {
    navigate(`/my-courses/form?courseId=${courseData.id}`);
  };

  const handelDelete = async () => {
    try {
      firebaseCourses.handelDeleteCourse(courseData.id);
    } catch (error) {}
  };

  return (
    <Card className="py-2 w-3/12 bg-[#181818] text-white z-10">
      <CardHeader className="pb-0 px-4 flex-col items-start gap-3">
        <p className="text-tiny uppercase font-bold">
          <Badge variant="default">{courseData.category}</Badge>
        </p>
        <div className="flex gap-2 w-full items-center justify-between">
          <div className="flex gap-2 w-full items-center">
            <Avatar src={courseData.instImage} />
            <div className="flex flex-col">
              <small className="text-default-500 text-xl">
                {courseData.instName}
              </small>
              <small className="text-blue-500">verified</small>
            </div>
          </div>
          {courseData.instId == user?.id && (
            <div className="flex items-center gap-1 w-fit">
              <Button isIconOnly color="warning" onClick={handelEdit}>
                <Pencil size={16} />
              </Button>
              <Button isIconOnly color="danger" onClick={handelDelete}>
                <CircleX size={16} />
              </Button>
            </div>
          )}
        </div>
        <h4 className="font-bold text-large">
          {courseData.title.slice(0, 60)}...
        </h4>
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
            <p className="">{courseData.message.slice(0, 250)}</p>
            <div className="flex gap-2 items-center">
              <small className="text-default-500">{courseData.level}</small>
              <small className="text-default-500">{courseData.language}</small>
            </div>
          </div>
        )}
        <RainbowButton className="w-full">
          {courseData.instId == user?.id ? "View Course" : "Buy Course"}
        </RainbowButton>
      </CardBody>
    </Card>
  );
}
