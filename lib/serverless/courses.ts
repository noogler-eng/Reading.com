import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import firebase from "../firebase";
import {
  collection,
  doc,
  Firestore,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import CourseData from "../types/courseData";
import InstData from "../types/InstData";

// creating the couse
const createCourse = async (
  data: CourseData,
  image: File,
  des: string,
  instData: InstData
) => {
  try {
    const newId = await doc(collection(firebase.firestore, "courses")).id;
    const imageRef = ref(firebase.storage, newId);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    // @param setDoc - reference, data
    // @param doc - firestore, path
    const courseRef = await doc(firebase.firestore, `courses/${newId}`);
    await setDoc(courseRef, {
      id: newId,
      ...data,
      image: imageUrl,
      des: des,
      instEmail: instData.email,
      instImage: instData.photoUrl,
      instName: instData.name,
      instId: instData.id,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// getting all the course
const getAllCourse = async () => {
  const query = collection(firebase.firestore, "courses");
  const querySnapshot = await getDocs(query);
  return querySnapshot;
};

// getting myCouses only
const getAllMyCourse = async () => {};

export default { createCourse, getAllCourse };
