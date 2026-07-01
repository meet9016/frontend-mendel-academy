import React from "react";
import PathologySubHeader from "./sections/PathologySubHeader";
import PathologyHero from "./sections/PathologyHero";
import PathologyProblem from "./sections/PathologyProblem";
import PathologyExperience from "./sections/PathologyExperience";
import PathologyProgramsIntro from "./sections/PathologyProgramsIntro";
import PathologyMasteryCourses from "./sections/PathologyMasteryCourses";
import PathologyConsulting from "./sections/PathologyConsulting";
import PathologyCommunity from "./sections/PathologyCommunity";
import PathologyFooterSections from "./sections/PathologyFooterSections";
import PathologyFAQ from "./sections/PathologyFAQ";
import PathologyCTA from "./sections/PathologyCTA";

import AdvancedPathologyHero from "./sections/AdvancedPathologyHero";

function Pathology() {
  return (
    <div className="bg-[#100b16] min-h-screen relative">
      <PathologySubHeader />
      <PathologyHero />
      <PathologyProblem />
      <PathologyExperience />
      <PathologyProgramsIntro />
      <div className="bg-[#100b16]">
        <AdvancedPathologyHero />
      </div>
      <PathologyMasteryCourses />
      <PathologyConsulting />
      <PathologyCommunity />
      <PathologyFooterSections />
      <PathologyFAQ />
      <PathologyCTA />
        {/* --- ADVANCED ENDOMETRIAL PATHOLOGY PROGRAM --- */}
      {/* <EndometrialPathology /> */}

      {/* --- PATHOLOGY MENDEL MASTERY SERIES --- */}
      {/* <PathologyMasterySeries /> */}

      {/* UPCOMING COURSE */}
      {/* <UpcomingCourse /> */}
    </div>
  );
}

export default Pathology;
