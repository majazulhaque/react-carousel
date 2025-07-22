export default function ImageCard({ img, idx, index, setIndex }) {
  const handleSelect = () => {
    setIndex(idx);
  };
  return (
    <div key={idx} className={`image-card ${idx === index ? "active" : ""}`}>
      <img src={img.download_url} alt="" onClick={handleSelect} />
    </div>
  );
}
