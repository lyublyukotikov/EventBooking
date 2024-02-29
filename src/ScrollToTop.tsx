import React  from "react";
import { useEffect } from "react";
import { useState } from "react";


const ScrollToTopButton: React.FC = () => {
 const [isVisible, setIsVisible] = useState(false);

 // Прокрутка вверх при клике на кнопку
 const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
 };

 useEffect(() => {
    // Прокрутка вверх, когда пользователь достигает верха страницы
    const toggleVisibility = () => {
      if (window.pageYOffset > 300){
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
 }, []);

 return (
    <div className="scroll-to-top" style={{ position: 'fixed', right:100, bottom:50 }} >
      {isVisible && 
        <div onClick={scrollToTop}>
         <img src="../src/assets/scroll.png" alt="" />
        </div>}
    </div>
 );
}

export default ScrollToTopButton;