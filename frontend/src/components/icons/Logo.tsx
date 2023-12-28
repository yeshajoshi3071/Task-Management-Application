/**
 * SVGImage component.
 * Renders an SVG image with multiple colored bars.
 */
const SVGImage: React.FC = () => {
  return (
    <div className="w-6 h-[25px] relative mr-4">
      <div className="w-1.5 h-[25px] left-0 top-0 absolute bg-indigo-500 rounded-sm"></div>
      <div className="w-1.5 h-[25px] left-[9px] top-0 absolute opacity-75 bg-indigo-500 rounded-sm"></div>
      <div className="w-1.5 h-[25px] left-[18px] top-0 absolute opacity-50 bg-indigo-500 rounded-sm"></div>
    </div>
  );
};

export default SVGImage;