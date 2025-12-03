import React from "react";
import TrustedMedical from "./sections/TrustedMedical";
import MedicalChooseMendelAcademy from "./sections/MedicalChooseMendelAcademy";
import Home from "./sections/Home";

function HomePage() {
  return (
    <div>
      <Home />
      <TrustedMedical />
      <MedicalChooseMendelAcademy />
    </div>
  );
}

export default HomePage;
