import { useRef, useEffect } from 'react';
import styled from 'styled-components';

interface Event {
  id: string;
  endDate: string;
  firstInput: string;
  memoInput: string;
  secondInput: string;
  startDate: string;
}

interface MiniModalProps {
  setMiniModalOpen: (open: boolean) => void;
  getColorForEventId: (eventId: string) => string;
  handleEventClick: (event: Event) => void;
  events: Event[];
}

const MiniModal = ({ setMiniModalOpen, events, getColorForEventId, handleEventClick }: MiniModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setMiniModalOpen(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [setMiniModalOpen]);

  const closeModal = () => {
    setMiniModalOpen(false);
  };

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <ModalBox
      ref={modalRef}
      onClick={stopPropagation}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      <ModalBtn>
        <CloseBtn onClick={closeModal}>취소</CloseBtn>
      </ModalBtn>
      <ContentBox>
        {events.map((event) => (
          <EventItemContainer key={event.id}>
            <EventItem onClick={() => handleEventClick(event)} color={getColorForEventId(event.id)}>
              <EventTitle>{event.firstInput}</EventTitle>
              <EventDescription>{event.memoInput}</EventDescription>
              <EventDetail>횟수/세트: {event.secondInput}</EventDetail>
            </EventItem>
          </EventItemContainer>
        ))}
      </ContentBox>
    </ModalBox>
  );
};

export default MiniModal;

const ModalBox = styled.div`
  position: absolute;
  width: 20rem;
  height: auto;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 900;
`;

const ModalBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
`;

const CloseBtn = styled.div`
  background: none;
  border: none;
  color: red;
  font-size: 1.2rem;
  cursor: pointer;
`;

const ContentBox = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
`;

const EventItemContainer = styled.div`
  cursor: pointer;
`;

const EventItem = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  border: 1px solid var(--color-gray-lighter);
  border-radius: 0.4rem;
  margin: 0.3rem;
  padding: 0.5rem;
  color: var(--color-gray-dark);
  overflow: hidden;
  width: 17rem;
  height: 5rem;
`;

const EventTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const EventDescription = styled.div`
  font-size: 1rem;
  color: var(--color-gray);
`;

const EventDetail = styled.div`
  font-size: 0.8rem;
  color: var(--color-gray);
`;
