import React from "react";
import {ExploreCourseCard} from "./exploreCard";
import "./exploreSection.css";

const ExploreSection = ({ courses, collectionName }) => {
  console.log(courses);
  if (courses.length==0){
    return (
      <div id = "hi" className="max-width explore-section">
        <h3 className="collection-title">{collectionName}</h3>
        <div>Oops! No Courses are present. </div>
    </div>
    );
  }
  return (
    <div id = "hi" className="max-width explore-section">
      <h3 className="collection-title">{collectionName}</h3>
      <div className="explore-grid">
        {courses.map((course, i) => {
          return <div id={course.id}>
          <ExploreCourseCard course = {course} i={i}/>
          <br></br>
          </div>
      })}
      </div>
    </div>
  );
};

export default ExploreSection;