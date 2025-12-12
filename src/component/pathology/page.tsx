import React from "react";
import PathologyMasterySeries from "./sections/PathologyMasterySeries";
import StatusSection from "./sections/StatusSection";
import EndometrialPathology from "./sections/EndometrialPathology";
import UpcomingCourse from "./sections/UpcomingCourse";
import MendelStudent from "./sections/MendelStudent";
import MeetYourMentor from "./sections/MeetYourMentor";
import AdvancedPathology from "./sections/AdvancedPathology";
import HyperspecialistSection from "./sections/HyperspecialistSection";

function Pathology() {
  return (
    <div>
      <HyperspecialistSection/>

      <PathologyMasterySeries />

      <AdvancedPathology />
      
      {/* --- Stats Section --- */}
      <StatusSection />

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
    </div>
  );
}

export default Pathology;
