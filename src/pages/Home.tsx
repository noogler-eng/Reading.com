// import { useRecoilValue } from "recoil";
// import userAtom from "../../store/user/userAtom";

import { MarqueeDemo } from "@/components/Marquee";

export default function Home() {
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
    </div>
  );
}
