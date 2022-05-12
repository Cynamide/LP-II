import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentList.css";
const StudentList = () => {
  const [students, setStudents] = useState([]);
  const fetchData = async () => {
    try {
      let res = await axios.get("http://localhost:3000/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      // eslint-disable-next-line
      let res = await axios.delete(`http://localhost:3000/delete`, {
        params: { roll_no: [id] },
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  const updateMarks = async (rollNo) => {
    try {
      // eslint-disable-next-line
      let res = await axios.patch(`http://localhost:3000/update`, {
        roll_no: [rollNo],
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <table style={{ border: "1px solid black" }} className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">RollNo</th>
            <th scope="col">CC</th>
            <th scope="col">AI</th>
            <th scope="col">WAD</th>
            <th scope="col">CNS</th>
            <th scope="col">DSBDA</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.student_marks &&
            students.student_marks.length > 0 &&
            students.student_marks.map((student) => (
              <tr>
                <td>{student.name}</td>
                <td>{student.roll_no}</td>
                <td>{student.cc}</td>
                <td>{student.ai}</td>
                <td>{student.wad}</td>
                <td>{student.cns}</td>
                <td>{student.dsbda}</td>
                <td>
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteStudent(student.roll_no)}
                    className="fa-solid fa-trash-can"
                  >
                    Delete
                  </i>{" "}
                  |
                  <i
                    style={{ cursor: "pointer" }}
                    className="fa-solid fa-pen-clip"
                    onClick={() => updateMarks(student.roll_no)}
                  >
                    Update
                  </i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
