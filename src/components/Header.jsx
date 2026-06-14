import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className='w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50'>
            <div className='container flex justify-between items-center h-18 mx-auto px-4 sm:px-6 lg:px-8'>
                <Link className='flex items-center space-x-2 group'>
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

                <div className='flex justify-between item-center space-x-4'>
                    <button type='button' className='text-gray-900 hover:text-[rgb(var(--color-primary-600))] font-medium transition-colors duration-200'>
                        Sign In
                    </button>

                    <button type='button' className='bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'>
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
}