import useSWRSubscription from "swr/subscription";
import firebase from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

function useFetchChapters({ courseId }: { courseId: string }) {
    const { data, error } = useSWRSubscription(
    ["chapters", courseId],
    // @ts-ignore
    ([path, courseId], { next }) => {
        console.log(path);
      const q = query(
        collection(firebase.firestore, `courses/${courseId}/chapters`),
        orderBy("createdAt", "asc")
      );
      // continously fetching the data
      // if there is data then passing the data
      // if there is error then passing the error
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

export default { useFetchChapters };
