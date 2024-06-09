import { useRef, useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { get, ref, update, remove } from 'firebase/database';
import MiniCalendarStart from '../../components/calendarcrud/MiniCalendarStart';
import MiniCalendarEnd from '../../components/calendarcrud/MiniCalendarEnd';
import styled from 'styled-components';

interface ModalType {
  setModalOpen: (open: boolean) => void;
  eventId: string | null;
}

const UpdateModal = ({ setModalOpen, eventId }: ModalType) => {
  const [selectStartDay, setSelectStartDay] = useState<Date>();
  const [selectEndDay, setSelectEndDay] = useState<Date>();
  const [showMiniCalendarStart, setShowMiniCalendarStart] = useState(false);
  const [showMiniCalendarEnd, setShowMiniCalendarEnd] = useState(false);
  const [firstInputValue, setFirstInputValue] = useState('');
  const [secondInputValue, setSecondInputValue] = useState('');
  const [memoInputValue, setMemoInputValue] = useState('');
  const userId = auth.currentUser?.uid;

  const CompareDate = selectStartDay && selectEndDay && selectStartDay > selectEndDay;

  const modalRef = useRef<HTMLDivElement>(null);

  const clickOutSide = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalOpen(false);
    }
  };

  const updateClick = async () => {
    if (userId && eventId) {
      const eventRef = ref(db, `NewEvent/${userId}/${eventId}`);
      await update(eventRef, {
        firstInput: firstInputValue,
        secondInput: secondInputValue,
        memoInput: memoInputValue,
        startDate: selectStartDay
          ? `${selectStartDay.getFullYear()}. ${selectStartDay.getMonth() + 1}. ${selectStartDay.getDate()}.`
          : '시작 날짜',
        endDate: selectEndDay
          ? `${selectEndDay.getFullYear()}. ${selectEndDay.getMonth() + 1}. ${selectEndDay.getDate()}.`
          : '종료 날짜',
      });
      setModalOpen(false);
    }
  };

  const deleteClick = async () => {
    if (userId && eventId) {
      const deleteEventRef = ref(db, `NewEvent/${userId}/${eventId}`);
      await remove(deleteEventRef);
      setModalOpen(false);
    }
  };

  const startBtnClick = () => {
    setShowMiniCalendarStart(!showMiniCalendarStart);
    setShowMiniCalendarEnd(false);
  };

  const endBtnClick = () => {
    setShowMiniCalendarEnd(!showMiniCalendarEnd);
    setShowMiniCalendarStart(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutSide);
    return () => {
      document.removeEventListener('mousedown', clickOutSide);
    };
  });

  useEffect(() => {
    if (userId && eventId) {
      const fetchEventData = async () => {
        const eventRef = ref(db, `NewEvent/${userId}/${eventId}`);
        const snapshot = await get(eventRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFirstInputValue(data.firstInput || '');
          setSecondInputValue(data.secondInput || '');
          setMemoInputValue(data.memoInput || '');
          setSelectStartDay(data.startDate ? new Date(data.startDate) : undefined);
          setSelectEndDay(data.endDate ? new Date(data.endDate) : undefined);
        }
      };

      fetchEventData();
    }
  }, [eventId, userId]);

  return (
    <Backdrop>
      <ModalLayout>
        <ModalBox ref={modalRef}>
          <ModalBtn>
            <XBtn onClick={deleteClick}>삭제</XBtn>
            <NameBox>운동 일지</NameBox>
            <CreateBtn onClick={updateClick} disabled={CompareDate ?? undefined}>
              수정
            </CreateBtn>
          </ModalBtn>
          <FirstContext>운동</FirstContext>
          <FirstInput value={firstInputValue} onChange={(e) => setFirstInputValue(e.target.value)} placeholder="운동" />
          <SecondContext>횟수 / 세트</SecondContext>
          <SecondInput
            value={secondInputValue}
            onChange={(e) => setSecondInputValue(e.target.value)}
            placeholder="횟수 / 세트"
          />
          <ContextBox>
            <StartContext>시작 날짜</StartContext>
            <EndContext>종료 날짜</EndContext>
          </ContextBox>
          <DateInputRow>
            <StartInputBox>
              <StartInput
                placeholder={
                  selectStartDay
                    ? `${selectStartDay.getFullYear()}. ${selectStartDay.getMonth() + 1}. ${selectStartDay.getDate()}.`
                    : '시작 날짜'
                }
                disabled
              ></StartInput>
              <CalendarIconStart
                onClick={startBtnClick}
                viewBox="0 0 22 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_101_1442)">
                  <path
                    d="M7.46429 1.17857C7.46429 0.525446 6.93884 0 6.28571 0C5.63259 0 5.10714 0.525446 5.10714 1.17857V3.14286H3.14286C1.40938 3.14286 0 4.55223 0 6.28571V7.07143V9.42857V22C0 23.7335 1.40938 25.1429 3.14286 25.1429H18.8571C20.5906 25.1429 22 23.7335 22 22V9.42857V7.07143V6.28571C22 4.55223 20.5906 3.14286 18.8571 3.14286H16.8929V1.17857C16.8929 0.525446 16.3674 0 15.7143 0C15.0612 0 14.5357 0.525446 14.5357 1.17857V3.14286H7.46429V1.17857ZM2.35714 9.42857H19.6429V22C19.6429 22.4321 19.2893 22.7857 18.8571 22.7857H3.14286C2.71071 22.7857 2.35714 22.4321 2.35714 22V9.42857Z"
                    fill="#969696"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_101_1442">
                    <rect width="22" height="25.1429" fill="white" />
                  </clipPath>
                </defs>
              </CalendarIconStart>
              {showMiniCalendarStart && (
                <MiniCalendarStart onDayClick={setSelectStartDay} setMiniStartOpen={setShowMiniCalendarStart} />
              )}
            </StartInputBox>
            ~
            <EndInputBox>
              <EndInput
                placeholder={
                  selectEndDay
                    ? `${selectEndDay.getFullYear()}. ${selectEndDay.getMonth() + 1}. ${selectEndDay.getDate()}.`
                    : '종료 날짜'
                }
                style={CompareDate ? { textDecoration: 'line-through', color: 'red' } : {}}
                disabled
              />
              <CalendarIconEnd onClick={endBtnClick} viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_101_1442)">
                  <path
                    d="M7.46429 1.17857C7.46429 0.525446 6.93884 0 6.28571 0C5.63259 0 5.10714 0.525446 5.10714 1.17857V3.14286H3.14286C1.40938 3.14286 0 4.55223 0 6.28571V7.07143V9.42857V22C0 23.7335 1.40938 25.1429 3.14286 25.1429H18.8571C20.5906 25.1429 22 23.7335 22 22V9.42857V7.07143V6.28571C22 4.55223 20.5906 3.14286 18.8571 3.14286H16.8929V1.17857C16.8929 0.525446 16.3674 0 15.7143 0C15.0612 0 14.5357 0.525446 14.5357 1.17857V3.14286H7.46429V1.17857ZM2.35714 9.42857H19.6429V22C19.6429 22.4321 19.2893 22.7857 18.8571 22.7857H3.14286C2.71071 22.7857 2.35714 22.4321 2.35714 22V9.42857Z"
                    fill="#969696"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_101_1442">
                    <rect width="22" height="25.1429" fill="white" />
                  </clipPath>
                </defs>
              </CalendarIconEnd>
              {showMiniCalendarEnd && (
                <MiniCalendarEnd onDayClick={setSelectEndDay} setMiniEndOpen={setShowMiniCalendarEnd} />
              )}
            </EndInputBox>
          </DateInputRow>
          <MemoContext>메모</MemoContext>
          <MemoInput value={memoInputValue} onChange={(e) => setMemoInputValue(e.target.value)} placeholder="메모" />
        </ModalBox>
      </ModalLayout>
    </Backdrop>
  );
};

export default UpdateModal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const ModalLayout = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;
const ModalBox = styled.div`
  width: 35rem;
  height: 63rem;
  background-color: var(--color-white);
  overflow: hidden;
  border-radius: 1.5rem;
  margin-top: 18rem;
  margin-bottom: 18rem;
`;
const ModalBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;
const XBtn = styled.button`
  height: 3.2rem;
  margin: 3.6rem 0 0 2rem;
  padding: 0 1.6rem;
  z-index: 1000;
  cursor: pointer;
  border: var(--border-primary);
  border-radius: 0.5rem;
  color: var(--color-primary);
  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
`;
const CreateBtn = styled.button`
  height: 3.2rem;
  margin: 3.6rem 2rem 0 0;
  padding: 0 1.6rem;
  z-index: 1000;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  background-color: var(--color-primary);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-primary-dark);
  }
`;
const NameBox = styled.div`
  margin-top: 4rem;
  color: var(--color-black);
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
`;
const FirstContext = styled.div`
  margin: 3.5rem 0 0 2.5rem;
  font-size: 1.4rem;
`;
const FirstInput = styled.input`
  height: 3.4rem;
  margin: 0.7rem 0 0 2.3rem;
  padding-left: 1rem;
  width: 30.5rem;
  border: var(--border-gray);
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    border: var(--border-primary);
  }
`;
const SecondContext = styled.div`
  margin: 2.5rem 0 0 2.5rem;
  font-size: 1.4rem;
`;
const SecondInput = styled.input`
  height: 3.4rem;
  margin: 1.2rem 0 0 2.3rem;
  padding-left: 1rem;
  width: 30.5rem;
  border: var(--border-gray);
  border-radius: 0.5rem;

  &:focus {
    outline: none;
    border: var(--border-primary);
  }
`;
const ContextBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StartContext = styled.div`
  margin: 2.9rem 0 0 2.5rem;
  font-size: 1.4rem;
  width: 13.7rem;
`;
const EndContext = styled.div`
  margin: 2.9rem 2.1rem 0 0;
  font-size: 1.4rem;
  width: 13.7rem;
`;
const DateInputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30.5rem;
`;
const StartInputBox = styled.div`
  position: relative;
`;
const StartInput = styled.input`
  position: relative;
  height: 3.2rem;
  margin: 0.5rem 0.5rem 0.5rem 2.3rem;
  padding-left: 1.3rem;
  width: 14.2rem;
  border: var(--border-gray);
  border-radius: 0.5rem;
  background-color: var(--color-white);
`;
const CalendarIconStart = styled.svg`
  position: absolute;
  top: 1.1rem;
  right: 1.4rem;
  width: 1.8rem;
  height: 2rem;
  z-index: 200;
  cursor: pointer;
`;
const EndInputBox = styled.div`
  position: relative;
`;
const CalendarIconEnd = styled.svg`
  position: absolute;
  top: 1.1rem;
  right: 3.2rem;
  width: 1.8rem;
  height: 2rem;
  z-index: 200;
  cursor: pointer;
`;
const EndInput = styled.input`
  position: relative;
  height: 3.2rem;
  margin: 0.5rem 2.3rem 0.5rem 0.5rem;
  padding-left: 1.3rem;
  width: 14.2rem;
  border: var(--border-gray);
  border-radius: 0.5rem;
  background-color: var(--color-white);
`;
const MemoContext = styled.div`
  margin: 2.3rem 0 0 2.5rem;
  font-size: 1.4rem;
`;
const MemoInput = styled.textarea`
  width: 30.5rem;
  max-width: 30.5rem;
  min-width: 30.5rem;
  max-height: 18rem;
  min-height: 18rem;
  margin: 0.7rem 0 0 2.3rem;
  padding: 1.3rem 0 12rem 1.3rem;
  border: var(--border-gray);
  border-radius: 0.8rem;
  background-color: var(--color-white);
  scrollbar-width: none;

  &:focus {
    border: var(--border-primary);
  }
`;
