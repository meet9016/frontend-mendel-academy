import React from "react";
import PathologyMasterySeries from "../sections/PathologyMasterySeries";
import MendelStudent from "../sections/MendelStudent";
import AdvancedPathology from "../sections/AdvancedPathology";
import PathologyFAQ from "../sections/PathologyFAQ";
import CohortScopingForm from "../sections/CohortScopingForm";

function MasterySeries() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#241E3D]">
      <AdvancedPathology />
      <PathologyMasterySeries showCounters={true}/>
      <MendelStudent />
      <CohortScopingForm />
      <PathologyFAQ />
    </div>
  );
}

export default MasterySeries;
