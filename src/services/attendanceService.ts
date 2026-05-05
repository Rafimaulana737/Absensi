import { 
  collection, 
  addDoc, 
  query, 
  onSnapshot, 
  serverTimestamp,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { AttendanceStatus } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
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
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const attendanceService = {
  // Mark attendance
  async markAttendance(studentId: string, studentName: string, classId: string, type: 'IN' | 'OUT') {
    const path = 'attendance';
    try {
      await addDoc(collection(db, path), {
        studentId,
        studentName,
        classId,
        type,
        timestamp: serverTimestamp(),
        status: AttendanceStatus.PRESENT
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  // Listen to real-time attendance
  listenToRecentAttendance(callback: (records: any[]) => void) {
    const path = 'attendance';
    const q = query(
      collection(db, path), 
      orderBy('timestamp', 'desc'), 
      limit(10)
    );
    
    return onSnapshot(q, (snapshot) => {
      const records = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date()
      }));
      callback(records);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
  }
};
