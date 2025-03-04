import React ,{ useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './navBar';
import SideBar from './sideBar';
import HomepageContent from './homepageContent';

export default function Homepage() {
  // this controls the visibility of the side bar 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="homePageContainer" style={{ position: "absolute", backgroundColor: "pink", height: "100%", width: "100%",left:0,top:0,paddingTop:"77px",overflow:"hidden"}}>
      <NavBar/>
      <div style={{display:"flex"}}>
      <SideBar/>    
      <HomepageContent/>    
      </div>       
    </div>
  );
}
