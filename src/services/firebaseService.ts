import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  where, 
  getDocFromServer 
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile, Project } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || false,
      isAnonymous: auth.currentUser?.isAnonymous || false,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Google Auth Provider configured for popups
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const firebaseService = {
  /**
   * Validates connection to Firestore backend
   */
  async testConnection(): Promise<{ connected: boolean; message?: string }> {
    try {
      await getDocFromServer(doc(db, 'test', 'connection'));
      return { connected: true, message: 'Connected to Firebase Firestore' };
    } catch (error: any) {
      if (error instanceof Error && error.message.includes('the client is offline')) {
        console.warn('Please check your Firebase configuration or internet connection.');
        return { connected: false, message: 'Client is offline' };
      }
      // Non-fatal if test doc doesn't exist; response indicates server reached
      return { connected: true, message: 'Firebase reached' };
    }
  },

  /**
   * Listen to Firebase auth state changes
   */
  onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  /**
   * Sign in with Google Popup
   */
  async signInWithGoogle(): Promise<FirebaseUser> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error: any) {
      console.error('Google Sign In Error:', error);
      throw error;
    }
  },

  /**
   * Sign in with Email and Password
   */
  async signInWithEmail(email: string, pass: string): Promise<FirebaseUser> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      return result.user;
    } catch (error: any) {
      console.error('Email Sign In Error:', error);
      throw error;
    }
  },

  /**
   * Create account with Email, Password, and Display Name
   */
  async signUpWithEmail(name: string, email: string, pass: string): Promise<FirebaseUser> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      if (result.user && name) {
        await updateProfile(result.user, { displayName: name });
      }
      return result.user;
    } catch (error: any) {
      console.error('Email Sign Up Error:', error);
      throw error;
    }
  },

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    await signOut(auth);
  },

  /**
   * Sync user profile to Firestore
   */
  async saveUserProfile(user: UserProfile): Promise<void> {
    const path = `users/${user.id}`;
    try {
      await setDoc(doc(db, 'users', user.id), user, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  /**
   * Fetch user profile from Firestore
   */
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const path = `users/${userId}`;
    try {
      const snapshot = await getDoc(doc(db, 'users', userId));
      if (snapshot.exists()) {
        return snapshot.data() as UserProfile;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  /**
   * Save a project to Firestore for logged in user
   */
  async saveProject(project: Project, ownerId: string): Promise<void> {
    const path = `projects/${project.id}`;
    try {
      const payload = {
        ...project,
        ownerId,
        updatedAt: Date.now(),
      };
      await setDoc(doc(db, 'projects', project.id), payload, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  /**
   * Fetch all projects belonging to user from Firestore
   */
  async getUserProjects(ownerId: string): Promise<Project[]> {
    const path = 'projects';
    try {
      const q = query(collection(db, 'projects'), where('ownerId', '==', ownerId));
      const querySnapshot = await getDocs(q);
      const projects: Project[] = [];
      querySnapshot.forEach((d) => {
        projects.push(d.data() as Project);
      });
      return projects;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  /**
   * Delete a project from Firestore
   */
  async deleteProject(projectId: string): Promise<void> {
    const path = `projects/${projectId}`;
    try {
      await deleteDoc(doc(db, 'projects', projectId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }
};
