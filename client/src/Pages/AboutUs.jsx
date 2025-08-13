import React from "react";
import { Target, Eye, Heart } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6 sm:px-20 text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg max-w-3xl mx-auto opacity-90">
          We are passionate about creating innovative AI-powered solutions to
          make your life easier. Our mission is to combine cutting-edge
          technology with a human-centric approach to deliver results that truly
          matter.
        </p>
      </div>

  
      <div className="py-16 px-6 sm:px-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
     
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300">
            <div className="flex justify-center mb-4">
              <Target className="text-blue-600 w-10 h-10" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-600">
              To bring AI closer to everyone through intuitive and scalable
              applications.
            </p>
          </div>

         
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300">
            <div className="flex justify-center mb-4">
              <Eye className="text-purple-600 w-10 h-10" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-600">
              A future where technology empowers creativity and problem-solving
              for all.
            </p>
          </div>

      
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300">
            <div className="flex justify-center mb-4">
              <Heart className="text-pink-500 w-10 h-10" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Our Values</h2>
            <p className="text-gray-600">
              Innovation, transparency, and putting the user experience first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
