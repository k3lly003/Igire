"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { HiOutlineSearch } from "react-icons/hi";

const data = [
    {
        jobTitle: "Software engineer",
        date: "2024-10-21", 
        applicants: 25,
        status: "Open",
    },
    {
        jobTitle: "Operation manager",
        date: "2024-10-22",
        applicants: 10,
        status: "Open",
    },
    {
        jobTitle: "IT Technician",
        date: "2024-10-25",
        applicants: 5,
        status: "Closed",
    },
];

const columns = [
    { accessorKey: "jobTitle", header: "Job title" },
    { accessorKey: "applicants", header: "Applicants" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "timeToHire", header: "Time to Hire (days)" },
    { accessorKey: "status", header: "Status" },
];

const StatusCard = ({ title, percentage, color }) => (
    <Card className="w-[calc(33.333%-0.75rem)] bg-slate-100">
        <CardContent className="flex flex-col items-center justify-center p-6">
            <CardTitle className={`text-[24px] font-bold ${color}`}>{percentage}</CardTitle>
            <div className='flex items-start gap-3'>
                <p className="text-[18px] text-muted-foreground">{title}</p>
            </div>
        </CardContent>
    </Card>
);

export default function Request() {
    const calculateDaysRemaining = (endDate) => {
        const today = new Date();
        const targetDate = new Date(endDate);
        const timeDifference = targetDate - today;
        return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="w-full p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-md font-semibold">Application Status</h1>
            </div>

            <div className="flex justify-between gap-6 mb-8">
                <StatusCard
                    percentage="69"
                    title="New applicants"
                    color="text-orange-500"
                />
                <StatusCard
                    percentage="17"
                    title="Qualified"
                    color="text-orange-500"
                />
                <StatusCard
                    percentage="10"
                    title="Interviewed"
                    color="text-orange-500"
                />
                <StatusCard
                    percentage="7"
                    title="Joined"
                    color="text-orange-500"
                />
            </div>

            <div className="flex items-center justify-between mb-3">
                <h1 className="text-md font-semibold">Order Requisition</h1>
                <div className="relative w-80 ml-4">
                <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input placeholder="Search by job title..." className="pl-10" />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.accessorKey}>{column.header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length ? (
                            data.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map((column) => (
                                        <TableCell key={column.accessorKey}>
                                            {column.accessorKey === "timeToHire"
                                                ? calculateDaysRemaining(row.date) 
                                                : column.accessorKey === "days"
                                                ? new Intl.DateTimeFormat("en-US").format(new Date(row[column.accessorKey]))
                                                : row[column.accessorKey]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
