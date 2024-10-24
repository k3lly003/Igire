"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import RejectApplicantModal from './rejectApplicantModal';
import ScheduleInterviewModal from './scheduleInterviewModal';

export default function ApplicantInfo() {
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const toggleRejectModal = () => setIsRejectModalOpen(!isRejectModalOpen);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const toggleScheduleModal = () => setIsScheduleModalOpen(!isScheduleModalOpen);

    return (
        <div className="p-6 flex w-full">
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                    <p>Joe Don</p>
                    <p>joedon@gmail.com</p>
                    <p>+250788888888</p>
                </div>
                <div className="mt-4">
                    <p>Position: <strong>Software Engineer</strong></p>
                    <p>Status: <span className="text-yellow-500">Pending</span></p>
                    <p className="mt-4">Supporting documents</p>
                </div>

                <div className="flex space-x-4 mt-4">
                    <div className="w-full border">
                        <Image
                            src="/resume.png"
                            alt="Resume"
                            layout="responsive"
                            width={150}
                            height={200}
                            className="w-full h-auto object-cover rounded-md"
                        />
                    </div>
                    <div className="w-full border">
                        <Image
                            src="/coverLetter.png"
                            alt="Cover Letter"
                            layout="responsive"
                            width={150}
                            height={200}
                            className="w-full h-auto object-cover rounded-md"
                        />
                    </div>
                </div>

                <div className="flex space-x-4 mt-6">
                    <Button
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                        onClick={toggleScheduleModal}
                    >
                        Schedule Interview
                    </Button>
                    <Button
                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                        onClick={toggleRejectModal}
                    >
                        Not Eligible
                    </Button>
                </div>
            </div>
            <ScheduleInterviewModal isOpen={isScheduleModalOpen} onClose={toggleScheduleModal} />
            <RejectApplicantModal isOpen={isRejectModalOpen} onClose={toggleRejectModal} />
        </div>
    );
}
