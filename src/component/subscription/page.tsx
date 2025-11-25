import React, { useEffect } from "react";
import LiveSession from "./sections/LiveSession";
import CourseSnapShot from "./sections/CourseSnapShot";
import ProgramFeatures from "./sections/ProgramFeatures";
import MeetYourMentor from "../pathology/sections/MeetYourMentor";
import RegisterMasterClass from "./sections/RegisterMasterClass";
import MainSection from "./sections/MainSection";
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

  console.log("list", list[0]);
  return (
    <div>
      <MainSection data={list[0]}/>

      {/* LIVE SECTION */}
      <LiveSession data={list[0]}/>

      {/* COURSE SNAPSHOT */}
      <CourseSnapShot />

      {/* PROGRAM FEATURES */}
      <ProgramFeatures />

      {/* CHOOSE LEARNING PATH */}
      <ChooseYourLearningPath data={list[0]?.choose_plan_list}/>

      {/* MEET YOUR MENTOR */}
      <MeetYourMentor />

      {/* REGISTER FOR MASTERCLASS */}
      <RegisterMasterClass />
    </div>
  );
};

export default UpCommingCourses;
