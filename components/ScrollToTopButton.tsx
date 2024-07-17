"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";

const ScrollToTopButton = () => {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 1);
        }
        window.addEventListener("scroll", handleScroll);
  
        return () => {
          window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth"});
    }

    return (<>
        {show &&
            <Button onClick={scrollToTop} text="Go to Top" classes="fixed bottom-4 right-4" />
        }
    </>)
}

export default ScrollToTopButton;