import { atom } from "recoil";

const userAtom = atom<{
    id: string,
    name: string,
    email: string,
    image: string
} | null>({
  key: "userAtom",
  default: null,
});

export default userAtom;
