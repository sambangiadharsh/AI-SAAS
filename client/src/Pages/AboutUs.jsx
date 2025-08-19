import React from "react";
import { Target, Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6 sm:px-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 leading-relaxed"
        >
          We are passionate about creating innovative AI-powered solutions that
          simplify your life. Our mission is to combine cutting-edge technology
          with a human-first approach to deliver meaningful results.
        </motion.p>
      </div>

      {/* Mission / Vision / Values */}
      <div className="py-20 px-6 sm:px-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Target className="text-blue-600 w-12 h-12" />,
              title: "Our Mission",
              text: "To bring AI closer to everyone through intuitive, scalable, and impactful applications.",
            },
            {
              icon: <Eye className="text-purple-600 w-12 h-12" />,
              title: "Our Vision",
              text: "A future where technology empowers creativity and problem-solving for every individual.",
            },
            {
              icon: <Heart className="text-pink-500 w-12 h-12" />,
              title: "Our Values",
              text: "Innovation, transparency, and a relentless focus on the user experience.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="bg-white py-20 px-6 sm:px-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
        >
          Who We Are
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
        >
          We are a team of innovators, engineers, and dreamers dedicated to
          building intelligent solutions that redefine possibilities. With
          expertise in AI and cloud technologies, we empower businesses and
          individuals to unlock new opportunities and drive real impact.
        </motion.p>
      </div>
    </div>
  );
};

export default AboutUs;
