import { useNavigate } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import logo from '@/assets/images/logo.png';
import { authBenefits } from '../data';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function RegisterInfo() {
  const navigate = useNavigate();

  return (
    <section className="min-[1200px]:flex flex-col justify-center min-w-0 py-16 hidden">
      <motion.div
        className="w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          type="button"
          onClick={() => navigate('/')}
          variants={itemVariants}
          className="flex items-center gap-4 mb-6"
        >
          <img src={logo} alt="Vivah Bandh" className="w-85" />
        </motion.button>

        <motion.p
          variants={itemVariants}
          className="
            w-full mb-8
            leading-relaxed font-medium text-[#172033] text-2xl
            xl:text-[29px]
          "
        >
          Join thousands of people who are finding meaningful connections and
          building a better tomorrow.
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="space-y-7 max-w-155"
        >
          {authBenefits.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <div
                className="
                  flex items-center justify-center shrink-0
                  w-14 h-14
                  bg-[#fff0f4] rounded-full
                  text-[#ed1657]
                "
              >
                <Icon size={25} strokeWidth={1.8} />
              </div>

              <div>
                <h3 className="font-bold text-[17px] text-[#1b2538]">
                  {title}
                </h3>

                <p className="mt-1 text-[15px] text-[#647086]">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12">
          <p className="text-[#647086] text-sm">
            Already have an account?
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="ml-1 font-semibold text-[#ed1657] hover:underline"
            >
              Login
            </button>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
