import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Day {
  day: number;
  isCurrentMonth: boolean;
}

interface MiniCalendarStartType {
  onDayClick: (day: Date) => void;
  setMiniStartOpen: (open: boolean) => void;
}

const MiniCalendarStart = ({ onDayClick, setMiniStartOpen }: MiniCalendarStartType) => {
  const [date, setDate] = useState<Date>(new Date());
  const [, setSelectedDay] = useState<number | null>(null);
  const firstDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth: Day[] = [];

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    daysInMonth.push({ day: i, isCurrentMonth: true });
  }

  const Week: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  const BeforeMonthDate: Day[] = Array.from({ length: firstDayOfMonth.getDay() }, (_, i) => ({
    day: lastDayOfMonth.getDate() - i,
    isCurrentMonth: false,
  })).reverse();

  const AfterMonthDate = Array.from({ length: 6 - lastDayOfMonth.getDay() }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: false,
  }));

  useEffect(() => {
    const daysInMonth = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push({ day: i, isCurrentMonth: true });
    }
  }, [date]);

  const dayClick = (day: number) => {
    setSelectedDay(day);
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    onDayClick(selectedDate);
    setMiniStartOpen(false);
  };

  const prevMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };
  const nextMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <MiniLayout>
      <MiniCalendarBox>
        <MiniSwiperBox>
          <MiniLeftSwiperBtn onClick={prevMonth}>{'<'}</MiniLeftSwiperBtn>
          <MiniRightSwiperBtn onClick={nextMonth}>{'>'}</MiniRightSwiperBtn>
        </MiniSwiperBox>
        <MiniMonthYearBox>{`${date.getFullYear()}. ${months[date.getMonth()]}`}</MiniMonthYearBox>
        <MiniRightBox></MiniRightBox>

        {Week.map((day, index) => (
          <MiniWeekBox key={index}>{day}</MiniWeekBox>
        ))}
        {BeforeMonthDate.map((dayObj, index) => {
          const MiniDay = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
          return <MiniDay key={`start-${index}`}>{dayObj.day}</MiniDay>;
        })}
        {daysInMonth.map((dayObj, index) => {
          const MiniDay = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
          return (
            <MiniDay onClick={() => dayClick(dayObj.day)} key={index}>
              {dayObj.day}
            </MiniDay>
          );
        })}
        {AfterMonthDate.map((dayObj, index) => {
          const MiniDay = dayObj.isCurrentMonth ? CurrentMonthDay : OtherMonthDay;
          return <MiniDay key={`end-${index}`}>{dayObj.day}</MiniDay>;
        })}
      </MiniCalendarBox>
    </MiniLayout>
  );
};

export default MiniCalendarStart;

const MiniLayout = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;
const MiniCalendarBox = styled.div`
  position: absolute;
  left: 0.8rem;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 23rem;
  margin: 0.03rem 0 0 1.5rem;
  padding: 0 1rem 2rem;
  border-radius: 0.8rem;
  border: 0.1rem solid var(--color-gray-light);
  background-color: var(--color-white);
`;
const MiniSwiperBox = styled.div`
  grid-column: 1 / 2;
  display: flex;
  justify-content: space-between;
`;
const MiniLeftSwiperBtn = styled.button`
  padding: 0 0.5rem;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  color: var(--color-gray);
`;
const MiniRightSwiperBtn = styled.button`
  padding: 0 0.5rem;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  color: var(--color-gray);
`;
const MiniMonthYearBox = styled.div`
  grid-column: 3 / 6;
  height: 3rem;
  margin-top: 1.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
`;
const MiniRightBox = styled.div`
  grid-column: 6 / 8;
  display: flex;
  justify-content: flex-end;
`;
const MiniWeekBox = styled.div`
  padding: 0.05rem;
  font-family: 'Inter-Medium', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  background-color: var(--color-white);
`;
const MiniDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  font-size: 1.2rem;

  &:hover {
    border-radius: 0.4rem;
    color: var(--color-white);
    background-color: var(--color-primary);
  }
`;
const CurrentMonthDay = styled(MiniDay)`
  color: var(--color-black);
  background-color: white;
`;
const OtherMonthDay = styled(MiniDay)`
  color: var(--color-gray-light);

  &:hover {
    color: var(--color-gray-light);
    background-color: var(--color-white);
    border: 0.1rem solid var(--color-white);
  }
`;
