import React from "react";
import AdvancedPathologyPrograms from "./sections/AdvancedPathologyPrograms";
import TrustedMedical from "./sections/TrustedMedical";
import MedicalChooseMendelAcademy from "./sections/MedicalChooseMendelAcademy";
import Home from "./sections/Home";

function HomePage() {
  return (
    <div>
      <Home />
      {/* <AdvancedPathologyPrograms /> */}
      <TrustedMedical />
      <MedicalChooseMendelAcademy />
    </div>
  );
}

export default HomePage;
