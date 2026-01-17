'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ExchangeDetailsTable from './ExchangeDetailsTable';
import ConversionPanel, { PlanKey } from './ConversionPanel';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const ConversionSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('residential');

  return (
    <motion.div
      className="w-full space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Conversion Panel */}
      <motion.div variants={itemVariants}>
        <ConversionPanel selectedPlan={selectedPlan} onChangePlan={setSelectedPlan} />
      </motion.div>

      {/* Exchange Details Table */}
      <motion.div variants={itemVariants}>
        <ExchangeDetailsTable selectedPlan={selectedPlan} />
      </motion.div>
    </motion.div>
  );
};

export default ConversionSection;
