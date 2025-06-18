import { Router } from "express";
import { 
    checkEnrollment,
    CourseProgress, 
    createCourse, 
    enrollStudent, 
    getAllCourses, 
    getCourseById, 
    getCourseByStudentId, 
    getCourseByTeacherId, 
    getCourseOwner, 
    getCoursesByCategory, 
    getEnrolledStudents, 
 } from "../../controllers/Courses/Course.controller.js";

import { verifyJWT } from "../../middleware/authteacher.middleware.js";
import { upload } from "../../middleware/multer.middleware.js";
import { verifyJWTStudent } from "../../middleware/authstudent.middleware.js";
import { verifyJWTCombined } from "../../middleware/authcombined.middleware.js";

const router = Router();


// Courses

router.route('/:courseId').get(  getCourseById);//
router.route('/:courseId/students').get( verifyJWT, getEnrolledStudents);//
router.route('/:courseId/enroll').post( verifyJWTStudent, enrollStudent);
router.route('/:courseId/enrolled').get( verifyJWTCombined, checkEnrollment);
router.route('/:courseId/progress').get(verifyJWTCombined, CourseProgress)//
router.route('/student/:student_id').get(verifyJWTStudent,getCourseByStudentId);
router.route('/teacher/:teacher_id').get(verifyJWT,getCourseByTeacherId)
router.route('/:courseId/getTeacher').get(getCourseOwner);
router.route('').get(getCoursesByCategory)
router.route('/').post(verifyJWT,upload.single('thumbnail'),createCourse)
                .get(getAllCourses)// i still have doubts regarding this feature and plan to remove it 
// router.route('/:courseId').put( verifyJWT, updateCourse);
// router.route('/:courseId').delete( verifyJWT, deleteCourse);



// router.route('/:courseId/lectures/:lecture_id').put(verifyJWT, updateLecture);
// router.route('/:course_id/free-previews').get( verifyJWT, getFreePreviews);lecture_

// Assignments

export default router