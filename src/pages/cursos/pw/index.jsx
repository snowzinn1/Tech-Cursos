import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import html5Img from '../../../assets/cursos/html5.png';
import css3Img from '../../../assets/cursos/css3.png';
import javascriptImg from '../../../assets/cursos/javascript.png';
import reactImg from '../../../assets/cursos/react.png';
import api from "../../../api";
import { useEffect, useState } from "react";
import "./index.css";

export default function ProgramacaoWeb() {

  const staticCourses = [
    { title: "HTML5", level: "Avançado", duration: "60h", img: html5Img, color: "html" },
    { title: "CSS3", level: "Básico", duration: "50h", img: css3Img, color: "css" },
    { title: "JavaScript", level: "Avançado", duration: "90h", img: javascriptImg, color: "javascript" },
    { title: "React", level: "Básico", duration: "40h", img: reactImg, color: "react" },
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
