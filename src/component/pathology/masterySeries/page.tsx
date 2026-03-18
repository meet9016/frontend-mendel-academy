import React from "react";
import PathologyMasterySeries from "../sections/PathologyMasterySeries";
import StatusSection from "../sections/StatusSection";
import EndometrialPathology from "../sections/EndometrialPathology";
import UpcomingCourse from "../sections/UpcomingCourse";
import MendelStudent from "../sections/MendelStudent";
import MeetYourMentor from "../sections/MeetYourMentor";
import AdvancedPathology from "../sections/AdvancedPathology";
import HyperspecialistSection from "../sections/HyperspecialistSection";
import Faq from "@/component/PGMedical IntreceExam/sections/Faq";

function MasterySeries() {
  return (
    <div>
   

      <PathologyMasterySeries showCounters={true}/>

  
      <AdvancedPathology />
      
      {/* --- Stats Section --- */}

      {/* --- ADVANCED ENDOMETRIAL PATHOLOGY PROGRAM --- */}
      {/* <EndometrialPathology /> */}

      {/* --- PATHOLOGY MENDEL MASTERY SERIES --- */}
      {/* <PathologyMasterySeries /> */}

      {/* UPCOMING COURSE */}
      {/* <UpcomingCourse /> */}

      {/* MENDEL STUDENT */}
      <MendelStudent />

      {/* MEET YOUR MENTOR */}
      <MeetYourMentor />
         <Faq />
    </div>
  );
}

export default MasterySeries;
