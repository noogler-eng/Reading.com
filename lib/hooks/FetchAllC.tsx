import useSWRSubscription from "swr/subscription";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import firebase from "../firebase";

// swr is hook of react so formed in tsx file, act as a component
// useSWRSubscription is used for real time data source
// here we send uid also that which id's courses or data we want
// work - fetch the data all time, and cache them, if any new data comes then only that pasrt it reads
// reduced the reading workload, reduce cost
function FetchAllCourses() {
  const { data, error } = useSWRSubscription(
    ["courses"],
    ([path], { next }) => {
      const ref = collection(firebase.firestore, path);
      // continously fetching the data
      // if there is data then passing the data
      // if there is error then passing the error
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

function FetchSpecificInstCourses({ uid }: { uid: string }) {
  const { data, error } = useSWRSubscription(
    ["courses", uid],
    ([path, uid], { next }) => {
      const q = query(
        collection(firebase.firestore, path),
        where("instId", "==", uid)
      );
      // continously fetching the data
      const unsub = onSnapshot(
        q,
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

export default { FetchAllCourses, FetchSpecificInstCourses };
