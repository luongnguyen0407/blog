import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";

async function fetchData(col, where) {
  const docRef = doc(db, col, where);
  const docSnap = await getDoc(docRef);
  const resu = docSnap.data();
  return resu;
}

export default fetchData;
