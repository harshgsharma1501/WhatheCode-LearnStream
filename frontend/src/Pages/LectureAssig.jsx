import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { Play } from "lucide-react";
import { useEffect, useState,  } from "react";
import { Card } from "flowbite-react";
import axios from "../api/axios.js";
import PDFPreviewModal from "../components/PDFPreviewModal.jsx";
import YourWork from "../components/YourWork.jsx";
import BackButton from "../components/BackButton.jsx";

const CLOUDINARY_CLOUD_NAME = "dc9lboron";

const LectureAssig = () => {
  const location = useLocation();
  const { course_id = "", lectures = [], assignments = [] } = location.state || {};
  const [lectureUrl, setLectureUrl] = useState("");
  const [currentLectureId, setCurrentLectureId] = useState(null);
  const [completedLectures, setCompletedLectures] = useState({});
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
  const [assignmentUrls, setAssignmentUrls] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [assignmentDeadline, setAssignmentDeadline] = useState(null);

  useEffect(() => {
    const fetchCompletedLectures = async () => {
      try {
        const response = await axios.get(`/courses/${course_id}/completed`);
        const completedLectureIds = response.data.completedLectures.map(
          (lecture) => lecture.lectureId
        );
        const completedMap = completedLectureIds.reduce((acc, id) => {
          acc[id] = true;
          return acc;
        }, {});
        setCompletedLectures(completedMap);
        console.log("Completed lectures:", completedMap);
      } catch (error) {
        console.error("Error fetching completed lectures:", error);
      }
    };

    if (course_id) {
      fetchCompletedLectures();
    }
  }, [course_id]);

  const handleSelectLecture = async (lecture) => {
    setCurrentLectureId(lecture._id);
    setSelectedDiv("lecture");
    setLectureUrl(
      `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${lecture.public_id}.mp4`
    );

    // ✅ If lecture is not already marked completed, mark it now
    if (!completedLectures[lecture._id]) {
      try {
        await axios.post(`/courses/${course_id}/lectures/${lecture._id}/complete`, {
          lectureId: lecture._id,
        });

        // ✅ Update the checkbox state immediately
        setCompletedLectures((prev) => ({ ...prev, [lecture._id]: true }));
      } catch (error) {
        console.error("Error marking lecture as completed:", error);
      }
    }
  };

  const handleSelectAssignment = (assignment) => {
    setSelectedDiv("assignment");
    setCurrentAssignmentId(assignment._id);
    setAssignmentDeadline(assignment.deadline);
    setAssignmentUrls(
      assignment.public_id.map(
        (url) => `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${url}.pdf`
      )
    );
  };

    return (
      
      <div className="flex flex-col md:flex-row">
        <BackButton/> 
        {/* Left Panel - Lecture & Assignment List */}
        <div className="bg-white border-t-2 md:border-t-0 md:border-r-2 border-black 
                w-full md:w-1/4 p-5 text-black overflow-y-auto order-last md:order-first">
          <h2 className="text-xl font-semibold mb-4">Lectures and Assignments</h2>

          {/* Lectures List */}
          <div className="flex-col relative">
            {lectures.length > 0 ? (
              lectures.map((lecture) => (
                <Card
                  key={lecture._id}
                  className={`mb-2 w-auto text-blue-500 gap-1 cursor-pointer ${
                    currentLectureId === lecture._id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleSelectLecture(lecture)}
                >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!completedLectures[lecture._id]}
                      readOnly
                    />
                    <span>{lecture.title} <Play /></span>
                  </label>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No lectures available</p>
            )}
          </div>

          {/* Assignments List */}
          <div className="flex-col relative">
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <Card
                  key={assignment._id}
                  className={`mb-2 w-auto text-blue-500 gap-1 cursor-pointer ${
                    selectedDiv === "assignment" ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleSelectAssignment(assignment)}
                >
                  <span>{assignment.title} <Play /></span>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No Assignments available</p>
            )}
          </div>
        </div>

        {/* Right Panel - Video Player and Assignments */}
        <div className="flex-1 p-4">
          {/* Video Player */}
          {selectedDiv === "lecture" && lectureUrl ? (
            <ReactPlayer
              url={lectureUrl}
              playing={false}
              loop={false}
              controls={true}
              width="100%"
              height="500px"
            />
          ) : (
            <p className="text-center text-gray-500">
              Select a lecture to play or an assignment to view
            </p>
          )}

          {/* Assignment PDF List */}
          {selectedDiv === "assignment" && assignmentUrls.length > 0 ? (
            assignmentUrls.map((url, index) => (
              <Card
                key={index}
                onClick={() => setSelectedPdfUrl(url)}
                className="block w-full text-left py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 mb-2"
              >
                Assignment {index + 1}
              </Card>
            ))
          ) : (
            <p className="text-gray-500">Please Select an Assignment</p>
          )}

          {/* PDF Preview Modal */}
          {selectedPdfUrl && (
            <PDFPreviewModal
              pdfUrl={selectedPdfUrl}
              onClose={() => setSelectedPdfUrl(null)}
            />
          )}
        </div>

        {selectedDiv === "assignment" && (
          <YourWork assignmentId={currentAssignmentId} courseId={course_id} deadline={assignmentDeadline} />
        )}
      </div>
    );
  };

export default LectureAssig;
