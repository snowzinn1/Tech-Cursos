import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import pythonImg from '../../../assets/cursos/python.png';
import javaImg from '../../../assets/cursos/java.png';
import csharpImg from '../../../assets/cursos/csharp.png';
import rubyImg from '../../../assets/cursos/ruby.png';
import api from "../../../api";
import { useEffect, useState } from "react";
import "./index.css";

export default function LinguagensProgramacao() {

  const staticCourses = [
    { title: "Python", level: "Avançado", duration: "80h", img: pythonImg, color: "python"},
    { title: "Java", level: "Básico", duration: "40h", img: javaImg, color: "java"},
    { title: "C#", level: "Básico", duration: "40h", img: csharpImg, color: "csharp"},
    { title: "Ruby", level: "Básico", duration: "40h", img: rubyImg, color: "ruby"},
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
