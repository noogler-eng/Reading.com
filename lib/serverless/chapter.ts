import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import firebase from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const createChapter = async ({
  data,
  file,
  fileType,
  courseId,
  progressCallBack,
}: {
  data: {
    title: string;
    description: string;
  };
  file: File | string | null;
  fileType: string;
  courseId: string;
  progressCallBack: any;
}) => {
  if (!data || !file || !fileType)
    throw new Error("Unable to get the data to create chapter");

  try {
    // status of uploading the file
    // we can also check wheather how much uploadation of file is completed
    const newId = await doc(
      collection(firebase.firestore, `courses/${courseId}/chapters`)
    ).id;

    if (fileType == "url" && typeof file == "string") {
      const chapterRef = await doc(
        firebase.firestore,
        `courses/${courseId}/chapters/${newId}`
      );
      await setDoc(chapterRef, {
        id: newId,
        courseId: courseId,
        title: data.title,
        description: data.description,
        fileType: fileType,
        image: file,
        createdAt: Timestamp.now(),
      });
      return;
    }

    if (
      (fileType == "video" || fileType == "image") &&
      typeof file == "object"
    ) {
      return new Promise((resolve, reject) => {
        const storageRef = ref(firebase.storage, newId);
        // if we are measuring the uploading content then dont use the await here
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressCallBack(progress);
          },
          (error) => {
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            const chapterRef = await doc(
              firebase.firestore,
              `courses/${courseId}/chapters/${newId}`
            );

            await setDoc(chapterRef, {
              id: newId,
              courseId: courseId,
              title: data.title,
              description: data.description,
              fileType: fileType,
              image: url,
              createdAt: Timestamp.now(),
            });
            resolve(true);
          }
        );
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteSpecificChapter = async (chapterId: string, courseId: string) => {
  try {
    const docRef = doc(
      firebase.firestore,
      `/courses/${courseId}/chapters/${chapterId}`
    );
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
};

const editChapters = async (
  chapterId: string,
  courseId: string,
  data: any,
  file: File | string | null,
  fileType: string | null,
  progressCallBack: any
) => {
  if (!data) throw new Error("there is no data!");
  const docRef = await doc(
    firebase.firestore,
    `/courses/${courseId}/chapters/${chapterId}`
  );

  const chapters = await getDoc(docRef);
  if (!chapters.exists()) throw new Error("id is invalid");

  if (fileType == "url" && typeof file == "string") {
    await updateDoc(docRef, {
      title: data.title,
      description: data.description,
      fileType: fileType,
      image: file,
    });
    return;
  }

  if (file == null) {
    await updateDoc(docRef, {
      title: data.title,
      description: data.description,
    });
    return;
  }

  if (
    (fileType == "video" || fileType == "image") &&
    typeof file == "object"
  ) {
    const newId = await doc(
      collection(firebase.firestore, `courses/${courseId}/chapters`)
    ).id;
    return new Promise((resolve, reject) => {
      const storageRef = ref(firebase.storage, newId);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progressCallBack(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(docRef, {
            title: data.title,
            description: data.description,
            fileType: fileType,
            image: url,
          });
          resolve(true);
        }
      );
    });
  }
};

const fetchSpecificChapter = async (courseId: string, chapterId: string) => {
  try {
    const chapter = await getDoc(
      doc(firebase.firestore, `/courses/${courseId}/chapters/${chapterId}`)
    );

    if (!chapter.exists()) throw new Error("Invalid ids");
    return chapter.data();
  } catch (error) {
    console.log(error);
  }
};

export default {
  createChapter,
  deleteSpecificChapter,
  editChapters,
  fetchSpecificChapter,
};
