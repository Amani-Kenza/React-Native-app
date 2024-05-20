import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCWiI_ajA3G0AthAMTfiGfjvkyLDT-UC9s",
    authDomain: "teak-banner-407420.firebaseapp.com",
    projectId: "teak-banner-407420",
    storageBucket: "teak-banner-407420.appspot.com",
    messagingSenderId: "590522442082",
    appId: "1:590522442082:web:d89a32d184d74499a78c3b"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth, firebaseApp };
