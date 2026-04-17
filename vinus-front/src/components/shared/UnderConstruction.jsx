"use client"

import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

export default function UnderConstruction() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4 p-8 bg-card border border-border/50 rounded-[2.5rem] shadow-xl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          <Settings className="w-16 h-16 text-primary/40" />
        </motion.div>

        <div className="text-center">
          <h2 className="text-xl font-black uppercase tracking-tighter">En desarrollo</h2>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
            Próximamente en Vinus
          </p>
        </div>
      </div>
    </div>
  );
}