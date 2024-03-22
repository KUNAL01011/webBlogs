import { Link } from "react-router-dom";
import "./about.css";

const About = () => {
  return (
    <div className="about">
      <div className="aboutContainer">
        <h1 className="heading1">About Us</h1>
        <p className="subtitle">
        🚀 Digital Dreamweaver: Kunal Kumal, BCA student & full-stack aficionado, embarks on a coding odyssey. Join me in unraveling the tech magic on my blogging escapade! 💻✨
        </p>
        <div className="wraper">
          <img className="aboutImg" src="./aboutImg.png" alt="" />
          <div className="info">
            <h2 className="heading2">Hello, I Am <span className="highlight">Kunal Kumar</span></h2>
            <p className="decs">
            👋 Hey there! I'm Kunal Kumal, a student of BCA 🎓 and a skikend in full-stack development 🚀. With a passion for MERN stack 🌟, I craft digital wonders from scratch. From frontend finesse with React ⚛️ to backend brilliance with Node.js 🛠️, I bring ideas to life. Join me on my coding escapades as we explore the realms of tech and creativity on my blogging website! 💻✨
            </p>
            <div className="links">
              <span className="contact-us">Contact us</span>
              <ul className="ul">
                <Link className="linkSocial" to="https://github.com/KUNAL01011"><li className="li"><i className="fa-brands fa-github"></i>Github</li></Link>
                <Link className="linkSocial" to="https://www.linkedin.com/in/kunal003/"><li className="li"><i className="fa-brands fa-linkedin"></i>Linkedin</li></Link>
                <Link className="linkSocial" to="https://www.instagram.com/kunal011010/"><li className="li"><i className="fa-brands fa-instagram"></i>Instagram</li></Link>
                <Link className="linkSocial" to="https://twitter.com/kirat_tw"><li className="li"><i className="fa-brands fa-twitter"></i>Twitter</li></Link>
                <Link className="linkSocial" to="https://discord.com/channels/@me"><li className="li"><i className="fa-brands fa-discord"></i>Discord</li></Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
