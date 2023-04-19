import { useState } from "react";
import Calendar from "react-calendar";
import NotesTable from "./NotesTable";
import CalendarNotes from "../Forms/CalendarNotes";

function CalendarComponent({recipes,journal}) {
  const [date, setDate] = useState(new Date());
  const [popUp, setPopUp] = useState(false);
  
  return (
    <div className="flex justify-center card bg-slate-200 border-4 rounded-md h-fit">
      <div className="">
        <input type="checkbox" id="my-modal" className="modal-toggle " />
        <div className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg ">
              You've select notes from {date.toDateString()}
            </h3>
            <div className="flex flex-col justify-center items-center">
              <div className="w-fit">
                <div className="w-full h-fit rounded bg-primary text-secondary-content place-content-center">
                  <CalendarNotes journal={journal} date={date.toDateString()} />
                </div>
              </div>
            </div>

            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">
                Yay!
              </label>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center">React Calendar</h1>
      <div className="calendar-container">
        <Calendar  onChange={setDate} value={date} />
      </div>
      <div className="text-center">
        <span className="bold">Selected Date:</span> {date.toDateString()}
      </div>
      <label htmlFor="my-modal" className="btn">
        Open notes
      </label>
    </div>
  );
}

export default CalendarComponent;
