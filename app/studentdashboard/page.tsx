"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

interface Course {
  id: number;
  name: string;
  code: string;
  semester: string;
  is_optional?: boolean;
}

interface Course1 {
  id: number;
  name: string;
  sem: string;
  username: string;
  email: string;
  department: string;
}

const Page: React.FC = () => {
  const [view, setView] = useState<"courses">("courses");
  const [semester, setSemester] = useState<string>("1");
  const [courses, setCourses] = useState<Course[]>([]);
  const [optionalCourses, setOptionalCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedOptionalCourses, setSelectedOptionalCourses] = useState<
    Course[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const token = localStorage.getItem("token");
  const [studentsname, setstudentsname] = useState<Course1[]>([]);
  useEffect(() => {
    handleCourses();
  }, [semester]);

  const handleSubmit = async () => {
    try {
      console.log(selectedOptionalCourses);
      const response1 = await axios.post(
        "http://192.168.188.144:8001/courses/",
        [courses], // Pass the data as the second argument
        {
          headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.error("Token:", token);
      alert("Course is submitted", courses);
    } catch (error) {
      console.error("There was an error fetching the courses!", error);
    }
  };

  const handleCourses = async () => {
    try {
      const response = await axios.get<Course[]>(
        "http://192.168.188.144:8001/courses/",
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      const coursesData = response.data;
      setCourses(coursesData);
      const optionalCoursesData = coursesData.filter(
        (course) => course.is_optional
      );
      setOptionalCourses(optionalCoursesData);
      setFilteredCourses(optionalCoursesData);
    } catch (error) {
      console.error("There was an error fetching the courses!", error);
    }
  };

  useEffect(() => {
    handleCourses();
    fetchstudents();
  }, []);

  const handleSelectCourse = (course: Course) => {
    setSelectedOptionalCourses((prevCourses) => [...prevCourses, course]);
    setFilteredCourses((prevCourses) =>
      prevCourses.filter((c) => c.id !== course.id)
    );
  };

  const filteredCoursesByName = filteredCourses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );
  const fetchstudents = async () => {
    try {
      const response = await axios.get(
        "http://192.168.188.144:8001/students/",
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      // Ensure we always set an array to the state
      setstudentsname(
        Array.isArray(response.data) ? response.data : [response.data]
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching the students!", error);
    }
  };
  return (
    <div className="flex h-screen text-black overflow-y-hidden bg-gray-100">
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold uppercase">Kahe Dashboard</span>
        </div>
        <div className="flex flex-col mx-4 overflow-y-auto">
          <div className="mt-4 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Student Information</h2>
            {Array.isArray(studentsname) && studentsname.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentsname.map((student: Course1) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.department.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.sem}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No student data available</p>
            )}
          </div>
          <nav className="flex-1 px-2 py-4 bg-gray-800">
            <a
              href="#"
              onClick={() => setView("courses")}
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
            >
              <FontAwesomeIcon icon={faBook} className="h-6 w-6 mr-2" />
              Enrolled Courses
            </a>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for optional courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4 bg-white shadow-md rounded-lg max-h-60 ">
            <h3 className="text-lg font-semibold p-4">Optional Courses</h3>
            <div className="divide-y divide-gray-200">
              {filteredCoursesByName.map((course) => (
                <div
                  key={course.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectCourse(course)}
                >
                  {course.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="p-6">
          {view === "courses" && (
            <div>
              <h1 className="font-bold text-xl">Compulsory Courses</h1>
              <div className="overflow-x-auto mt-4 bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject Name
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject Code
                      </th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Semester No.
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {courses
                      .filter((course) => !course.is_optional)
                      .map((course) => (
                        <tr key={course.id}>
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">
                            {course.id}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {course.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {course.code}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {course.semester}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">
                  Enrolled Optional Courses
                </h3>

                <div className="overflow-x-auto mt-4 bg-white shadow-md rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject Name
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject Code
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Semester No.
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOptionalCourses.map((course) => (
                        <tr key={course.id}>
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">
                            {course.id}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {course.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {course.code}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">
                            {course.semester}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
