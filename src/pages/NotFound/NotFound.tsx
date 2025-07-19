import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#000E25] ">
      <div className="text-center">
        <Link to="/">
          <img src="/404.jpg"  alt="404 Not Found" className=" w-[400px]  rounded-lg" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
