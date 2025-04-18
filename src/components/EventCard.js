import React from 'react';
import { PortableText } from '@portabletext/react';
import styles from '../styles/EventCard.module.css';

function EventCard({ event, onToggleExpand, isExpanded }) {
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
  };

  const getCurrencySymbol = (currencyCode) => {
    switch(currencyCode) {
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'USD': return '$';
      case 'CAD': return 'C$';
      case 'AUD': return 'A$';
      case 'JPY': return '¥';
      case 'CHF': return 'Fr';
      default: return currencyCode;
    }
  };

  // Use either _id or id property
  const eventId = event._id || event.id;

  return (
    <div className={styles.eventItem}>
      <div 
        className={styles.eventRow} 
        onClick={() => onToggleExpand(eventId)}
      >
        <div className={styles.posterThumb}>
          {event.poster_url && (
            <img src={event.poster_url} alt={event.name} />
          )}
        </div>
        <div className={styles.eventInfo}>
          <h3 className={styles.eventName}>{event.name}</h3>
          {event.venue_name && (
            <div className={styles.eventMeta}>
              <span className={styles.venueText}>
                {event.venue_name}
              </span>
            </div>
          )}
          <div className={styles.eventTimes}>
            {formatTime(event.start_time)}
            {event.end_time && ` - ${formatTime(event.end_time)}`}
          </div>
          {event.lineup && event.lineup.length > 0 && (
            <div className={styles.lineupPreview}>
              {event.lineup.join(' • ')}
            </div>
          )}
        </div>
        
        <div className={styles.actionArea}>
          {event.price && (
            <span className={styles.priceTag}>
              {getCurrencySymbol(event.currency)}{event.price}
            </span>
          )}
          
          {event.ticket_status === 'Sold Out' ? (
            <span className={styles.soldOutTag}>SOLD OUT</span>
          ) : event.ticket_status === 'Sold At Door' ? (
            <span className={styles.soldAtDoorTag}>SOLD AT DOOR</span>
          ) : event.ticket_link ? (
            <a 
              href={event.ticket_link} 
              className={styles.ticketBtn}
              onClick={(e) => e.stopPropagation()}
              target="_blank" 
              rel="noopener noreferrer"
            >
              TICKETS
            </a>
          ) : null}
        </div>
      </div>
      
      {isExpanded && (
        <div className={styles.expandedContent}>
          <div className={styles.expandedGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.timeBlock}>
                <div className={styles.blockLabel}>TIME</div>
                <div className={styles.blockText}>
                  {formatTime(event.start_time)}
                  {event.end_time && ` - ${formatTime(event.end_time)}`}
                </div>
              </div>
              
              {event.address && (
                <div className={styles.addressBlock}>
                  <div className={styles.blockLabel}>LOCATION</div>
                  <div className={styles.blockText}>{event.address}</div>
                </div>
              )}
              
              {event.lineup && event.lineup.length > 0 && (
                <div className={styles.lineupBlock}>
                  <div className={styles.blockLabel}>LINEUP</div>
                  <div className={styles.lineupList}>
                    {event.lineup.map((artist, i) => (
                      <span key={i} className={styles.lineupArtist}>{artist}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {event.genres && event.genres.length > 0 && (
                <div className={styles.genreBlock}>
                  <div className={styles.blockLabel}>GENRES</div>
                  <div className={styles.genreList}>
                    {event.genres.map((genre, i) => (
                      <span key={i} className={styles.genreTag}>{genre}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {event.description && (
                <div className={styles.descriptionBlock}>
                  <div className={styles.blockLabel}>ABOUT</div>
                  <div className={styles.descriptionText}>
                    <p>{event.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCard; 