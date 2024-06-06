export default function Navbar() {
    return (
      <nav className="fixed top-5 left-0 w-full z-50 bg-white text-[#2f1f49] font-serif py-4 h-[15vh] flex items-center justify-center">
        <div className="text-3xl font-bold">Saif's Random Lines</div>
        <div className="absolute flex items-center justify-center w-full h-full">
          <div className="w-8 h-8 bg-red-500 rounded-full animate-ping mx-4"></div>
          <div className="w-8 h-8 bg-blue-500 rounded-full animate-ping mx-4"></div>
          <div className="w-8 h-8 bg-green-500 rounded-full animate-ping mx-4"></div>
          <div className="w-8 h-8 bg-yellow-500 rounded-full animate-ping mx-4"></div>
          <div className="w-8 h-8 bg-pink-500 rounded-full animate-ping mx-4"></div>
          {/* Add more balls with different colors and positions as desired */}
        </div>
      </nav>
    );
  }
  