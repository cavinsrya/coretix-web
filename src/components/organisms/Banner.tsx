export default function Banner() {
  return (
    <div className="relative w-full h-[200px] md:h-[300px] bg-gray-300 rounded-lg mb-8">
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
      </div>
    </div>
  );
}
