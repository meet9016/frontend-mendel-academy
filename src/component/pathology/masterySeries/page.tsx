import React from "react";
import PathologyMasterySeries from "../sections/PathologyMasterySeries";
import MendelStudent from "../sections/MendelStudent";
import MeetYourMentor from "../sections/MeetYourMentor";
import AdvancedPathology from "../sections/AdvancedPathology";
import PathologyFAQ from "../sections/PathologyFAQ";
import CohortScopingForm from "../sections/CohortScopingForm";

function MasterySeries() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1D172A]">
      <AdvancedPathology />
      <PathologyMasterySeries showCounters={true}/>
      <MendelStudent />
      <MeetYourMentor />
      <CohortScopingForm />
      <PathologyFAQ />
    </div>
  );
}

export default MasterySeries;
