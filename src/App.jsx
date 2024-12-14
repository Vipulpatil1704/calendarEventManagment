
import './App.css';
import dayjs from 'dayjs'
import { getMonth } from './utilites/Utils';
import { useContext, useEffect, useState } from 'react';
import Month from './components/Month';
import CalendarHeader from './components/CalendarHeader';
import GlobalContext from './context/GlobalContext';
import DialogBox from './components/DialogBox';
import EventUpdateModal from './components/EventUpdateModal'
function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, weekIndex, showUpdateEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex])
  return (
    <div className="min-h-full w-full">
      <DialogBox isOpen={showEventModal} />
      <EventUpdateModal isOpen={showUpdateEventModal} />
      <div className="h-screen flex flex-col w-100">
        <CalendarHeader />
        <div className="flex flex-1">
          <Month month={currentMonth} />
        </div>
      </div>
    </div>
  );
}

export default App;
