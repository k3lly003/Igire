import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoWarning } from "react-icons/io5";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteUserModal = ({ isOpen, onClose, userIdToDelete, users, setUsers, setError }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDeleteUser = async () => {
        if (!userIdToDelete) return;
        setIsLoading(true);
        try {
            await axios.delete(`http://iro-website-bn-vx04.onrender.com/api/Inventory/users/delete-user/${userIdToDelete}`);
            setUsers(users.filter(user => user.id !== userIdToDelete));
            onClose();
            router.push('/dashboard/users'); 
            console.log(userIdToDelete);
        } catch (error) {
            console.error("Error deleting user:", error);
            setError("Failed to delete user.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="max-w-sm bg-white border-none p-6"
                aria-describedby="delete-user-description"
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-lg font-bold">Manage Users</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                    <p
                        id="delete-user-description"
                        className="text-center"
                    >
                        Are you sure you want to delete {userIdToDelete ? users.find(user => user.id === userIdToDelete)?.id : 'this user'}?
                    </p>
                    <div className="flex items-start justify-start mt-4 text-red-500 py-2
                        bg-gradient-to-r from-red-500 from-1% via-red-500 via-10% to-[#D9D9D9] to-10%">
                        <IoWarning className="ml-10 text-[24px]" />
                        <p className='text-black flex flex-col items-start text-md pl-2 font-bold'>Warning: <span className='font-normal text-red-500 text-sm'>By deleting this user, you won't access them again.</span></p>
                    </div>
                </div>
                <DialogFooter className="flex justify-between mt-6">
                    <Button
                        onClick={handleDeleteUser}
                        disabled={isLoading}
                        className={`bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200 px-8 py-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Deleting...' : 'Yes, delete'}
                    </Button>
                    <Button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-8 py-2"
                        disabled={isLoading}
                    >
                        No, cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteUserModal;
