import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import firebase from "../firebase";

const purchaseCourse = async (
  courseId: string,
  userId: string,
  name: string,
  email: string,
  imageUrl: string
) => {
  try {
    const userRef = await doc(firebase.firestore, `users/${userId}`);
    await setDoc(userRef, {
      id: userId,
      name: name,
      email: email,
      imageUrl: imageUrl,
      courses: arrayUnion(courseId),
    });

    await updateDoc(doc(firebase.firestore, `courses/${courseId}`), {
      purchasers: arrayUnion(userId),
    });
    console.log('course purchased!');
  } catch (error) {
    console.log(error);
  }
};

export default { purchaseCourse };
