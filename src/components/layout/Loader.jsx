import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import profile from "../../data/profile";

function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-cyan-400 text-4xl font-black text-cyan-400"
        >
          {profile.name?.charAt(0)}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white"
        >
          Loading...
        </motion.h2>

        <div className="h-2 w-72 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
          />
        </div>
      </div>
    </div>
  );
}

export default Loader;