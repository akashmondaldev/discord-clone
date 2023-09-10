/* eslint-disable @next/next/no-img-element */
'use client'
import { FC, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';



interface DeleteServerModelProps { }
const DeleteServerModel: FC<DeleteServerModelProps> = () => {
    const router = useRouter()
    const { isOpen, onClose, type, data, onOpen } = useModal()
    const isModalOpen = isOpen && type === "deleteServer"
    const { server } = data
    const [loading, setLoading] = useState(false)

    const onClick = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/servers/${server?.id}/delete`)
            onClose()
            router.refresh()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>
                        Delete This Server
                    </DialogTitle>
                    <DialogDescription className='text-center text-zinc-500 px-2'>
                        Are you sure you want to do this
                        <span className='font-bold text-indigo-500'>
                        {" " + server?.name}
                        </span>? will be permanent deleted
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='bg-gray-100 px-6 py-4'>
                    <div className='flex items-center justify-between w-full'>
                        <Button
                            disabled={loading}
                            onClick={onClose}
                            variant={"ghost"}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={loading}
                            onClick={onClick}
                            variant={"primary"}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
};

export default DeleteServerModel;