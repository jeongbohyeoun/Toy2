import { useState } from 'react';
import styled from 'styled-components';
import MiniModal from '../../components/calendarcrud/MiniModal';

interface Event {
  id: string;
  endDate: string;
  firstInput: string;
  memoInput: string;
  secondInput: string;
  startDate: string;
}

interface EventListProps {
  events: Event[];
  setSelectedEventId: (id: string) => void;
  setUpdateModalOpen: (open: boolean) => void;
}

const colors = ['#FFB6C1', '#ADD8E6', '#90EE90', '#FFD700', '#FF6347', '#13879b'];

const colorMap: { [key: string]: string } = {};

const getColorForEventId = (eventId: string): string => {
  if (!colorMap[eventId]) {
    const colorIndex = Object.keys(colorMap).length % colors.length;
    colorMap[eventId] = colors[colorIndex];
  }
  return colorMap[eventId];
};

const sortEventsByDate = (events: Event[]) => {
  return [...events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
};

const groupEventsByDate = (events: Event[]) => {
  const groupedEvents: { [date: string]: Event[] } = {};

  events.forEach((event) => {
    let currentDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (!groupedEvents[dateStr]) {
        groupedEvents[dateStr] = [];
      }
      groupedEvents[dateStr].push(event);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return groupedEvents;
};

const EventList = ({ events, setSelectedEventId, setUpdateModalOpen }: EventListProps) => {
  const sortedEvents = sortEventsByDate(events);
  const groupedEvents = groupEventsByDate(sortedEvents);

  const handleEventClick = (event: Event) => {
    if (event.id) {
      setSelectedEventId(event.id);
      setUpdateModalOpen(true);
    }
  };

  const [MiniModalOpen, setMiniModalOpen] = useState<boolean>(false);
  const [, setModalPosition] = useState({ x: 0, y: 0 });
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const renderedEventIds: Set<string> = new Set();
  const renderedMoreButtons: Set<string> = new Set();
  const [expandedDates] = useState<Set<string>>(new Set());

  const moreButtonClick = (events: Event[], event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({ x: rect.left, y: rect.top + window.scrollY });
    setSelectedEvents(events);
    setMiniModalOpen(true);
  };

  return (
    <EventListContainer>
      {Object.keys(groupedEvents).map((date) => (
        <DateGroup key={date}>
          {groupedEvents[date].map((event, index) => {
            if (!renderedMoreButtons.has(event.id)) {
              renderedMoreButtons.add(event.id);
              if (groupedEvents[date].length > 3 && !expandedDates.has(date)) {
                return (
                  <MoreEventsButton
                    onClick={(e) => moreButtonClick(groupedEvents[date], e)}
                    key={`more-${date}-${index}`}
                  >
                    {`+${groupedEvents[date].length - 3} more`}
                    {MiniModalOpen && (
                      <MiniModal
                        setMiniModalOpen={setMiniModalOpen}
                        events={selectedEvents}
                        getColorForEventId={getColorForEventId}
                        handleEventClick={handleEventClick}
                      />
                    )}
                  </MoreEventsButton>
                );
              }
            }
            return null;
          })}
          {groupedEvents[date].map((event, index) => {
            if (!renderedEventIds.has(event.id)) {
              renderedEventIds.add(event.id);
              if (index < 3 || expandedDates.has(date)) {
                return (
                  <EventItem
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    color={getColorForEventId(event.id)}
                  >
                    <EventTitle>{event.firstInput}</EventTitle>
                    <EventDescription>{event.memoInput}</EventDescription>
                    <EventDetail>횟수/세트: {event.secondInput}</EventDetail>
                  </EventItem>
                );
              }
            }
            return null;
          })}
        </DateGroup>
      ))}
    </EventListContainer>
  );
};

export default EventList;

const EventListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  left: -0.5rem;
  width: 105%;
`;

const DateGroup = styled.div`
  position: relative;
`;

const EventItem = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  border: 1px solid var(--color-gray-lighter);
  border-radius: 0.4rem;
  margin: 0.3rem;
  padding: 0.5rem;
  color: var(--color-gray-dark);
  overflow: hidden;
  cursor: pointer;

  &:hover {
    height: auto;
  }
`;

const EventTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const EventDescription = styled.div`
  font-size: 1rem;
  color: var(--color-gray);
  display: none;
  ${EventItem}:hover & {
    display: block;
  }
`;

const EventDetail = styled.div`
  font-size: 0.8rem;
  color: var(--color-gray);
  display: none;
  ${EventItem}:hover & {
    display: block;
  }
`;

const MoreEventsButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin: 3px 0;
  padding: 5px;
  font-size: 10px;
  cursor: pointer;
  position: absolute;
  top: -25px;
  right: 5px;
`;
