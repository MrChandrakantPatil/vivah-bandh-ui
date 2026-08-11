import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from './data';

export function About() {
  return (
    <>
      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-4xl">
              Success Stories
            </h2>

            <p className="max-w-2xl mx-auto text-gray-600 text-xl">
              Hear from couples who found their perfect match on Vivah Bandh
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="
                  p-6 bg-white rounded-xl border border-gray-200 text-center
                  shadow-sm hover:shadow-md transition-shadow duration-200
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
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
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
    </>
  );
}
