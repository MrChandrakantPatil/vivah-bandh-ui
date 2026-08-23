import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { features, testimonials } from './data';

export function Home() {
  return (
    <>
      <section className="w-full py-35 bg-[rgb(var(--color-primary-700))]">
        <div className="px-4 mx-auto text-center container">
          <motion.h1
            className="mb-6 font-bold text-5xl md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Find Your Soulmate
          </motion.h1>

          <motion.p
            className="max-w-3xl mx-auto mb-8 text-2xl md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join thousands of happy couples who found their perfect match on
            Vivah Bandh. Your journey to a beautiful marriage starts here.
          </motion.p>

          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/register"
              className="
                flex items-center justify-center gap-2
                px-8 py-4
                bg-[rgb(var(--color-primary-900))] rounded-lg
                font-medium text-white text-lg
                transition-colors duration-200
                hover:bg-[rgb(var(--color-primary-800))] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              "
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/login"
              className="
                p-4 px-8
                rounded-lg border border-white
                font-medium text-lg
                transition-colors duration-200
                hover:bg-white hover:text-[rgb(var(--color-primary-600))] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              "
            >
              Already a Member?
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-20 bg-white">
        <div className="px-4 mx-auto container">
          <div className="mb-16 text-center">
            <h3 className="mb-4 font-bold text-gray-900 text-4xl">
              Why Choose Vivah Bandh?
            </h3>

            <p className="max-w-2xl mx-auto text-gray-600 text-xl">
              We understand the importance of finding the right life partner.
              That's why we've built a platform that prioritizes your success
              and safety.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  className="
                    p-6
                    shadow-sm rounded-lg border border-gray-300
                    text-black text-center
                    transition-shadow duration-200
                    hover:shadow-md
                  "
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className="w-8 h-8 mx-auto mb-4 text-[rgb(var(--color-primary-600))]" />

                  <h4 className="mb-3 font-semibold text-gray-900 text-xl">
                    {feature.title}
                  </h4>

                  <p className="text-gray-600 text-m">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-gray-50">
        <div className="px-4 mx-auto container">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-2 font-bold text-[rgb(var(--color-primary-600))] text-4xl">
                10,000+
              </div>

              <div className="text-gray-600">Happy Couples</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-2 font-bold text-[rgb(var(--color-primary-600))] text-4xl">
                50,000+
              </div>

              <div className="text-gray-600">Active Profiles</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="mb-2 font-bold text-[rgb(var(--color-primary-600))] text-4xl">
                95%
              </div>

              <div className="text-gray-600">Success Rate</div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-white">
        <div className="px-4 mx-auto container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-4xl">
              Success Stories
            </h2>

            <p className="max-w-2xl mx-auto text-gray-600 text-xl">
              Hear from couples who found their perfect match on Vivah Bandh
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="
                  p-6
                  bg-white shadow-sm rounded-xl border border-gray-200
                  text-center
                  transition-shadow duration-200
                  hover:shadow-md
                "
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`
                        w-5 h-5
                        ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }
                      `}
                    />
                  ))}
                </div>

                <p className="mb-4 text-gray-600 italic">
                  "{testimonial.text}"
                </p>

                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>

                <div className="text-gray-500 text-sm">
                  {testimonial.location}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-[rgb(var(--color-primary-700))]">
        <div className="px-4 mx-auto text-white text-center container">
          <motion.h2
            className="mb-6 font-bold text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Find Your Perfect Match?
          </motion.h2>

          <motion.p
            className="max-w-2xl mx-auto mb-8 font-semibold text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of singles who are actively looking for their life
            partner. Your perfect match is just a click away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/register"
              className="
                inline-flex items-center gap-2
                px-8 py-4
                bg-white rounded-lg
                font-semibold text-[rgb(var(--color-primary-600))] text-lg
                hover:bg-gray-100
              "
            >
              Start Your Journey Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
