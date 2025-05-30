import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { Event } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";

export default function EventList() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const formatEventDate = (date: string) => {
    return format(new Date(date), "MMMM d, yyyy");
  };

  const formatEventTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, "h:mm a");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Upcoming Events</h2>
            <p className="text-gray-600 mt-1">Loading events...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="h-16 bg-gray-200 rounded mt-4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12">
        <Card className="p-12">
          <Calendar className="mx-auto h-16 w-16 text-gray-300 mb-6" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No events yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first event</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Upcoming Events</h2>
          <p className="text-gray-600 mt-1">Showing {events.length} upcoming events</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>📅</span>
          <span>Sorted by date</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.name}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{formatEventDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{formatEventTime(event.time)}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium">
                  Upcoming
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {event.description || "No description provided"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
