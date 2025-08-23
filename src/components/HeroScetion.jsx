import { IoFlashOutline } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";
import { IoMdCheckboxOutline } from "react-icons/io";
import { AiOutlineBarChart } from "react-icons/ai";
import { MdOutlineSecurity } from "react-icons/md";
import { NavLink } from "react-router-dom";
const HeroScetion = () => {
  const features = [
    {
      title: "Smart Organization",
      desc: "Organize tasks by priority, category, and due dates with intelligent sorting",
      icon: IoMdCheckboxOutline,
      textColor: "text-blue-900",
      bgColor: "bg-blue-100/50",
    },
    {
      title: "Productivity Analytics",
      desc: "Track your progress with detailed insights and completion statistics",
      icon: AiOutlineBarChart,
      textColor: "text-green-900",
      bgColor: "bg-green-100/50",
    },
    {
      title: "Secure & Private",
      desc: "Your data is encrypted and stored securely with full privacy protection",
      icon: MdOutlineSecurity,
      textColor: "text-red-900",
      bgColor: "bg-red-100/50",
    },
  ];

  return (
    <div className=" mt-12">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center px-4">
        <div className="flex items-center gap-2 font-medium text-sm text-blue-900 bg-blue-100/70 px-4 py-1.5 rounded-full">
          <IoFlashOutline />
          <p>Professional Task Management</p>
        </div>

        <div className="flex flex-col items-center text-center gap-4 my-6">
          <h1 className="text-3xl md:text-6xl font-bold">
            Organize your work and life,{" "}
            <span className="text-blue-900">finally</span>
          </h1>
          <p className="text-gray-600 md:w-8/12 text-xl">
            TodoPro helps you capture and organize tasks, projects, and goals.
            Get insights into your productivity with advanced analytics and stay
            on top of what matters most.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <NavLink
            to="/todos"
            className="flex gap-2 items-center justify-center font-medium bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition"
          >
            Get Started Free <GoArrowRight />
          </NavLink>
          <button className="border border-gray-300 rounded-md py-3 px-6 font-medium hover:bg-green-700 hover:text-white transition">
            View Demo
          </button>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between mt-16 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center md:w-1/3 px-4"
            >
              <div
                className={`flex items-center ${feature.bgColor} px-3 py-3 rounded-md my-3`}
              >
                <feature.icon className={`text-3xl ${feature.textColor}`} />
              </div>
              <h1 className="font-medium my-2">{feature.title}</h1>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroScetion;
