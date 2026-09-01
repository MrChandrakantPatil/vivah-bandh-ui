import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logo, logoIcon } from '@/assets/images';

export function Header() {
  const navigate = useNavigate();

  return (
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
          h-20 px-4 mx-auto
          sm:px-6 lg:px-8
          container
        "
      >
        <Link to="/" className="flex items-center space-x-2 group">
          <picture>
            <source media="(max-width: 639px)" srcSet={logoIcon} />

            <img
              src={logo}
              alt="Vivah Bandh"
              className="
                w-16 h-auto
                transition-transform duration-200
                group-hover:scale-105
                sm:w-55 md:w-60 lg:w-65
                object-contain
              "
            />
          </picture>
        </Link>

        <nav></nav>

        <div className="flex items-center justify-between space-x-4">
          <Link
            to="/login"
            className="font-medium text-gray-900 transition-colors duration-200 hover:text-[rgb(var(--color-primary-600))]"
          >
            Sign In
          </Link>

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="
              px-4 py-2
              bg-[rgb(var(--color-primary-600))] rounded-lg
              font-medium text-white
              transition-colors duration-200
              hover:bg-[rgb(var(--color-primary-700))] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            "
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
