import { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RegisterModal } from "../registration/RegisterModal";

export function Header() {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    function openModal() {
        document.body.classList.add("overflow-hidden");
        setIsRegisterModalOpen(true);
    }

    function closeModal() {
        document.body.classList.remove("overflow-hidden");
        setIsRegisterModalOpen(false);
    }

    return (
        <>
            <header className='w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50'>
                <div className='container flex justify-between items-center h-18 mx-auto px-4 sm:px-6 lg:px-8'>
                    <Link to="/" className='flex items-center space-x-2 group'>
                        <Heart className='w-12 h-12 text-[rgb(var(--color-primary-600))] group-hover:scale-115 transition-transform duration-200' />

                        <div className='flex flex-col'>
                            <div className='text-2xl font-bold text-gray-900 group-hover:text-[rgb(var(--color-primary-600))] transition-colors duration-200'>
                                Vivah Bandh
                            </div>

                            <div className='text-xs text-gray-500 -mt-1'>
                                Find Your Soulmate
                            </div>
                        </div>
                    </Link>

                    <nav>

                    </nav>

                    <div className='flex justify-between items-center space-x-4'>
                        <Link
                            to=""
                            className='text-gray-900 hover:text-[rgb(var(--color-primary-600))] font-medium transition-colors duration-200'
                        >
                            Sign In
                        </Link>

                        <button
                            className='py-2 px-4 rounded-lg text-white font-medium
                            bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                            onClick={openModal}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </header>

            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={closeModal}
            />
        </>
    );
}