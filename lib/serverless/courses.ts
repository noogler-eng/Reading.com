import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import firebase from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
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

// handel deleting the course
const handelDeleteCourse = async (courseId: string) => {
  if (!courseId) throw new Error("Invlaid course Id");
  try {
    const course = await doc(firebase.firestore, "courses", courseId);
    await deleteDoc(course);
  } catch (error) {
    console.log(error);
  }
};

const getSpecificCourseData = async (courseId: string) => {
  if (!courseId) throw new Error("Invlaid course Id");
  try {
    const courseRef = await doc(firebase.firestore, "courses", courseId);
    const courseSnapshot = await getDoc(courseRef);

    if (!courseSnapshot.exists()) {
      throw new Error("Course not found");
    }
    return { data: courseSnapshot.data(), error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: error };
  }
};

const editSpecifcCourse = async (
  courseId: string,
  data: CourseData,
  file: File | null,
  des: string
) => {

  if (!courseId) throw new Error("Invlaid course Id");
  const courseRef = await doc(firebase.firestore, "courses", courseId);
  const course = await getDoc(courseRef);

  try {
    let imageUrl: string | null = null;

    if (course.exists()) {
      imageUrl = course.data().image;
      console.log(course.data());
    } else {
      throw new Error("course not exists");
    }

    if (file) {
      const newId = await doc(collection(firebase.firestore, "courses")).id;
      const imageRef = ref(firebase.storage, newId);
      await uploadBytes(imageRef, file);
      imageUrl = await getDownloadURL(imageRef);
    }

    console.log(data);

    await updateDoc(courseRef, {
      title: data.title || "",
      message: data.message || "",
      des: des || "",
      category: data.category || "",
      level: data.level || "",
      language: data.language || "",
      price: data.price || "",
      sellPrice: data.sellPrice || "",
      image: imageUrl || "",
    });

    console.log('data has been updated!');
  } catch (error) {
    console.log(error);
    throw new Error("error while editing data");
  }
};

export default { createCourse, handelDeleteCourse, getSpecificCourseData, editSpecifcCourse };
