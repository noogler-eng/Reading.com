import { addDoc, collection, Timestamp } from "firebase/firestore";
import firebase from "../firebase";
import { uploadBytes } from "firebase/storage";

const createCourse = async (metadata: {
  heading: string;
  about: string;
  image: File;
}) => {
  try {

    // const storageRef = ref(firebase.storage, '');
    // const snapshot = uploadBytes(storageRef, image);

    const docRef = await addDoc(collection(firebase.firestore, "courses"), {
      title: metadata.heading,
      about: metadata.about,
      imageUrl: '',
      createdAt: Timestamp.now()
    });  

    return docRef.id
  } catch (error) {
    console.log('error while creating the course: ',error);
  }
};

export default { createCourse };
