import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface RegistrationSuccessProps {
  onLogin: () => void;
  onHome: () => void;
}

export function RegistrationSuccess({
  onLogin,
  onHome,
}: RegistrationSuccessProps) {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        p-4
        bg-gray-900/85
      "
    >
      <motion.div
        className="
          relative z-10
          w-full max-w-md
          bg-white shadow-2xl rounded-xl
          overflow-hidden
        "
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 10,
        }}
        transition={{
          duration: 0.35,
          ease: 'easeOut',
        }}
      >
        <div className="px-8 py-10">
          <motion.div
            className="
              flex items-center justify-center
              w-16 h-16 mx-auto
              bg-green-50 rounded-full
            "
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.15,
              duration: 0.35,
              type: 'spring',
              stiffness: 220,
              damping: 15,
            }}
          >
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </motion.div>

          <motion.h2
            className="mt-5 font-semibold text-gray-800 text-2xl text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.3,
            }}
          >
            Profile Created Successfully!
          </motion.h2>

          <motion.p
            className="mt-3 leading-6 text-gray-600 text-sm text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.3,
            }}
          >
            Your Vivah Bandh profile has been created successfully.
          </motion.p>

          <motion.div
            className="
              p-4 mt-6
              bg-gray-50 rounded-lg border border-gray-200
              leading-6 text-gray-600 text-sm text-center
            "
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.3,
            }}
          >
            Use your registered mobile number and password to login to your
            account.
          </motion.div>

          <motion.button
            type="button"
            onClick={onLogin}
            className="
              flex items-center justify-center
              w-full px-4 py-3 mt-6
              bg-[rgb(var(--color-primary-500))] rounded-lg
              font-semibold text-white
              transition
              hover:opacity-90
            "
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.3,
            }}
          >
            Continue to Login
          </motion.button>

          <motion.button
            type="button"
            onClick={onHome}
            className="
              w-full mt-4
              font-medium text-[rgb(var(--color-primary-500))] text-sm text-center
              hover:underline
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.3,
            }}
          >
            Go to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
