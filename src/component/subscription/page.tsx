import React, { useEffect } from "react";
import LiveSession from "./sections/LiveSession";
import CourseSnapShot from "./sections/CourseSnapShot";
import ProgramFeatures from "./sections/ProgramFeatures";
import MeetYourMentor from "../pathology/sections/MeetYourMentor";
import RegisterMasterClass from "./sections/RegisterMasterClass";
import MainSection from "./sections/MainSection";
import { DetailPageSkeleton } from "../Skeletons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getData } from "@/redux/dataSlice";
import { useAppDispatch } from "@/redux/hooks";
import ChooseYourLearningPath from "./sections/ChooseYourLearningPath";

const UpCommingCourses = () => {
  const dispatch = useAppDispatch();

  const { loadings, list } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const courseData = list && list.length > 0 ? list[0] : null;
  const currency = courseData?.currency || 'USD';
  const userCountry = courseData?.user_country || '';
  const livecourseId = courseData?._id;

  if (loadings) {
    return <DetailPageSkeleton />;
  }

  if (!courseData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">No Course Data Available</h2>
        <p className="text-gray-600">Please check back later for upcoming courses.</p>
      </div>
    );
  }

  const handleCartUpdate = (moduleId: string) => {
    // Optional: Handle cart updates or dispatch actions
  };

  return (
    <div>
      <MainSection data={courseData} />

      {/* LIVE SECTION */}
      <LiveSession data={list[0]}/>

      {/* COURSE SNAPSHOT */}
      <CourseSnapShot />

      {/* PROGRAM FEATURES */}
      <ProgramFeatures />

      <ChooseYourLearningPath
        data={courseData?.choose_plan_list || []}
        currency={currency}
        userCountry={userCountry}
        livecourseId={livecourseId}
        onAddToCart={handleCartUpdate}
      />

      {/* MEET YOUR MENTOR */}
      <MeetYourMentor />

      {/* REGISTER FOR MASTERCLASS */}
      <RegisterMasterClass />
    </div>
  );
};

export default UpCommingCourses;
