import { useEffect, useRef, useState } from "react";
import ImageCard from "./ImageCard";

export default function ImageCarousel() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  const fetchData = async () => {
    const response = await fetch("https://picsum.photos/v2/list");
    const datas = await response.json();
    setData(datas);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNext = () => {
    setIndex((prev) => {
      if (prev === data?.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };
  const handlePrev = () => {
    setIndex((prev) => {
      if (prev === 0) {
        return (prev = data?.length - 1);
      } else {
        return prev - 1;
      }
    });
  };

  useEffect(() => {
    ref.current = setInterval(handleNext, 3000);
    return () => {
      clearInterval(ref.current);
    };
  }, []);
  return (
    <>
      <div
        className="container"
        onMouseEnter={() => clearInterval(ref.current)}
        onMouseLeave={() => (ref.current = setInterval(handleNext, 3000))}
      >
        <div className="left-btn" onClick={handlePrev}></div>
        <img src={data[index]?.download_url} alt="" />
        <div className="right-btn" onClick={handleNext}></div>
      </div>
      <div className="carousel-list">
        {data?.map((img, idx) => {
          return (
            <ImageCard img={img} idx={idx} index={index} setIndex={setIndex} />
          );
        })}
      </div>
    </>
  );
}
