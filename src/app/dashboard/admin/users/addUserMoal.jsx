import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const AddUserModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAddUser = async () => {
    const userData = {
      name,
      email,
      // password,
      role,
    };

    try {
      const response = await fetch('https://iro-website-bn-vx04.onrender.com/api/Inventory/users/create-user', {
        
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert('User added successfully!');

      onClose();

      setName('');
      setEmail('');
      // setPassword('');
      setRole('');
    } 
    catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user: ' + error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-[#F8F8F8] items-center border-none rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Add New User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
            />
          </div>
          {/* <div className="flex flex-col relative">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full px-4 py-2 pr-12 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute inset-y-0 mt-5 right-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <HiOutlineEye size={20} /> : <HiOutlineEyeOff size={20} />}
            </span>
          </div> */}
          <div className="flex flex-col">
            <Label htmlFor="role">Role</Label>
            <Select id="role" onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Human Resource">Human Resources</SelectItem>
                <SelectItem value="Project Director">Project Director</SelectItem>
                <SelectItem value="Operation manager">Operation Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex justify-center mt-6">
          <Button onClick={handleAddUser} className="bg-[#0FA958] text-white px-8 py-2">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
