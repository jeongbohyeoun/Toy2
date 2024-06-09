import { useRef, useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { ref, set, push } from 'firebase/database';
import Button from '../Button';
import CalendarIcon from '../../assets/images/icon-calendar.svg';
import MiniCalendarStart from '../../components/calendarcrud/MiniCalendarStart';
import MiniCalendarEnd from '../../components/calendarcrud/MiniCalendarEnd';
import styled from 'styled-components';

interface ModalType {
  setModalOpen: (open: boolean) => void;
  startDate: Date;
}

const Modal = ({ setModalOpen, startDate }: ModalType) => {
  const Today = startDate.toLocaleDateString();
  const [selectStartDay, setSelectStartDay] = useState<Date>(startDate);
  const [selectEndDay, setSelectEndDay] = useState<Date>(startDate);
  const [showMiniCalendarStart, setShowMiniCalendarStart] = useState(false);
  const [showMiniCalendarEnd, setShowMiniCalendarEnd] = useState(false);
  const [firstInputValue, setFirstInputValue] = useState('');
  const [secondInputValue, setSecondInputValue] = useState('');
  const [memoInputValue, setMemoInputValue] = useState('');

  const CompareDate = selectStartDay && selectEndDay && selectStartDay > selectEndDay;

  const modalRef = useRef<HTMLDivElement>(null);

  const clickOutSide = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutSide);
    return () => {
      document.removeEventListener('mousedown', clickOutSide);
    };
  });

  const closeModal = () => {
    setModalOpen(false);
    setSelectStartDay(startDate);
    setSelectEndDay(startDate);
  };

  const createClick = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error('사용자 정보가 없습니다.');
      }

      if (userId) {
        const newEventRef = push(ref(db, `NewEvent/${userId}`));
        const id = newEventRef.key;
        await set(newEventRef, {
          id,
          firstInput: firstInputValue,
          secondInput: secondInputValue,
          memoInput: memoInputValue,
          startDate: selectStartDay
            ? `${selectStartDay.getFullYear()}. ${selectStartDay.getMonth() + 1}. ${selectStartDay.getDate()}.`
            : Today,
          endDate: selectEndDay
            ? `${selectEndDay.getFullYear()}. ${selectEndDay.getMonth() + 1}. ${selectEndDay.getDate()}.`
            : Today,
        });
        setModalOpen(false);
      }
    } catch (error) {
      console.error(error);
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

  return (
    <Backdrop>
      <ModalLayout>
        <ModalBox ref={modalRef}>
          <ModalBtn>
            <XBtn mode="white" onClick={() => closeModal()}>
              취소
            </XBtn>
            <NameBox>운동 일지</NameBox>
            <CreateBtn onClick={createClick} disabled={CompareDate ?? undefined}>
              추가
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
                    : Today
                }
                disabled
              ></StartInput>
              <CalendarIconStart onClick={startBtnClick} />
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
                    : Today
                }
                style={CompareDate ? { textDecoration: 'line-through', color: 'red' } : {}}
                disabled
              />
              <CalendarIconEnd onClick={endBtnClick} />
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

export default Modal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  margin-top: 18rem;
  margin-bottom: 18rem;
  overflow: hidden;
  border-radius: 1.5rem;
  background-color: var(--color-white);
`;
const ModalBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;
const XBtn = styled(Button)`
  height: 3.2rem;
  margin: 3.6rem 0 0 2rem;
  padding: 0 1.6rem;
  cursor: pointer;
`;
const CreateBtn = styled(Button)`
  height: 3.2rem;
  margin: 3.6rem 2rem 0 0;
  padding: 0 1.6rem;
`;
const NameBox = styled.div`
  margin-top: 4rem;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-black);
`;
const FirstContext = styled.div`
  margin: 3.5rem 0 0 2.5rem;
  font-size: 1.4rem;
`;
const FirstInput = styled.input`
  width: 30.5rem;
  height: 3.4rem;
  margin: 0.7rem 0 0 2.3rem;
  padding-left: 1rem;
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
  width: 30.5rem;
  height: 3.4rem;
  margin: 1.2rem 0 0 2.3rem;
  padding-left: 1rem;
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
  width: 13.7rem;
  margin: 2.9rem 0 0 2.5rem;
  font-size: 1.4rem;
`;
const EndContext = styled.div`
  width: 13.7rem;
  margin: 2.9rem 2.1rem 0 0;
  font-size: 1.4rem;
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
  width: 14.2rem;
  height: 3.2rem;
  margin: 0.5rem 0.5rem 0.5rem 2.3rem;
  padding-left: 1.3rem;
  border: var(--border-gray);
  border-radius: 0.5rem;
  background-color: var(--color-white);
`;
const CalendarIconStart = styled.div`
  position: absolute;
  top: 1.1rem;
  right: 1.4rem;
  width: 1.8rem;
  height: 2rem;
  cursor: pointer;
  background: url(${CalendarIcon}) no-repeat center / contain;
  z-index: 200;
`;
const EndInputBox = styled.div`
  position: relative;
`;
const CalendarIconEnd = styled.div`
  position: absolute;
  top: 1.1rem;
  right: 3.2rem;
  width: 1.8rem;
  height: 2rem;
  cursor: pointer;
  background: url(${CalendarIcon}) no-repeat center / contain;
  z-index: 200;
`;
const EndInput = styled.input`
  position: relative;
  width: 14.2rem;
  height: 3.2rem;
  margin: 0.5rem 2.3rem 0.5rem 0.5rem;
  padding-left: 1.3rem;
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
