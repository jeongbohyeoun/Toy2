import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../components/calendarcrud/Modal';
import UpdateModal from '../components/calendarcrud/UpdateModal';
import Button from '../components/Button';
import Layout from '@/components/layout/Layout';
import { db, auth } from '../firebase';
import { ref, onValue } from 'firebase/database';
import EventList from '../components/calendarcrud/EventList';
import { device } from '@/styles/media';

interface Day {
  day: number;
  isCurrentMonth: boolean;
}

interface Event {
  id: string;
  endDate: string;
  firstInput: string;
  memoInput: string;
  secondInput: string;
  startDate: string;
}

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [, setSelectedDate] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const userId = auth.currentUser?.uid;
  const today = new Date();
  const firstDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth: Day[] = [];

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    daysInMonth.push({ day: i, isCurrentMonth: true });
  }

  const week: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  const BeforeMonthDate: Day[] = Array.from({ length: firstDayOfMonth.getDay() }, (_, i) => ({
    day: lastDayOfMonth.getDate() - i,
    isCurrentMonth: false,
  })).reverse();

  const AfterMonthDate = Array.from({ length: 6 - lastDayOfMonth.getDay() }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: false,
  }));

  const prevMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const nextMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const newEventClick = (): void => {
    setModalOpen(true);
    setStartDate(new Date());
  };

  const dayClick = (day: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      const clickedDate = new Date(date.getFullYear(), date.getMonth(), day);
      const eventsForDate = getEventsForDate(`${date.getFullYear()}. ${date.getMonth() + 1}. ${day}.`);
      if (eventsForDate.length > 0) {
        return;
      }
      setModalOpen(true);
      setStartDate(clickedDate);
      setSelectedDate(`${date.getFullYear()}. ${date.getMonth() + 1}. ${day}.`);
    }
  };

  const eventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setUpdateModalOpen(true);
  };

  const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [data, setData] = useState<{ [key: string]: Event }>({});

  useEffect(() => {
    if (userId) {
      const dataRef = ref(db, `NewEvent/${userId}`);

      const unsubscribe = onValue(dataRef, (snapshot) => {
        const fetchedData = snapshot.val();
        setData(fetchedData);
      });

      return () => unsubscribe();
    }
  }, [userId]);

  const getDatesBetween = (start: Date, end: Date) => {
    let dates: Date[] = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
  };

  const getEventsForDate = (dateStr: string) => {
    if (!data) {
      return [];
    }

    return Object.values(data).filter((event) => {
      const eventDates = getDatesBetween(new Date(event.startDate), new Date(event.endDate));
      return eventDates.some((eventDate) => formatDate(eventDate) === dateStr);
    });
  };

  return (
    <Layout>
      <Row>
        <CalendarBox>
          <SwiperBox>
            <LeftSwiperBtn onClick={prevMonth}>
              <LeftIcon viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.43937 14.5447C3.85354 15.1369 3.85354 16.0986 4.43937 16.6908L13.4376 25.7866C14.0234 26.3788 14.9748 26.3788 15.5606 25.7866C16.1465 25.1945 16.1465 24.2328 15.5606 23.6406L7.62156 15.6154L15.5559 7.59019C16.1418 6.99801 16.1418 6.03631 15.5559 5.44413C14.9701 4.85196 14.0187 4.85196 13.4329 5.44413L4.43468 14.54L4.43937 14.5447Z"
                  fill="#4CD964"
                />
              </LeftIcon>
            </LeftSwiperBtn>
            <RightSwiperBtn onClick={nextMonth}>
              <RightIcon viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.5606 14.5447C16.1465 15.1369 16.1465 16.0986 15.5606 16.6908L6.56239 25.7866C5.97657 26.3788 5.02519 26.3788 4.43937 25.7866C3.85354 25.1945 3.85354 24.2328 4.43937 23.6406L12.3784 15.6154L4.44405 7.59019C3.85823 6.99801 3.85823 6.03631 4.44405 5.44413C5.02988 4.85196 5.98125 4.85196 6.56708 5.44413L15.5653 14.54L15.5606 14.5447Z"
                  fill="#4CD964"
                />
              </RightIcon>
            </RightSwiperBtn>
          </SwiperBox>
          <TodayButton onClick={() => setDate(new Date())}>오늘</TodayButton>
          <MonthYearBox>{`${date.getFullYear()}. ${months[date.getMonth()]}`}</MonthYearBox>
          <EventRow>
            <EventBtn onClick={newEventClick}>운동 추가</EventBtn>
          </EventRow>
          {ModalOpen && <Modal setModalOpen={setModalOpen} startDate={startDate} />}
          {updateModalOpen && <UpdateModal setModalOpen={setUpdateModalOpen} eventId={selectedEventId} />}
          {week.map((day, index) => (
            <WeekBox key={index}>{day}</WeekBox>
          ))}
          {BeforeMonthDate.map((dayObj, index) => {
            const Day = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
            return <Day key={`start-${index}`}>{dayObj.day}</Day>;
          })}
          {daysInMonth.map((dayObj, index) => {
            const isToday =
              dayObj.day === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();
            const Day = dayObj.isCurrentMonth ? (isToday ? TodayDay : CurrentMonthDay) : OtherMonthDay;
            return (
              <Day key={index} onClick={() => dayClick(dayObj.day, dayObj.isCurrentMonth)}>
                {dayObj.day}
                <EventList
                  events={getEventsForDate(`${date.getFullYear()}. ${date.getMonth() + 1}. ${dayObj.day}.`)}
                  setSelectedEventId={eventClick}
                  setUpdateModalOpen={setUpdateModalOpen}
                />
              </Day>
            );
          })}
          {AfterMonthDate.map((dayObj, index) => {
            const Day = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
            return <Day key={`end-${index}`}>{dayObj.day}</Day>;
          })}
        </CalendarBox>
      </Row>
    </Layout>
  );
};

export default Calendar;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;
const CalendarBox = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
const SwiperBox = styled.div`
  grid-column: 1 / 2;
  position: relative;
  display: flex;
  gap: 1rem;
`;
const LeftSwiperBtn = styled.button`
  position: relative;
  width: 3.3rem;
  height: 3.3rem;
  padding: 0.08rem 1.6rem;
  color: var(--color-primary);
  font-size: 4rem;
  border: 0.1rem solid var(--color-primary);
  border-radius: 0.5rem;
  cursor: pointer;
`;
const RightSwiperBtn = styled.button`
  position: relative;
  width: 3.3rem;
  height: 3.3rem;
  padding: 0.08rem 1.6rem;
  color: var(--color-primary);
  font-size: 4rem;
  border: 1px solid var(--color-primary);
  border-radius: 0.5rem;
  cursor: pointer;
`;
const LeftIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2rem;
  height: 2.7rem;
`;
const RightIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2rem;
  height: 2.7rem;
`;
const MonthYearBox = styled.div`
  grid-column: 3 / 6;
  height: 6rem;
  color: var(--color-gray-dark);
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
`;
const EventRow = styled.div`
  grid-column: 6 / 8;
  display: flex;
  justify-content: flex-end;
`;
const EventBtn = styled(Button)`
  width: 9rem;
  height: 3.5rem;
  padding: 0 0.3rem;
`;
const WeekBox = styled.div`
  padding: 0.6rem 0;
  color: var(--color-white);
  background-color: var(--color-primary);
  font-family: 'Inter-Medium', sans-serif;
  font-size: 1.6rem;
  outline: 0.1rem solid var(--color-gray-lighter);
  text-align: center;
`;
const Day = styled.div`
  width: 12.2rem;
  height: 12.8rem;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  outline: 0.1rem solid var(--color-gray-lighter);
  text-align: left;
  color: var(--color-gray-dark);
  cursor: pointer;

  &:hover {
    border: 0.2rem solid var(--color-primary);
    offset: -0.2rem;
  }

  @media ${device.desktop} {
    width: 10rem;
    height: 12rem;
  }

  @media ${device.tablet} {
    width: 7rem;
    height: 10rem;
  }

  @media ${device.mobile} {
    width: 100%;
    height: 8rem;
  }
`;
const CurrentMonthDay = styled(Day)`
  color: var(--color-gray-dark);
  background-color: var(--color-white);
`;
const OtherMonthDay = styled(Day)`
  color: var(--color-gray-light);
  background-color: var(--color-white);
  &:hover {
    border: none;
    cursor: default;
  }
`;
const TodayDay = styled(CurrentMonthDay)`
  color: var(--color-primary);
  font-weight: 600;
`;

const TodayButton = styled(Button)`
  width: 6rem;
  height: 3.5rem;
  padding: 0 0.03rem;

  @media ${device.tablet} {
    margin-left: 1rem;
  }
`;
