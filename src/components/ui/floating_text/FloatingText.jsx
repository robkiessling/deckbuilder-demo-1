
import './FloatingText.scss'
import {useEffect, useState} from "react";

const OFFSET_RANGE = [10, 90]; // left %

export default function FloatingText({ floatingText, clearText }) {
  const [floatingTextEvents, setFloatingTextEvents] = useState([]);

  useEffect(() => {
    if (floatingText.length) {
      floatingText.forEach(text => {
        const id = Math.random().toString(36).substr(2, 9); // Unique ID for each damage event
        const leftPercent = Math.round(Math.random() * (OFFSET_RANGE[1] - OFFSET_RANGE[0]) + OFFSET_RANGE[0]);

        const newFloatingTextEvent = { id: id, type: text.type, text: text.text, leftPercent: `${leftPercent}%` }
        setFloatingTextEvents(prevEvents => [...prevEvents, newFloatingTextEvent]);
        setTimeout(() => {
          setFloatingTextEvents(prevEvents => prevEvents.filter((event) => event.id !== id));
        }, 2000); // 2 seconds delay for fade out
      })

      clearText();
    }
  }, [floatingText, clearText])


  return (
    <>
      {floatingTextEvents.map((event) => (
        <div key={event.id} className={`floating-text fade-out ${event.type}`}
             style={{left: event.leftPercent}}>
          {event.text}
        </div>
      ))}
    </>
  )
}