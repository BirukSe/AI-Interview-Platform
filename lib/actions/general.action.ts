import { db } from "@/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";

// Type definitions for better type safety
interface Interview {
  id: string;
  userId: string;
  createdAt: Timestamp;
  finalized?: boolean;
  // Add other interview properties as needed
}

interface Feedback {
  id: string;
  interviewId: string;
  userId: string;
  // Add other feedback properties as needed
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  try {
    const doc = await db.collection("interviews").doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } as Interview : null;
  } catch (error) {
    console.error(`Error getting interview ${id}:`, error);
    return null;
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  try {
    const { interviewId, userId } = params;
    const snapshot = await db.collection("feedback")
      .where("interviewId", "==", interviewId)
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Feedback;
  } catch (error) {
    console.error("Error getting feedback:", error);
    return null;
  }
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[]> {
  try {
    const { userId, limit = 20 } = params;
    let query = db.collection("interviews")
      .where("finalized", "==", true)
      .where("userId", "!=", userId)
      .limit(limit);

    // Add orderBy only if it won't cause index errors
    // Note: This query requires a composite index in Firestore
    query = query.orderBy("createdAt", "desc");

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Interview));
  } catch (error) {
    console.error("Error getting latest interviews:", error);
    return [];
  }
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[]> {
  try {
    // Basic query without ordering to avoid index requirements
    const snapshot = await db.collection("interviews")
      .where("userId", "==", userId)
      .get();

    // Client-side sorting as fallback
    const interviews = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Interview));

    return interviews.sort((a, b) => 
      b.createdAt?.seconds - a.createdAt?.seconds || 
      b.createdAt?.nanoseconds - a.createdAt?.nanoseconds
    );
  } catch (error) {
    console.error(`Error getting interviews for user ${userId}:`, error);
    return [];
  }
}
  

//   //.collection("feedback")
//   .where("interviewId", "==", interviewId)
//   .where("userId", "==", userId)
//   .limit(1)
//   .get();