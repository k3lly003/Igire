import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

const RejectApplicantModal = ({ isOpen, onClose, onApprove }) => {
    const [itemName, setItemName] = useState('Office chair');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const router = useRouter();

    const handleAddRequest = () => {
        console.log({ itemName, quantity, price, description });
        onClose();
    };

    const handleApprove = () => {
        // onApprove({
        //     ...product,
        //     status: 'Approved', 
        // });
        onClose();
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg bg-[#F8F8F8] items-center border-none rounded-xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">Not eligible</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex items-center justify-between mt-6 space-x-4">
                        <div className='space-y-4'>
                            <h3 className="text-sm">Names:Joe Don</h3>
                            <p className="text-sm">Position: Software engineer</p>
                            <Input
                                id="text"
                                name="text"
                                type="text"
                                placeholder="Add comment"
                                rows={4}
                                className="w-full p-4  rounded-md border border-gray-300"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex justify-center mt-6">
                    <Button className="bg-red-500 text-white hover:bg-red-700" onClick={onClose}>Disqualify</Button>
                    <Button className="bg-gray-500 hover:bg-gray-700" onClick={onClose}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RejectApplicantModal;
