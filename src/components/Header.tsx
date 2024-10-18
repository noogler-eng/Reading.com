import { Button } from "@/components/ui/button";
import LoginButton from "./LoginButton";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "../../lib/firebase";
import { useRecoilState } from "recoil";
import userAtom from "../../store/user/userAtom";
import { Link } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const subscribe = onAuthStateChanged(firebase.auth, (user: any) => {
      if (user) {
        console.log(user);
        setUser({
          id: user.uid,
          name: user.displayName,
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
      <div className="text-3xl">
        <Link to="/">Readers.com</Link>
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="secondary" className="hidden md:block">
          <Link to="/my-courses">My Courses</Link>
        </Button>
        <Button variant="destructive" className="hidden md:block">
          <Link to="/subscribe">Subscribe</Link>
        </Button>
        <LoginButton />
      </div>
    </div>
  );
}
