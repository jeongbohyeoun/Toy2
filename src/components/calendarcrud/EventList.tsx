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

const colors = ['#FECACA', '#BFDBFE', '#A7F3D0', '#FDE68A', '#DDD6FE', '#FBCFE8'];

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
  const sortedEvents = [...events].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  const groupedEvents: { [date: string]: Event[] } = {};

  sortedEvents.forEach((event) => {
    let currentDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (!groupedEvents[dateStr]) {
        groupedEvents[dateStr] = [];
      }

      groupedEvents[dateStr].unshift(event);

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
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const renderedEventIds: Set<string> = new Set();
  const renderedMoreButtons: Set<string> = new Set();
  const [expandedDates] = useState<Set<string>>(new Set());

  const moreButtonClick = (events: Event[]) => {
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
                  <MoreEventsButton onClick={() => moreButtonClick(groupedEvents[date])} key={`more-${date}-${index}`}>
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
  border: 0.1rem solid var(--color-gray-lighter);
  border-radius: 0.4rem;
  margin: 0.3rem;
  padding: 0.5rem;
  color: var(--color-gray-dark);
  overflow: hidden;
  cursor: pointer;
  z-index: 1;

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
  background-color: var(--color-gray-lighter);
  border-radius: 0.4rem;
  margin: 0.3rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  top: -2.5rem;
  right: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-gray-light);
  }
`;
