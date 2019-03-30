import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment"; // or globalizeLocalizer

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.css";

const localizer = BigCalendar.momentLocalizer(moment);

export default function Calendar({dates, onSelectEvent}) {
  if (dates) {
    const events = dates
            .map((item, index) => ({
              id: index,
              title: `${item.title}`,
              allDay: true,
              start: new Date(item.due),
              end: new Date(item.due)
            }));
    console.log(events);
    return (
      <div style={{"padding": "0px 20px",
        "overflow": "scroll",
        "height":"90%"}}>
        <BigCalendar
          localizer={localizer}
          events={events}
          defaultDate={new Date()}
          showMultiDayTimes
          startAccessor="start"
          onSelectEvent={onSelectEvent}
          //   views={["month"]}
        />
      </div>
    );
  }
  return "Loading...";
}