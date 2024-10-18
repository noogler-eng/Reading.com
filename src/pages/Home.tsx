// import { useRecoilValue } from "recoil";
// import userAtom from "../../store/user/userAtom";

import { MarqueeDemo } from "@/components/Marquee";
import firebaseCourse from "../../lib/serverless/courses";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@radix-ui/react-avatar";

export default function Home() {
  const [data, setData] = useState<any>();

  const getCourses = async () => {
    const data = await firebaseCourse.getAllCourse();
    const courseDataInJson = data.docs.map((item) => {
      //@ts-ignore
      return item["_document"]["data"]["value"]["mapValue"]["fields"];
    });

    setData(courseDataInJson);
  };

  useEffect(() => {
    getCourses();
  }, []);

  console.log(data);

  return (
    <div className="p-6 flex items-center flex-col">
      <h2 className="text-5xl font-extrabold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent my-10">
        Practice Your Carrer With Us.
      </h2>
      <div className="w-full flex">
        <h2 className="text-5xl font-extrabold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent hover:bg-gradient-to-b hover:from-gray-900 hover:to-gray-200">
          Always You <br />
          are Our First
          <br /> Priority
        </h2>
        <MarqueeDemo />
      </div>
      <div className="w-full flex flex-wrap my-10">
        {data &&
          data.map((item: any, index: any) => {
            return (
              <div key={index} className="p-2 rounded-xl w-2/6 flex flex-col gap-2 border">
                <img src={item.image.stringValue} alt={""} className="w-full" />
                <div className="flex flex-col gap-1">
                  <div>
                    <h2 className="text-lg font-extrabold">
                      {item.title.stringValue}
                    </h2>
                    <div className="flex justify-between">
                      <p className="text-lg">
                        by- <i>{item.instName.stringValue}</i>
                      </p>
                      <img
                        src={item.instImage.stringValue}
                        width={25}
                        height={20}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <p className="w-[200]">{item.message.stringValue}</p>
                  <Link to={`/course/${item.id.stringValue}`}>
                    <button className="">see more details</button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
