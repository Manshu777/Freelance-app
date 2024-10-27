import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCpvcNxvFLI6ACeBhw9fsQu5Ubs5Hp3BKI",
  authDomain: "coachsearch-2764f.firebaseapp.com",
  projectId: "coachsearch-2764f",
  storageBucket: "coachsearch-2764f.appspot.com",
  messagingSenderId: "698885829491",
  appId: "1:698885829491:android:808b32b1ee0a73da808b06",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
