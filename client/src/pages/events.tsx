import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventForm from "@/components/event-form";
import EventList from "@/components/event-list";

export default function EventsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Calendar className="text-primary text-2xl mr-3" />
              <h1 className="text-xl font-semibold text-slate-900">EventHub</h1>
            </div>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-primary hover:bg-primary/90 text-white font-medium"
            >
              <span className="mr-2">+</span>
              Add Event
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Event Form */}
        {showForm && (
          <EventForm 
            onSuccess={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Events List */}
        <EventList />
      </main>
    </div>
  );
}
