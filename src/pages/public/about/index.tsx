import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { values, steps } from './data';

export function About() {
  return (
    <>
      <section className="w-full py-32 bg-[rgb(var(--color-primary-700))]">
        <div className="px-4 mx-auto text-white text-center container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Sparkles className="w-10 h-10 mx-auto mb-6" />

            <h1 className="mb-6 font-bold text-5xl md:text-7xl">
              About Vivah Bandh
            </h1>

            <p className="max-w-3xl mx-auto leading-relaxed text-xl md:text-2xl">
              Bringing hearts together, connecting families, and helping people
              take the first step towards a beautiful life together.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-20 bg-white">
        <div className="px-4 mx-auto container">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="block mb-3 font-semibold text-[rgb(var(--color-primary-600))]">
                OUR STORY
              </span>

              <h2 className="mb-6 font-bold text-gray-900 text-4xl">
                More Than Just Finding a Match
              </h2>

              <div className="space-y-4 leading-relaxed text-gray-600 text-lg">
                <p>
                  Finding a life partner is one of the most important journeys
                  in life. At Vivah Bandh, we believe this journey should be
                  simple, meaningful and built on trust.
                </p>

                <p>
                  Vivah Bandh was created to bring people together who are
                  genuinely looking for a life partner while respecting the
                  values, traditions and expectations that make every
                  relationship unique.
                </p>

                <p>
                  Our goal is not simply to help you find a profile. It is to
                  help you discover someone with whom you can build a future.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center min-h-87.5 bg-[rgb(var(--color-primary-50))] rounded-2xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Heart className="w-32 h-32 text-[rgb(var(--color-primary-500))]" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-gray-50">
        <div className="px-4 mx-auto text-center container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="block mb-3 font-semibold text-[rgb(var(--color-primary-600))]">
              OUR MISSION
            </span>

            <h2 className="mb-6 font-bold text-gray-900 text-4xl">
              Helping People Find Meaningful Relationships
            </h2>

            <p className="max-w-3xl mx-auto mb-12 leading-relaxed text-gray-600 text-xl">
              To make finding a life partner simple, meaningful and trustworthy
              while creating a safe environment where individuals and families
              can connect with confidence.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  className="
                    p-6
                    bg-white shadow-sm rounded-xl border border-gray-200
                    text-center
                    transition-shadow duration-200
                    hover:shadow-md
                  "
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  <Icon className="w-9 h-9 mx-auto mb-4 text-[rgb(var(--color-primary-600))]" />

                  <h3 className="mb-3 font-semibold text-gray-900 text-xl">
                    {value.title}
                  </h3>

                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-white">
        <div className="px-4 mx-auto container">
          <div className="mb-16 text-center">
            <span className="block mb-3 font-semibold text-[rgb(var(--color-primary-600))]">
              HOW IT WORKS
            </span>

            <h2 className="mb-4 font-bold text-gray-900 text-4xl">
              Your Journey Starts With One Step
            </h2>

            <p className="max-w-2xl mx-auto text-gray-600 text-xl">
              Finding your life partner doesn't have to be complicated.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  <div
                    className="
                      flex items-center justify-center
                      w-16 h-16 mx-auto mb-5
                      bg-[rgb(var(--color-primary-100))] rounded-full
                    "
                  >
                    <Icon className="w-7 h-7 text-[rgb(var(--color-primary-600))]" />
                  </div>

                  <div className="mb-2 font-bold text-[rgb(var(--color-primary-600))] text-sm">
                    STEP {step.number}
                  </div>

                  <h3 className="mb-3 font-semibold text-gray-900 text-xl">
                    {step.title}
                  </h3>

                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-[rgb(var(--color-primary-700))]">
        <div className="px-4 mx-auto text-white text-center container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 font-bold text-4xl">What We Believe In</h2>

            <p className="max-w-2xl mx-auto mb-10 text-xl">
              Because a strong relationship starts with the right values.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Trust',
                'Respect',
                'Compatibility',
                'Privacy',
                'Family',
                'Commitment',
              ].map((value) => (
                <div
                  key={value}
                  className="
                    px-6 py-3
                    bg-white/10 rounded-full border border-white/30
                    text-lg
                    backdrop-blur-sm
                  "
                >
                  {value}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-20 bg-white">
        <div className="px-4 mx-auto text-center container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 font-bold text-gray-900 text-4xl">
              Your Story Could Be Next
            </h2>

            <p className="max-w-2xl mx-auto mb-8 text-gray-600 text-xl">
              Take the first step towards finding someone who shares your
              dreams, values and vision for the future.
            </p>

            <Link
              to="/register"
              className="
                inline-flex items-center gap-2
                px-8 py-4
                bg-[rgb(var(--color-primary-700))] rounded-lg
                font-semibold text-white text-lg
                transition-colors duration-200
                hover:bg-[rgb(var(--color-primary-800))]
              "
            >
              Create Your Profile
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
