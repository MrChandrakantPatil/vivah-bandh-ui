import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RegistrationModal } from '@/features/registration';

export function Header() {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  function openModal() {
    document.body.classList.add('overflow-hidden');
    setIsRegistrationModalOpen(true);
  }

  function closeModal() {
    document.body.classList.remove('overflow-hidden');
    setIsRegistrationModalOpen(false);
  }

  return (
    <>
      <header
        className="
          sticky top-0 z-50
          w-full
          bg-white shadow-sm border-b border-gray-200
        "
      >
        <div
          className="
            flex items-center justify-between
            h-18 px-4 mx-auto
            sm:px-6 lg:px-8
            container
          "
        >
          <Link to="/" className="flex items-center space-x-2 group">
            <Heart className="w-12 h-12 text-[rgb(var(--color-primary-600))] transition-transform duration-200 group-hover:scale-115" />

            <div className="flex-col sm:flex hidden">
              <div className="font-bold text-gray-900 text-2xl transition-colors duration-200 group-hover:text-[rgb(var(--color-primary-600))]">
                Vivah Bandh
              </div>

              <div className="text-gray-500 text-xs -mt-1">
                Find Your Soulmate
              </div>
            </div>
          </Link>

          <nav></nav>

          <div className="flex items-center justify-between space-x-4">
            <Link
              to=""
              className="font-medium text-gray-900 transition-colors duration-200 hover:text-[rgb(var(--color-primary-600))]"
            >
              Sign In
            </Link>

            <button
              className="
                px-4 py-2
                bg-[rgb(var(--color-primary-600))] rounded-lg
                font-medium text-white
                transition-colors duration-200
                hover:bg-[rgb(var(--color-primary-700))] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              "
              onClick={openModal}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
