'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbPencil } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddUserModal from './addUserMoal';
import EditUserModal from './editUserModal';
import DeleteUserModal from './deleteUserModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HiOutlineSearch } from "react-icons/hi";
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const UserCard = ({ id, name, email, role, onEdit, onDelete }) => {
  return (
    <Card className="w-full shadow-sm relative z-1">
      <div className="absolute top-2 right-2 flex flex-col space-y-2">
        <TbPencil className="text-[#0FA958] cursor-pointer" onClick={onEdit} />
        <RiDeleteBin6Line className="text-[#FF0202] cursor-pointer" onClick={() => onDelete(id)} />
      </div>
      <CardContent className="flex items-center justify-center bg-[#EAEAEA] rounded-lg">
        <div className="flex flex-col items-center pt-6 gap-4">
          <img src="/userAvatar.png" alt="User Avatar" className="w-12 h-12 rounded-full mb-2" />
          <div className="text-center">
            <CardTitle className="text-lg font-normal">{name}</CardTitle>
            <p className="text-sm text-muted-foreground">{email}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ManageUsers = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://iro-website-bn-vx04.onrender.com/api/inventory/users/allUsers');
        console.log("API Response:", response.data);
        setUsers(response.data.users || response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className='p-2 sm:p-8'>
        <div>
          <div className='text-[18px] sm:items-center gap-3 flex flex-col sm:flex-row items-start justify-between'>
            <p>Manage User</p>
            <div className="relative sm:w-80 w-full">
              <Input
                placeholder="Search user..."
                className="pl-10"
              />
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <span
              className='flex'
              onClick={() => setIsAddModalOpen(true)}
            >
              <Button className="flex gap-2 text-white">
                add user
                <IoIosAddCircleOutline />
              </Button>
            </span>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <FaSpinner className="animate-spin text-3xl" />
          </div>
        ) : (
          <div className="flex flex-col flex-wrap sm:flex-row gap-[2rem] w-full pt-[2.7rem] z-0">
            {users.map((user, index) => (
              <div className="w-full sm:w-[calc(33.333%-1.5rem)]" key={index}>
                <UserCard
                 id={user.id}
                  name={user.name}
                  email={user.email}
                  role={user.role}
                  onEdit={() => setIsEditModalOpen(true)}
                  onDelete={() => setIsDeleteModalOpen(true)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditUserModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      <DeleteUserModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
    </>
  );
};

export default ManageUsers;
