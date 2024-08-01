"use client";
import axios from "axios";
import React, { useState } from "react";

interface Student {
  id: number;
  username: string;
  email: string;
}

interface Course {
  id: number;
  name: string;
  code: string;
  semester: string;
  is_optional: boolean;
}

const Page = () => {
  const [view, setView] = useState("none");
  const [semester, setSemester] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [isOptional, setIsOptional] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    var code = subjectCode;
    var name = subjectName;
    var is_optional = isOptional;
    try {
      const response = await axios.post(
        "http://192.168.188.144:8000/update_course/",
        {
          semester,
          name,
          code,
          is_optional,
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
    } catch (error) {
      console.error("There was an error updating the course!", error);
    }
  };

  const handleFetch = async () => {
    try {
      const response = await axios.get(
        "http://192.168.188.144:8000/students/",
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching the students!", error);
    }
  };

  const handleCourses = async () => {
    try {
      const response = await axios.get("http://192.168.188.144:8000/courses/", {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching the courses!", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex h-screen text-black bg-gray-100">
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold uppercase">Kahe Dashboard</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800">
            <a
              href="#"
              onClick={() => setView("upload")}
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              Upload
            </a>
            <a
              href="#"
              onClick={() => setView("students")}
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                />
              </svg>
              View Students
            </a>
            <a
              href="#"
              onClick={() => setView("courses")}
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                />
              </svg>
              View Courses
            </a>
          </nav>
        </div>
      </div>

      <div className="flex flex-col flex-1 rightside overflow-y-auto">
        <div className="p-4">
          {view === "upload" && (
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Upload Content
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Semester
                  </label>
                  <input
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <label className="block text-gray-700 text-sm font-bold mb-2 mr-4">
                    Is Optional
                  </label>
                  <input
                    type="checkbox"
                    checked={isOptional}
                    onChange={(e) => setIsOptional(e.target.checked)}
                    className="form-checkbox h-5 w-5"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          {view === "students" && (
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Students List
              </h2>
              <button
                onClick={handleFetch}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-6"
              >
                Fetch Students
              </button>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Username</th>
                    <th className="py-2 px-4 border-b">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="py-2 px-4 border-b">{student.id}</td>
                      <td className="py-2 px-4 border-b">{student.username}</td>
                      <td className="py-2 px-4 border-b">{student.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {view === "courses" && (
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Courses List
              </h2>
              <button
                onClick={handleCourses}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-6"
              >
                View Courses
              </button>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Code</th>
                    <th className="py-2 px-4 border-b">Semester</th>
                    <th className="py-2 px-4 border-b">Optional</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className="py-2 px-4 border-b">{course.id}</td>
                      <td className="py-2 px-4 border-b">{course.name}</td>
                      <td className="py-2 px-4 border-b">{course.code}</td>
                      <td className="py-2 px-4 border-b">{course.semester}</td>
                      <td className="py-2 px-4 border-b">
                        {course.is_optional ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            onClick={handlePrint}
            className="w-fit bg-green-500 text-white py-2 px-4 rounded mt-6"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
