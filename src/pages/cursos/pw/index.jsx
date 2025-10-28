import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import html5Img from '../../../assets/cursos/html5.png';
import css3Img from '../../../assets/cursos/css3.png';
import javascriptImg from '../../../assets/cursos/javascript.png';
import reactImg from '../../../assets/cursos/react.png';

export default function ProgramacaoWeb() {
  const courses = [
    { title: "HTML5", level: "Avançado", duration: "60h", img: html5Img, color: "html" },
    { title: "CSS3", level: "Básico", duration: "50h", img: css3Img, color: "css" },
    { title: "JavaScript", level: "Avançado", duration: "90h", img: javascriptImg, color: "javascript" },
    { title: "React", level: "Básico", duration: "40h", img: reactImg, color: "react" },
  ];

  return (
    <div className="home-container">
      {/* Navbar */}
        <Header />

      {/* Conteúdo principal */}
      <main className="main-content">
        <div className="courses-grid">
          {courses.map((course, index) => (
            <div key={index} className={`course-card ${course.color}`}>
              <img src={course.img} alt={course.title} />
              <div>
                <h2>{course.title}</h2>
                <p>Nível: {course.level}</p>
                <p>Duração: {course.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Rodapé */}
        <Footer />
    </div>
  );
}