import "./About.css";

import photo from "../../../Assets/photo.jpg"
import { FaGithub, FaLinkedin } from "react-icons/fa";
function About(): JSX.Element {
    return (
        <div className="About">
            <h1>About Me </h1>
            <div className="me">
               <img className="photo" src={photo} alt=""/>
			
            <p>My name is Darya Shelever,
             I am 23 years old,
              and I have completed a Full Stack Developer course. 
              I worked on a coupon management system project, handling both backend and frontend development.
               My responsibilities included creating and managing the database, developing server logic, and implementing the client-side interface. 
               I have experience with technologies such as JavaScript and React. 
               In the coupon management system project, I used these technologies to develop the backend part of the system using Java and Spring. 
               Additionally, I have experience working with MySQL databases, which were used in the project to store information about coupons and customers.
               </p> 
            </div>
            <div className="navbar-link">
            <a href="https://github.com/DaryaShelever"><FaGithub/></a>
            <a href="https://www.linkedin.com/in/darya-shelever/"><FaLinkedin/></a>

            </div>
        </div>
    );
}

export default About;
