import StatusSection from "../sections/StatusSection";
import MendelStudent from "../sections/MendelStudent";
import MeetYourMentor from "../sections/MeetYourMentor";
import HyperspecialistSection from "../sections/HyperspecialistSection";

function HyperSpecialist() {
  return (
    <div>
      <HyperspecialistSection/>
      
      {/* --- Stats Section --- */}
      <StatusSection />

      {/* MENDEL STUDENT */}
      <MendelStudent />

      {/* MEET YOUR MENTOR */}
      <MeetYourMentor />
    </div>
  );
}

export default HyperSpecialist;
