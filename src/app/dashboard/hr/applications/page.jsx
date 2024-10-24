"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HiOutlineSearch } from "react-icons/hi";

const jobData = [
    {
        jobTitle: "Software engineer",
        date: "2024-10-21",
        applicants: "Joe Don",
        status: "Pending",
    },
    {
        jobTitle: "Operation manager",
        date: "2024-10-22",
        applicants: "James Noah",
        status: "Pending",
    },
    {
        jobTitle: "IT Technician",
        date: "2024-10-25",
        applicants: "Anna Wintour",
        status: "Pending",
    },
];

const applicantData = [
    {
        applicantName: "Joe Don",
        jobTitle: "Software engineer",
        dateApplied: "2024-10-15",
        status: "Qualified",
    },
    {
        applicantName: "James Noah",
        jobTitle: "Operation manager",
        dateApplied: "2024-10-16",
        status: "Hired",
    },
    {
        applicantName: "Anna Wintour",
        jobTitle: "IT Technician",
        dateApplied: "2024-10-17",
        status: "Rejected",
    },
];

const jobColumns = [
    { accessorKey: "applicants", header: "Applicants Names" },
    { accessorKey: "jobTitle", header: "Job Title" },
    { accessorKey: "date", header: "Date" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.status;
            let statusClass = "text-yellow-500";
            if (status === "Approved") statusClass = "text-green-500";
            if (status === "Denied") statusClass = "text-red-500";
            return <div className={statusClass}>{status}</div>;
        },
    },
];

const applicantColumns = [
    { accessorKey: "applicantName", header: "Applicant Name" },
    { accessorKey: "jobTitle", header: "Job Title" },
    { accessorKey: "dateApplied", header: "Date Applied" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.status;
            let statusClass = "text-yellow-500";
            if (status === "Qualified") statusClass = "text-green-500";
            if (status === "Rejected") statusClass = "text-red-500";
            return <div className={statusClass}>{status}</div>;
        },
    },
];

export default function Request() {
    const [categoryFilter, setCategoryFilter] = React.useState("");
    const [globalFilter, setGlobalFilter] = React.useState("");
    const router = useRouter();

    const filteredJobData = jobData.filter((row) => {
        const titleMatch = row.applicants.toLowerCase().includes(globalFilter.toLowerCase());
        const categoryMatch = categoryFilter ? row.jobTitle === categoryFilter : true;
        return titleMatch && categoryMatch;
    });

    const filteredApplicantData = applicantData.filter((row) => {
        const nameMatch = row.applicantName.toLowerCase().includes(globalFilter.toLowerCase());
        const jobMatch = categoryFilter ? row.jobTitle === categoryFilter : true;
        return nameMatch && jobMatch;
    });

    const handleRowClick = () => {
        router.push(`/dashboard/hr/applications/applicantInfo`); 
    };

    return (
        <div className="w-full p-6">
            <div className="flex items-center justify-between mb-3">
                <h1 className="text-md font-semibold">Job Applications</h1>
                <div className="relative w-80 ml-4">
                    <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input 
                        placeholder="Search by applicant names..." 
                        className="pl-10" 
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        className="border border-3 px-3 py-2 text-sm rounded-md"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">Filter By Job Title</option>
                        <option value="Software engineer">Software engineer</option>
                        <option value="Operation manager">Operation manager</option>
                        <option value="IT Technician">IT Technician</option>
                    </select>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {jobColumns.map((column) => (
                                <TableHead key={column.accessorKey}>{column.header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredJobData.length ? (
                            filteredJobData.map((row, rowIndex) => (
                                <TableRow key={rowIndex} onClick={() => handleRowClick(row.applicants)} className="cursor-pointer">
                                    {jobColumns.map((column) => (
                                        <TableCell key={column.accessorKey}>
                                            {column.cell ? column.cell({ row }) : row[column.accessorKey]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={jobColumns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <h1 className="mt-8 text-md font-semibold">Applicant Records</h1>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {applicantColumns.map((column) => (
                                <TableHead key={column.accessorKey}>{column.header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredApplicantData.length ? (
                            filteredApplicantData.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {applicantColumns.map((column) => (
                                        <TableCell key={column.accessorKey}>
                                            {column.cell ? column.cell({ row }) : row[column.accessorKey]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={applicantColumns.length} className="h-24 text-center">
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
