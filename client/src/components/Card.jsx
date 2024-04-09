import { NavLink } from "react-router-dom";

const Card = ({blogData}) => {
  return (
    <NavLink to={`/single-blog/${blogData._id}`}>
      <div className="w-[350px] flex flex-col border border-gray-700 m-auto items-center p-2 shadow-lg rounded-lg text-white">
        <div className="flex justify-center">
          <img
            className=""
            src={blogData.mainImage}
            alt=""
          />
        </div>

        <div>
          <span className="text-[10px] opacity-[0.8]  pb-1 pr-2 pl-2 shadow-xl bg-[#242535] rounded-lg">
            {blogData.category}
          </span>
          <h4 className="mt-2 font-medium">
            {blogData.title}
          </h4>
          <div className="flex justify-between items-center mt-4">
            <NavLink to="/profile">
              <div className="flex gap-2 items-center">
                <img src="./logo.png" className="w-6" alt="" />
                <span className="text-[12px] opacity-[0.8]">{blogData.user.fullName}</span>
              </div>
            </NavLink>
            <span className="text-[12px] opacity-[0.8]">Augest 20, 2022</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
