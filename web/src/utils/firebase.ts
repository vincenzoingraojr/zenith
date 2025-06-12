import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import { getMessaging } from "firebase/messaging";

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export { messaging };
