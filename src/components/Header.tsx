import { Button } from "@/components/ui/button";
import LoginButton from "./LoginButton";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "../../lib/firebase";
import { useRecoilState } from "recoil";
import userAtom from "../../store/user/userAtom";

export default function Header() {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const subscribe = onAuthStateChanged(firebase.auth, (user: any) => {
      if (user) {
        setUser({
          email: user.email,
          image: user.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscribe();
  }, []);

  console.log("user: ", user);

  return (
    <div className="flex items-center px-6 py-4 justify-between border-b border-gray-600">
      <div className="text-3xl">Readers.com</div>
      <div className="flex gap-2 items-center">
        <Button variant="secondary">My Courses</Button>
        <Button variant="destructive">Subscribe</Button>
        <LoginButton />
      </div>
    </div>
  );
}
