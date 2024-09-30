import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [semester, setSemester] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [isOptional, setIsOptional] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    setErrorMessage(""); // Clear any previous error message
    if (!semester || !subjectName || !subjectCode) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const semesterNumber = Number(semester);
    if (isNaN(semesterNumber) || semesterNumber <= 0) {
      setErrorMessage("Semester must be a positive number.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://192.168.250.219:8000/update_course/",
        {
          course_id: 1,
          semester,
          name: subjectName,
          code: subjectCode,
          is_optional: isOptional,
        },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      console.log(response.data);
      setSemester("");
      setSubjectName("");
      setSubjectCode("");
      setIsOptional(false);
      setLoading(false); 
    } catch (error) {
      console.error("There was an error updating the course!", error);
      setErrorMessage(
        "There was an error updating the course. Please try again."
      );
      setLoading(false); // Stop loading in case of error
    }
  };

  return (
    <div className="max-w-lg mx-auto text-black bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Upload Course</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Semester:
          </label>
          <input
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Subject Name:
          </label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Subject Code:
          </label>
          <input
            type="text"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Optional:
          </label>
          <input
            type="checkbox"
            checked={isOptional}
            onChange={(e) => setIsOptional(e.target.checked)}
            className="mr-2"
          />
          Is Optional
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {loading && <p>Loading...</p>}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
