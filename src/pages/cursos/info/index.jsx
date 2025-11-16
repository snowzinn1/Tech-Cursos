import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import powerpointImg from '../../../assets/cursos/powerpoint.png';
import excelImg from '../../../assets/cursos/excel.png';
import powerbiImg from '../../../assets/cursos/powerbi.png';
import wordImg from '../../../assets/cursos/word.png';
import api from "../../../api";
import { useEffect, useState } from "react";
import "./index.css";

export default function Informatica() {

  const staticCourses = [
    { title: "PowerPoint", level: "Avançado", duration: "80h", img: powerpointImg, color: "powerpoint" },
    { title: "Excel", level: "Básico", duration: "50h", img: excelImg, color: "excel" },
    { title: "PowerBI", level: "Básico", duration: "40h", img: powerbiImg, color: "powerbi" },
    { title: "Word", level: "Intermediário", duration: "60h", img: wordImg, color: "word" },
  ];

  const [dbCourses, setDbCourses] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      const res = await api.get("/courses");
      setDbCourses(filtrados);
    }
    loadCourses();
  }, []);

  return (
    <div className="home-container">
      <Header />

      <main className="main-content">
        <div className="courses-grid">

          {[...staticCourses, ...dbCourses].map((course, index) => (
            <div key={index} className={`course-card ${course.color || ""}`}>
              <img src={course.img} alt={course.title} />
              <div>
                <h2>{course.title}</h2>
                <p>Nível: {course.level}</p>
                {course.duration && <p>Duração: {course.duration}</p>}
              </div>
            </div>
          ))}

        </div>
      </main>

      <Footer />
    </div>
  );
}
