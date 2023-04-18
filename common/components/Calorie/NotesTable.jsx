import React from "react";
import CalendarNotes from "../Forms/CalendarNotes";

function NotesTable() {
  return (
    <div>
      <div className="grid w-32 h-20 rounded bg-primary text-primary-content place-content-center">
        <CalendarNotes/>
      </div>

    </div>
  );
}

export default NotesTable;
