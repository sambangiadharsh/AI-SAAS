import React, { useState, useEffect } from 'react';

import { Gem, Sparkles } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';
import CreationItem from "../Componenets/CreationItem";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useAuth } from "@clerk/clerk-react";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Simple shimmer component for placeholders
const ShimmerCard = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl h-24 w-full mb-4"></div>
);

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const getDashboards = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboards();
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Total creations card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">Total creations</p>
            <h2 className="text-3xl font-bold">{loading ? '...' : creations.length}</h2>
          </div>
          <div className="bg-blue-700 p-3 rounded-full">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Active plan card */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow p-5 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">Active plan</p>
            <h2 className="text-3xl font-bold">
              <Protect plan="premium" fallback="Free">Premium</Protect>
            </h2>
          </div>
          <div className="bg-purple-700 p-3 rounded-full">
            <Gem className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent creations */}
      <div>
        <p className="text-lg font-semibold mb-4">Recent creations</p>
        <div className="mb-5">
          {loading
            ? // Show 5 shimmer placeholders while loading
              Array(5)
                .fill(0)
                .map((_, i) => <ShimmerCard key={i} />)
            : creations.map((item) => (
                <CreationItem key={item.id} item={item} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
