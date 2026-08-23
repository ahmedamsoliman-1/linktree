import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

export const firebaseAdminConfigured = Boolean(projectId && clientEmail && privateKey);

const adminApp = firebaseAdminConfigured
  ? getApps()[0] || initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) })
  : null;

export async function verifyFirebaseToken(token: string | null) {
  if (!adminApp || !token) return null;
  return getAuth(adminApp).verifyIdToken(token);
}
