"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const JobPostingCard = ({ jobTitle, description, duties }) => {
  return (
    <Card className="w-full lg:w-[48%] bg-white border border-gray-200 rounded-lg shadow-md p-5">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-md font-semibold">{jobTitle}</CardTitle>
          <Button variant="ghost" size="icon" className="text-red-500">
            <Trash size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-gray-700">
          <h3 className="font-semibold text-sm">About the role</h3>
          <p className="mt-2 text-sm">{description}</p>

          <h3 className="font-semibold text-sm mt-4">What you will do</h3>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            {duties.map((duty, index) => (
              <li key={index} className="text-sm">
                {duty}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default function HiringRecords() {
  const jobs = [
    {
      jobTitle: "IT Technician",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      duties: [
        "Ute irure dolor indom.",
        "Morbi auctor tortor at lorem tempus.",
        "Ornare nunc aliquet.",
      ],
    },
    {
      jobTitle: "HR Assistant",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      duties: [
        "Ute irure dolor indom.",
        "Morbi auctor tortor at lorem tempus.",
        "Ornare nunc aliquet.",
      ],
    },
  ];

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-md font-semibold mb-6">Hiring Records</h1>
      <div className="flex flex-wrap gap-4">
        {jobs.map((job, index) => (
          <JobPostingCard
            key={index}
            jobTitle={job.jobTitle}
            description={job.description}
            duties={job.duties}
          />
        ))}
      </div>
    </div>
  );
}
