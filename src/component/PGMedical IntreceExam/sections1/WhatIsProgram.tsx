"use client";

import React from "react";

interface WhatIsProgramProps {}

const WhatIsProgram: React.FC<WhatIsProgramProps> = () => {
  return (
    <section className="py-[72px] px-6 bg-white">
      <div className="max-w-[960px] mx-auto">
        <h2 className="text-[30px] font-black text-center mb-8 usmle-text-black ff-font-bold">
          What is the Mendel Step 1 Program?
        </h2>
        <div className="border border-gray-200 rounded-2xl p-8 bg-white">
          <p className="text-[15px] text-gray-700 leading-relaxed ff-font">
            Most USMLE Step 1 preparation programs prioritize <strong>volume over understanding</strong>. Mendel Academy takes a different approach. Built around the Mendel Method, our Step 1 curriculum is designed to help medical students, IMGs, and FMGs develop the <strong>conceptual clarity and clinical reasoning skills</strong> that the exam demands, not just the ability to recall isolated facts. Students who prepare the Mendel way don't just pass Step 1, they understand medicine at a level that carries them forward.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIsProgram;
