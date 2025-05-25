import { Database } from './supabase';

export interface User {
  id: string;
  role: 'student' | 'admin';
  name: string;
  email: string;
  profilePic?: string;
  createdAt: Date;
}

export interface Student extends User {
  role: 'student';
  wishlist: string[]; // Course IDs
  enrolledCourses: EnrolledCourse[];
}

export interface Admin extends User {
  role: 'admin';
}

export interface EnrolledCourse {
  id: string;
  courseId: string;
  enrolledAt: Date;
  lastWatchedVideo?: string;
  progressPercentage: number;
  completedModules: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'Beginner' | 'Average' | 'Advanced';
  thumbnailUrl: string;
  createdBy: string;
  totalEnrollments: number;
  createdAt: Date;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  orderNumber: number;
}

export interface Video {
  id: string;
  moduleId: string;
  title: string;
  videoUrl: string;
  duration: number;
  orderNumber: number;
}

export interface CourseAnalytics {
  totalViews: number;
  averageRating: number;
  completionRate: number;
  enrollmentTrend: {
    date: string;
    count: number;
  }[];
}

export interface UserAnalytics {
  totalActiveUsers: number;
  averageCompletionRate: number;
  enrollmentsByCategory: {
    category: string;
    count: number;
  }[];
  userEngagement: {
    date: string;
    activeUsers: number;
  }[];
}