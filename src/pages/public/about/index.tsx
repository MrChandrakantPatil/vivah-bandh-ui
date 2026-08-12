import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { values, steps } from './data';

export function About() {
  return (
    <>
      <section className="w-full bg-[rgb(var(--color-primary-700))] py-32">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Sparkles className="mx-auto mb-6 h-10 w-10" />

            <h1 className="mb-6 text-5xl font-bold md:text-7xl">
              About Vivah Bandh
            </h1>

            <p className="mx-auto max-w-3xl text-xl leading-relaxed md:text-2xl">
              Bringing hearts together, connecting families, and helping people
              take the first step towards a beautiful life together.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="mb-3 block font-semibold text-[rgb(var(--color-primary-600))]">
                OUR STORY
              </span>

              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                More Than Just Finding a Match
              </h2>

              <div className="space-y-4 text-lg leading-relaxed text-gray-600">
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
              className="flex min-h-87.5 items-center justify-center rounded-2xl bg-[rgb(var(--color-primary-50))]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Heart className="h-32 w-32 text-[rgb(var(--color-primary-500))]" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="mb-3 block font-semibold text-[rgb(var(--color-primary-600))]">
              OUR MISSION
            </span>

            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Helping People Find Meaningful Relationships
            </h2>

            <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-600">
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
                  className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow duration-200 hover:shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  <Icon className="mx-auto mb-4 h-9 w-9 text-[rgb(var(--color-primary-600))]" />

                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {value.title}
                  </h3>

                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <span className="mb-3 block font-semibold text-[rgb(var(--color-primary-600))]">
              HOW IT WORKS
            </span>

            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Your Journey Starts With One Step
            </h2>

            <p className="mx-auto max-w-2xl text-xl text-gray-600">
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
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(var(--color-primary-100))]">
                    <Icon className="h-7 w-7 text-[rgb(var(--color-primary-600))]" />
                  </div>

                  <div className="mb-2 text-sm font-bold text-[rgb(var(--color-primary-600))]">
                    STEP {step.number}
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-[rgb(var(--color-primary-700))] py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold">What We Believe In</h2>

            <p className="mx-auto mb-10 max-w-2xl text-xl">
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
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-lg backdrop-blur-sm"
                >
                  {value}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Your Story Could Be Next
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              Take the first step towards finding someone who shares your
              dreams, values and vision for the future.
            </p>

            <Link
              to="/register"
              className="
                inline-flex items-center gap-2 rounded-lg
                bg-[rgb(var(--color-primary-700))]
                px-8 py-4 text-lg font-semibold text-white
                transition-colors duration-200
                hover:bg-[rgb(var(--color-primary-800))]
              "
            >
              Create Your Profile
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
