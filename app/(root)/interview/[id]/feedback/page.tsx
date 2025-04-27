'use client';

import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getFeedbackByInterviewId, getInterviewById } from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";

// Type definitions
interface CategoryScore {
  name: string;
  score: number;
  comment: string;
}

interface FeedbackData {
  totalScore?: number;
  createdAt?: Date;
  finalAssessment?: string;
  categoryScores?: CategoryScore[];
  strengths?: string[];
  areasForImprovement?: string[];
}

interface InterviewData {
  role?: string;
  // Add other interview properties as needed
}

const Feedback = async ({ params }: { params: { id: string } }) => {
  // Validate user
  const user = await getCurrentUser();
  if (!user) redirect("/auth/signin");

  // Fetch interview data
  const interview: InterviewData | null = await getInterviewById(params.id);
  if (!interview) redirect("/");
//@ts-ignore
  // Fetch feedback data
  const feedback: FeedbackData | null = await getFeedbackByInterviewId({
    interviewId: params.id,
    userId: user.id
  });

  if (!feedback) {
    return (
      <section className="section-feedback">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-semibold">No Feedback Available</h1>
          <p>We couldn't find any feedback for this interview.</p>
          <Link href="/" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-feedback">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-semibold">
          Feedback on the Interview -{" "}
          <span className="capitalize">{interview.role || "Technical"}</span> Interview
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* Overall Score */}
          <div className="flex items-center gap-2">
            <Image 
              src="/star.svg" 
              width={22} 
              height={22} 
              alt="Star rating" 
              className="h-5 w-5"
            />
            <p>
              Overall:{" "}
              <span className="font-bold text-primary-200">
                {feedback.totalScore ?? "N/A"}
              </span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <Image 
              src="/calendar.svg" 
              width={22} 
              height={22} 
              alt="Calendar" 
              className="h-5 w-5"
            />
            <p>
              {feedback.createdAt 
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A") 
                : "Date not available"}
            </p>
          </div>
        </div>
      </div>

      <hr className="my-6" />

      {/* Final Assessment */}
      {feedback.finalAssessment && (
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Final Assessment</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {feedback.finalAssessment}
          </p>
        </div>
      )}

      {/* Interview Breakdown */}
      {feedback.categoryScores && feedback.categoryScores.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Interview Breakdown</h2>
          <div className="space-y-4">
            {feedback.categoryScores.map((category, index) => (
              <div key={index} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <p className="font-bold">
                  {index + 1}. {category.name} ({category.score}/100)
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {category.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths */}
      {feedback.strengths && feedback.strengths.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-2 text-lg font-semibold">Strengths</h3>
          <ul className="ml-6 list-disc space-y-1">
            {feedback.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Areas for Improvement */}
      {feedback.areasForImprovement && feedback.areasForImprovement.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-2 text-lg font-semibold">Areas for Improvement</h3>
          <ul className="ml-6 list-disc space-y-1">
            {feedback.areasForImprovement.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" passHref legacyBehavior>
          <Button variant="secondary" className="min-w-[200px]">
            Back to Dashboard
          </Button>
        </Link>
        
        <Link href={`/interview/${params.id}`} passHref legacyBehavior>
          <Button className="min-w-[200px]">
            Retake Interview
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Feedback;