// Features.jsx
import React from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { AiOutlineSchedule } from "react-icons/ai";
import {
  MdCategory,
  MdNotificationsActive,
  MdAccessTime,
} from "react-icons/md";
import { BiLineChart } from "react-icons/bi";

const Features = () => {
  const cards = [
    {
      title: "Smart Scheduling",
      desc: "Set due dates and get intelligent reminders to stay on track with your deadlines.",
      icon: AiOutlineSchedule,
      bgColor: "bg-blue-100/50",
      textColor: "text-blue-900",
    },
    {
      title: "Category Management",
      desc: "Organize tasks with custom categories and tags for better project management.",
      icon: MdCategory,
      bgColor: "bg-green-100/50",
      textColor: "text-green-900",
    },
    {
      title: "Progress Tracking",
      desc: "Visualize your productivity with charts and completion statistics over time.",
      icon: BiLineChart,
      bgColor: "bg-purple-100/50",
      textColor: "text-purple-900",
    },
    {
      title: "Priority Levels",
      desc: "Set task priorities to focus on what matters most and maximize your efficiency.",
      icon: IoMdCheckboxOutline,
      bgColor: "bg-red-100/50",
      textColor: "text-red-900",
    },
    {
      title: "Smart Notifications",
      desc: "Get notified about upcoming deadlines and overdue tasks automatically.",
      icon: MdNotificationsActive,
      bgColor: "bg-yellow-100/50",
      textColor: "text-yellow-900",
    },
    {
      title: "Time Management",
      desc: "Track time spent on tasks and identify areas for productivity improvement.",
      icon: MdAccessTime,
      bgColor: "bg-teal-100/50",
      textColor: "text-teal-900",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-screen-lg mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Everything you need to stay productive
        </h2>
        <p className="text-gray-600 md:w-8/12 mx-auto text-lg">
          TodoPro combines powerful task management with insightful analytics to
          help you achieve more every day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-start gap-4 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-md ${card.bgColor}`}
              >
                <IconComponent className={`text-2xl ${card.textColor}`} />
              </div>
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
