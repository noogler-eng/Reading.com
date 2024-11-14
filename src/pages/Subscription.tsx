import { useRecoilValue } from "recoil";
import userAtom from "../../store/user/userAtom";

export default function Subscription() {
  const user = useRecoilValue(userAtom);

  if (!user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <h1 className="text-2xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
          <span className="text-8xl font-bold bg-gradient-to-b from-gray-200 to-gray-900 bg-clip-text text-transparent">
            Oops,
          </span>
          <br /> you are not signed in, subscribe
        </h1>
      </div>
    );
  }

  return <div className="p-6">Subscription</div>;
}
