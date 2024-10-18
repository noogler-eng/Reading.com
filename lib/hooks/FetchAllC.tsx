import useSWRSubscription from "swr/subscription";
import { collection, onSnapshot } from "firebase/firestore";
import firebase from "../firebase";

export default function FetchAllCourses() {
  const { data, error } = useSWRSubscription(
    ["courses"],
    ([path], { next }) => {
      const ref = collection(firebase.firestore, path);
      // continously fetching the data
      const unsub = onSnapshot(
        ref,
        (snapshot: any) =>
          next(
            null,
            snapshot.docs.map((snap: any) => snap.data())
          ),
        (err: any) => next(err)
      );
      return () => unsub();
    }
  );
  return { data, error };
}

