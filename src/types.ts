/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT'
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  schoolId?: string;
  classId?: string; // For students
}

export interface SchoolClass {
  id: string;
  name: string;
  teacherId: string;
  teacherName: string;
}

export interface Student {
  id: string;
  name: string;
  email?: string;
  classId: string;
  parentEmail?: string;
  qrData: string; // Unique string for QR
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  LATE = 'LATE',
  ABSENT = 'ABSENT',
  PERMISSION = 'PERMISSION'
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  timestamp: any; // Firestore Timestamp
  type: 'IN' | 'OUT';
  status: AttendanceStatus;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: any;
  read: boolean;
}
