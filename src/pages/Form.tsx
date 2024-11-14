import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import userAtom from "../../store/user/userAtom";
import { useRecoilValue } from "recoil";
import ShineBorder from "@/components/ui/shine-border";
import { SelectScrollable } from "@/components/Select";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { RainbowButton } from "@/components/ui/rainbow-button";

import firebaseCourse from "../../lib/serverless/courses";
import CourseData from "lib/types/courseData";
import InstData from "lib/types/InstData";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const user = useRecoilValue(userAtom);
  const [params] = useSearchParams();
  const courseId = params.getAll("courseId")[0] || null;

  const [data, setData] = useState<CourseData>();
  const [file, setFile] = useState<File | null>(null);
  const [des, setDes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getEditDataSet = async () => {
    try {
      const { data: course } = await firebaseCourse.getSpecificCourseData(
        courseId || ""
      );

      if (course) {
        setData({
          title: course.title,
          message: course.message,
          level: course.level,
          category: course.category,
          language: course.language,
          price: course.price,
          sellPrice: course.sellPrice,
        });
        setDes(course.des);
      } else {
        throw new Error("no data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelEditCourse = async (e: any) => {
    e.preventDefault();
    try {
      if (!data) throw new Error("data is empty");
      await firebaseCourse.editSpecifcCourse(courseId || "", data, file, des);
      console.log("course has been edited");
      navigate("/my-courses");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (courseId) {
      getEditDataSet();
    }
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <h1 className="text-2xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
          <span className="text-8xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
            Oops,
          </span>
          <br /> you are not signed in, my-courses/form
        </h1>
      </div>
    );
  }

  const categories = [
    "Development",
    "Business",
    "Finance & Accounting",
    "IT & Software",
    "Office Productivity",
    "Personal Development",
    "Design",
    "Marketing",
    "Lifestyle",
    "Photography & Video",
    "Health & Fitness",
    "Music",
    "Teaching",
  ];
  const levels = ["Begginer", "Moderate", "Advanced"];
  const languages = ["English", "Hindi"];

  // using [] means telling js to use the value of key instaed taking init
  const handelData = (key: string, value: string) => {
    setData((data: any) => {
      return {
        ...data,
        [key]: value,
      };
    });
  };

  // final form submission
  const handelCreateCourse = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!data || !file || !des) throw new Error("data can't be null");
      const instData: InstData = {
        id: user.id,
        email: user.email,
        name: user.name,
        photoUrl: user.image,
      };
      await firebaseCourse.createCourse(data, file, des, instData);
      setData({
        title: "",
        message: "",
        level: "",
        category: "",
        language: "",
        price: "",
        sellPrice: "",
      });
      setFile(null);
      setDes("");
    } catch (error) {
      console.log("error while creating the form", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 flex flex-col items-center w-full">
      <ShineBorder
        className="w-4/6 p-4 my-10 bg-transparent rounded-xl"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
        <div className="p-2 md:p-10 w-full flex flex-col items-center">
          <h1 className="text-xl md:text-5xl font-extrabold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent mb-10 underline">
            Create New Course
          </h1>
          <form
            onSubmit={courseId ? handelEditCourse : handelCreateCourse}
            className="flex flex-col items-center gap-3 justify-center z-10 text-white w-full"
          >
            <Input
              type="title"
              id="title"
              placeholder="title"
              className="w-5/6"
              required
              value={data?.title}
              onChange={(e) => handelData("title", e.target.value)}
              disabled={loading}
            />
            <Textarea
              placeholder="Type your message here."
              className="w-5/6"
              onChange={(e) => handelData("message", e.target.value)}
              value={data?.message}
              disabled={loading}
            />
            <div className="w-5/6">
              <input
                id="dropzone-file"
                type="file"
                className="w-full border rounded-lg p-2"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                disabled={loading}
              />
            </div>
            <div className="w-5/6 flex flex-col md:flex-row gap-3">
              <SelectScrollable
                title={"category"}
                items={categories}
                data={data?.category || ""}
                handelData={handelData}
              />
              <SelectScrollable
                title={"level"}
                items={levels}
                data={data?.level || ""}
                handelData={handelData}
              />
              <SelectScrollable
                title={"language"}
                items={languages}
                data={data?.language || ""}
                handelData={handelData}
              />
            </div>
            <div className="w-5/6 rounded-xl">
              {/* this gives us an html code */}
              <ReactQuill
                theme="snow"
                value={des}
                onChange={setDes}
                className="rounded-xl"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-5/6">
              <Input
                type="text"
                id="price"
                placeholder="price"
                className="w-5/6"
                required
                onChange={(e) => handelData("price", e.target.value)}
                disabled={loading}
                value={data?.price}
              />
              <Input
                type="sprice"
                id="sprice"
                placeholder="sell-price"
                className="w-5/6"
                required
                onChange={(e) => handelData("sellPrice", e.target.value)}
                disabled={loading}
                value={data?.sellPrice}
              />
            </div>
            <RainbowButton type="submit" disabled={loading} className="w-5/6">
              {courseId ? "Edit Course" : "Create New Course"}
            </RainbowButton>
          </form>
        </div>
      </ShineBorder>
    </div>
  );
}
