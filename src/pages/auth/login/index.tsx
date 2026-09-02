import { useState, type SubmitEvent } from 'react';
import { Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/features/auth';
import { AuthInfo } from '../component/AuthInfo';
import { FormInput } from '../component/FormFields/FormInput';
import { loginValidators, validateLogin } from './utils';

type LoginField = 'username' | 'password';

type LoginErrors = {
  username: string;
  password: string;
};

export function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginErrors>({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const { login } = useAuth();

  const isValid = validateLogin(formData.username, formData.password).isValid;

  function handleChange(field: LoginField, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  }

  function handleBlur(field: LoginField, value: string) {
    const error = loginValidators[field](value);

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validateLogin(formData.username, formData.password);

    setErrors({
      username: validation.usernameError,
      password: validation.passwordError,
    });

    if (!validation.isValid || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      await login(formData.username, formData.password);

      toast.success('Logged in successfully');

      navigate('/dashboard', {
        replace: true,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.';

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="
        flex items-center justify-center
        w-full h-dvh
        bg-white
        overflow-hidden
        lg:h-screen lg:px-6 lg:overflow-visible
      "
    >
      <div
        className="
          flex items-center justify-center gap-4
          w-full h-full
          lg:w-[85%] lg:max-w-325 lg:h-auto
        "
      >
        <AuthInfo />

        <section
          className="
            flex items-center justify-center
            w-full max-w-125 min-w-0 h-full px-0 py-0
            lg:h-auto sm:px-4 lg:px-10 sm:py-6 lg:py-6
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex flex-col
              w-full h-full
              bg-[#C60D50] shadow-none rounded-none border-0
              overflow-hidden
              sm:h-auto sm:min-h-150 sm:shadow-[0_8px_26px_rgba(30,38,56,0.12)] sm:rounded-xl sm:border sm:border-[rgb(var(--color-primary-400))]
            "
          >
            <div className="shrink-0 px-6 py-5 text-center sm:px-8 sm:py-6">
              <h2 className="font-semibold text-white text-2xl sm:text-3xl">
                Login
              </h2>
            </div>

            <div className="border-t border-white/25" />

            <div
              className="
                flex-1
                min-h-0 px-6 py-8
                text-white
                overflow-y-auto overflow-x-hidden
                sm:px-8 sm:py-9
              "
            >
              <h2 className="font-semibold text-white text-2xl">
                Welcome Back!
              </h2>

              <p className="mt-1 text-sm text-white/80">
                Login to continue your journey
              </p>

              <form onSubmit={handleSubmit} className="mt-9">
                <FormInput
                  id="username"
                  label="Email Address / Mobile Number"
                  placeholder="Enter your email or mobile number"
                  icon={Mail}
                  value={formData.username}
                  error={errors.username}
                  onChange={(value: string) => handleChange('username', value)}
                  onBlur={(value: string) => handleBlur('username', value)}
                  className="mt-6"
                />

                <FormInput
                  isPassword
                  id="password"
                  label="Password"
                  placeholder="Enter your password"
                  icon={Lock}
                  value={formData.password}
                  error={errors.password}
                  onChange={(value: string) => handleChange('password', value)}
                  onBlur={(value: string) => handleBlur('password', value)}
                  className="mt-6"
                />

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-white text-sm transition hover:text-white/75 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={`
                    w-full px-4 py-3 mt-7
                    rounded-lg border
                    font-semibold
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-white/40
                    ${
                      !isValid || isSubmitting
                        ? `cursor-not-allowed border-white/50 bg-white/50 text-white/80`
                        : `border-white bg-white text-[rgb(var(--color-primary-500))] hover:bg-white/90`
                    }
                  `}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>

            <div className="border-t border-white/25" />

            <div className="shrink-0 px-6 py-5 text-center sm:px-8 sm:py-6">
              <p className="text-white text-sm">
                Don't have an account?
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="ml-1 font-semibold text-white hover:underline"
                >
                  Register
                </button>
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
