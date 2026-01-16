// components/community/tabs/EventsTab.js
import { useState } from "react";

export default function EventsTab({ community, isMember }) {
  const [view, setView] = useState("list");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock events data
  const mockEvents = [
    {
      id: "1",
      title: "React Workshop",
      type: "workshop",
      description: "Learn React fundamentals with hands-on coding",
      date: "2024-02-15",
      time: "14:00",
      duration: "2 hours",
      organizer: "John Doe",
      attendees: 23,
      maxAttendees: 30,
      status: "upcoming"
    },
    {
      id: "2",
      title: "Mock Interviews",
      type: "mock_interview",
      description: "Practice technical interviews with peers",
      date: "2024-02-20",
      time: "10:00",
      duration: "3 hours",
      organizer: "Jane Smith",
      attendees: 15,
      maxAttendees: 20,
      status: "upcoming"
    },
    {
      id: "3",
      title: "Study Session - Algorithms",
      type: "study_session",
      description: "Group study session for algorithm practice",
      date: "2024-02-12",
      time: "16:00",
      duration: "2 hours",
      organizer: "Mike Johnson",
      attendees: 18,
      maxAttendees: 25,
      status: "upcoming"
    }
  ];

  const getEventTypeIcon = (type) => {
    const icons = {
      workshop: "🛠️",
      mock_interview: "💼",
      study_session: "📚",
      coding_competition: "💻",
      webinar: "🎤",
      social: "🎉"
    };
    return icons[type] || "📅";
  };

  const getEventTypeColor = (type) => {
    const colors = {
      workshop: "bg-purple-100 text-purple-800",
      mock_interview: "bg-blue-100 text-blue-800",
      study_session: "bg-green-100 text-green-800",
      coding_competition: "bg-orange-100 text-orange-800",
      webinar: "bg-red-100 text-red-800",
      social: "bg-pink-100 text-pink-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Community Events</h2>
            <p className="text-gray-600 mt-1">Join upcoming events and activities</p>
          </div>
          
          <div className="flex gap-3">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView("list")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                List
              </button>
              <button
                onClick={() => setView("calendar")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === "calendar" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Calendar
              </button>
            </div>

            {isMember && (
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Create Event
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Events List */}
      {view === "list" && (
        <div className="space-y-4">
          {mockEvents.map(event => (
            <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Event Date */}
                <div className="flex-shrink-0 text-center lg:text-left">
                  <div className="w-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-3 text-white">
                    <div className="text-2xl font-bold">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-sm">
                      {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
                          {getEventTypeIcon(event.type)} {event.type.replace('_', ' ')}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {event.time} • {event.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">
                        {event.attendees}/{event.maxAttendees} attending
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Organized by {event.organizer}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        Details
                      </button>
                      {isMember && (
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          RSVP
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calendar View */}
      {view === "calendar" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar View</h3>
            <p className="text-gray-600">Calendar feature coming soon!</p>
          </div>
        </div>
      )}

      {mockEvents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📅</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No events scheduled</h3>
          <p className="text-gray-600 mb-4">Be the first to create an event for the community!</p>
          {isMember && (
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Create First Event
            </button>
          )}
        </div>
      )}
    </div>
  );
}