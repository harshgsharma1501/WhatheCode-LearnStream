
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from "../api/axios";

import CourseComp from "../components/CourseComp";
import { asyncHandler } from "../../../backend/src/utils/asyncHandler";
import GeneralCourses from "../components/GeneralCourses";
import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";

const videos = [
    {
      id: 1,
      title: "Advanced React",
      src: "/assets/videos/video2.mp4", // Update with your actual local file path
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      src: "/assets/videos/video2.mp4", // Update with your actual local file path
    },
  ];
  
  const Student = () => {
    const { user_id } = useParams();
    const location = useLocation();
    const {auth, setAuth } = useContext(AuthContext);
    const token = localStorage.getItem('accessToken');
    const name = localStorage.getItem('name')
    const errRef = useRef();
    // const ModuleRef = useRef();
    const [course_id,setCourse_id] = useState(''); 
    const [errMsg, setErrMsg] = useState('');
    const [studentcourses,setStudentCourses] = useState([])
    
    const [enrolled,setEnrolled] = useState(`Enroll`)
    // const viewCourse = async (course_id)=>{
      
    // }
    
      useEffect(() => {
              setErrMsg('');
          }, [user_id])
        
    // const userAccessToken = localStorage.getItem('accessToken') 
    useEffect(()=>{ 
      console.log("Current Auth",auth);
      const fetchStudentCourses = async ()=>{
        try {
          const response =await axios.get(`courses/student/${user_id}`,{
            headers: { 'Content-Type': 'application/json' },
            Authorization: `Bearer ${token}` ,
            withCredentials: true ,
        })
          setStudentCourses(response.data.data.Courses);
        console.log(localStorage.getItem('accessToken'));
        } catch (err) {
          console.log(err)
              if (!err?.response) {
                  setErrMsg('No Server Response');
              }
              else if (err.response?.status === 401) {
                  setErrMsg('Unauthorized');
              } else {
                  setErrMsg('Courses Retrieval Failed');
              }
              errRef.current.focus();
        }
    }
    fetchStudentCourses();
  },[localStorage.getItem('accessToken')])  
  const navigate  = useNavigate();
  const viewCourse = (course_id)=>{
    navigate(`/user/${course_id}`)
  }
    return (
      
      <div>
        
        <div className="bg-black text-center text-xl font-semibold relative w-full h-[500px]">
  <img 
    src="/assets/6caba229-b963-4af8-84b8-f71693be2507.jpg" 
    alt="Course Banner" 
    className="absolute inset-0 w-full h-full object-cover" 
  />
</div>


        <section className="m-5 text-3xl">
        <h1>Welcome <span className="font-league bold text-4xl">{name.charAt(0).toUpperCase() + name.slice(1)}</span></h1>
        </section>

        {/* My Learning Section */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">My Learning</h3>
          <CourseComp courses={studentcourses} setCourse_id={setCourse_id} ButtonName={`View Course`} buttonHandler={viewCourse} errRef={errRef} errMsg={errMsg}/>
        </div>
  
        {/* Top Courses Section */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">Top Courses</h3>
          <div className="flex gap-6">
          <GeneralCourses ButtonName={`View Course`} buttonHandler={viewCourse} setCourse_id = {setCourse_id}errMsg={errMsg} setErrMsg={setErrMsg}/>
          </div>
        </div>
        
      </div>
    );
  };
  
  export default Student;
