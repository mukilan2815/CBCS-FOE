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

const Page: React.FC = () => {
  const [view, setView] = useState<"courses">("courses");
  const [semester, setSemester] = useState<string>("1");
  const [courses, setCourses] = useState<Course[]>([]);
  const [optionalCourses, setOptionalCourses] = useState<Course[]>([]);
  const [selectedOptionalCourses, setSelectedOptionalCourses] = useState<
    Course[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    handleCourses();
  }, [semester]);

  useEffect(() => {
    setCourses([
      {
        id: 1,
        name: "Introduction to Programming",
        code: "CS101",
        semester: "Fall",
        is_optional: false,
      },
      {
        id: 2,
        name: "Data Structures",
        code: "CS102",
        semester: "Spring",
        is_optional: false,
      },
      {
        id: 3,
        name: "Algorithms",
        code: "CS201",
        semester: "Fall",
        is_optional: false,
      },
      {
        id: 4,
        name: "Operating Systems",
        code: "CS202",
        semester: "Spring",
        is_optional: false,
      },
      {
        id: 5,
        name: "Database Systems",
        code: "CS301",
        semester: "Fall",
        is_optional: true,
      },
    ]);
    setOptionalCourses([
      {
        id: 6,
        name: "Artificial Intelligence",
        code: "CS401",
        semester: "Spring",
        is_optional: true,
      },
      {
        id: 7,
        name: "Machine Learning",
        code: "CS402",
        semester: "Fall",
        is_optional: true,
      },
      {
        id: 8,
        name: "Computer Vision",
        code: "CS403",
        semester: "Spring",
        is_optional: true,
      },
    ]);
  });

  const handleCourses = async () => {
    try {
      const response = await axios.get<Course[]>(
        "http://192.168.188.144:8000/courses/",
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      const coursesData = response.data;
      setCourses(coursesData);
      setOptionalCourses(coursesData.filter((course) => course.is_optional));
    } catch (error) {
      console.error("There was an error fetching the courses!", error);
      // Set mock data if API call fails
    }
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedOptionalCourses((prevCourses) => [...prevCourses, course]);
  };

  // Filtered optional courses based on search input
  const filteredCourses = optionalCourses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen text-black bg-gray-100">
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold uppercase">Kahe Dashboard</span>
        </div>
        <div className="flex flex-col mx-4 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800">
            <a
              href="#"
              onClick={() => setView("courses")}
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
            >
              <FontAwesomeIcon icon={faBook} className="h-6 w-6 mr-2" />
              View Courses
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
          <div className="mt-4 bg-white shadow-md rounded-lg max-h-60 overflow-auto">
            <h3 className="text-lg font-semibold p-4">Optional Courses</h3>
            <div className="divide-y divide-gray-200">
              {filteredCourses.map((course) => (
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
                    {courses.map((course) => (
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
                  Selected Optional Courses
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
                  onClick={() => alert("Courses submitted!")}
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
