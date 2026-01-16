import { ArrowRight } from 'lucide-react';
import React from 'react';

const PeopleHighlights = ({goToTab}) => {
  // Yeh aapka dynamic data hai (Aap isse API se bhi fetch kar sakte hain)
  const data = {
    connections: [
      { id: 1, name: 'Akash', img: 'https://i.pravatar.cc/150?u=1' },
      { id: 2, name: 'Shivanshu', img: 'https://i.pravatar.cc/150?u=2' },
      { id: 3, name: 'Javed', img: 'https://i.pravatar.cc/150?u=3' },
      { id: 4, name: 'Komal', img: 'https://i.pravatar.cc/150?u=4' },
      { id: 5, name: 'Rahul', img: 'https://i.pravatar.cc/150?u=5' },
      { id: 6, name: 'Sonia', img: 'https://i.pravatar.cc/150?u=6' },
      { id: 7, name: 'Amit', img: 'https://i.pravatar.cc/150?u=7' },
      { id: 8, name: 'Priya', img: 'https://i.pravatar.cc/150?u=8' },
    ],
    universityHighlight: {
      count: 1,
      universityName: "Awadesh Pratap Singh University, Rewa",
      user: {
        name: "Rupendra Vishwakarma",
        isSelf: true,
        image: "https://i.pravatar.cc/150?u=rupendra",
        headline: "Software Engineer | MERN Stack | React, Next.js, Node.js | Python & ML (Learning) | Aspiring AI Engineer"
      }
    }
  };

  // Logic for Connection names string
  const visibleConnections = data.connections.slice(0, 4);
  const othersCount = data.connections.length - visibleConnections.length;
  const namesString = visibleConnections.map(c => c.name).join(', ') + (othersCount > 0 ? ` & ${othersCount} others` : '');

  return (
    <div className="max-w-5xl pt-2  bg-white  rounded-xl  font-sans m-4">
      <h2 className="text-xl font-medium text-gray-900 mb-6">People highlights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 pb-4 gap-10">
        
        {/* Left Section: Dynamic Connections */}
        <div className="flex flex-col">
          <h3 className="text-[16px] font-bold text-gray-800 mb-3">
            {data.connections.length} Connections
          </h3>
          <div className="flex items-center -space-x-3 mb-3">
            {visibleConnections.map((person) => (
              <img
                key={person.id}
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
                src={person.img}
                alt={person.name}
              />
            ))}
            {othersCount > 0 && (
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white bg-gray-50 text-gray-600 text-sm font-medium">
                +{othersCount}
              </div>
            )}
          </div>
          <p className="text-gray-500 text-[14px]">
            {namesString}
          </p>
        </div>

        {/* Right Section: Dynamic University/User */}
        <div className="flex flex-col">
          <h3 className="text-[16px] font-bold text-gray-800 leading-snug mb-4">
            {data.universityHighlight.count} employee attended {data.universityHighlight.universityName}
          </h3>
          <div className="flex items-start gap-3">
            <img
              className="w-14 h-14 rounded-full object-cover border border-gray-100"
              src={data.universityHighlight.user.image}
              alt={data.universityHighlight.user.name}
            />
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900 text-[15px] hover:text-blue-700 hover:underline cursor-pointer">
                  {data.universityHighlight.user.name}
                </span>
                {data.universityHighlight.user.isSelf && (
                  <span className="text-gray-500 text-[14px]"> • You</span>
                )}
              </div>
              <p className="text-[14px] text-gray-600 leading-normal mt-0.5">
                {data.universityHighlight.user.headline}
              </p>
            </div>
          </div>
        </div>

      </div>

                <div className='text-center border-t  border-[#cccccc]'>
      <button
          onClick={goToTab}
          // Agar goToTab function hai toh use call kar
          className="inline-flex items-center pt-2 hover:cursor-pointer  gap-2 px-6 text-gray-500 font-semibold text-sm "
        >
          
        Show all poeple highlights  <ArrowRight size={16} />
        </button>
                </div>

    </div>
  );
};

export default PeopleHighlights;