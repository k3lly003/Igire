"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Hiring() {
    const [formData, setFormData] = useState({
        jobTitle: "",
        description: "",
        employmentType: [],
        location: "",
        deadline: "",
        multipleCandidates: false,
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, multipleCandidates: e.target.checked });
    };

    const handleEmploymentTypeChange = (type) => {
        setFormData((prevData) => {
            const newTypes = prevData.employmentType.includes(type)
                ? prevData.employmentType.filter((item) => item !== type)
                : [...prevData.employmentType, type];
            return { ...prevData, employmentType: newTypes };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // You can add your form submission logic here
    };

    return (
        <div className="p-6 w-full mx-auto bg-white">
        <div className="flex justify-between items-center ">
            <h1 className="text-md font-semibold mb-4">Initiate Hiring</h1>
            <Button type="submit" className="bg-green-500 text-white hover:bg-green-700 mb-2">
                    View recent post
                </Button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className=" bg-[#E4E4E4] p-4 rounded-md mb-5">
                    <div className="mb-4 flex justify-between items-center">
                        <label className="block text-sm font-medium">Job Title:</label>
                        <Input
                            type="text"
                            name="jobTitle"
                            placeholder="Enter job title"
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            className="w-1/2"
                        />
                    </div>

                    <div className="mb-4 flex justify-between">
                        <label className="block text-sm font-medium mb-2">Description:</label>
                        <textarea
                            name="description"
                            placeholder="Enter job description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-1/2 border border-gray-300 bg-[#E4E4E4] rounded-md p-2"
                        />
                    </div>
                </div>

                <div className="bg-[#E4E4E4] p-4 rounded-md mb-5 flex justify-between">
                    <label className="block text-sm font-medium mb-2">Employment Type:</label>
                    <div className="space-y-3 w-1/2">
                        <div className="flex justify-between gap-2">
                            <div className="flex items-center border border-slate-500 p-2 w-1/2 rounded-md">
                                <Checkbox
                                    checked={formData.employmentType.includes("Full-time")}
                                    onChange={() => handleEmploymentTypeChange("Full-time")}
                                />
                                <label className="ml-2 text-sm font-medium">Full-time</label>
                            </div>

                            <div className="flex items-center border border-slate-500 p-2 w-1/2 rounded-md">
                                <Checkbox
                                    checked={formData.employmentType.includes("Part-time")}
                                    onChange={() => handleEmploymentTypeChange("Part-time")}
                                />
                                <label className="ml-2 text-sm font-medium">Part-time</label>
                            </div>
                        </div>

                        <div className="flex justify-between gap-2">
                            <div className="flex items-center border border-slate-500 p-2 w-1/2 rounded-md">
                                <Checkbox
                                    checked={formData.employmentType.includes("Hybrid")}
                                    onChange={() => handleEmploymentTypeChange("Hybrid")}
                                />
                                <label className="ml-2 text-sm font-medium">Hybrid</label>
                            </div>

                            <div className="flex items-center border border-slate-500 p-2 w-1/2 rounded-md">
                                <Checkbox
                                    checked={formData.employmentType.includes("Negotiable")}
                                    onChange={() => handleEmploymentTypeChange("Negotiable")}
                                />
                                <label className="ml-2 text-sm font-medium">Negotiable</label>
                            </div>
                        </div>
                    </div>
                </div>


                <div className=" bg-[#E4E4E4] p-4 rounded-md mb-5">
                    <div className="mb-4 flex justify-between">
                        <label className="block text-sm font-medium mb-2">Location:</label>
                        <Input
                            type="text"
                            name="location"
                            placeholder="Enter job location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-1/2"
                        />
                    </div>

                    <div className="mb-4 flex justify-between">
                        <label className="block text-sm font-medium mb-2">Application Deadline:</label>
                        <Input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleInputChange}
                            className="w-1/2"
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <Checkbox
                            checked={formData.multipleCandidates}
                            onChange={handleCheckboxChange}
                        />
                        <label className="ml-2 text-sm font-medium">
                            Yes, I am hiring multiple candidates
                        </label>
                    </div>
                </div>

                <Button type="submit" className="bg-green-500 hover:bg-green-700 text-white">
                    Publish Job
                </Button>
            </form>
        </div>
    );
}
