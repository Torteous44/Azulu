export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Event Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Venue Name',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'address',
          title: 'Address',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'startTime',
      title: 'Start Time',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'endTime',
      title: 'End Time',
      type: 'datetime'
    },
    {
      name: 'ticketStatus',
      title: 'Ticket Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold Out', value: 'soldOut' },
          { title: 'Sold at the Door', value: 'soldAtDoor' }
        ]
      },
      initialValue: 'available',
      validation: Rule => Rule.required()
    },
    {
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url',
      description: 'Required if tickets are available online',
      validation: Rule => Rule.custom((ticketLink, context) => {
        const { ticketStatus } = context.parent;
        if (ticketStatus === 'available' && !ticketLink) {
          return 'Ticket link is required when tickets are available online';
        }
        return true;
      })
    },
    {
      name: 'lineup',
      title: 'Lineup',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'artist',
              title: 'Artist Name',
              type: 'string'
            },
          ],
          preview: {
            select: {
              title: 'artist',
            }
          }
        }
      ]
    },
    {
      name: 'genres',
      title: 'Genres',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Deep House', value: 'deep-house' },
          { title: 'Afro House', value: 'afro-house' },
          { title: 'Electronic', value: 'electronic' },
          { title: 'Techno', value: 'techno' },
          { title: 'House', value: 'house' },
          { title: 'Melodic Techno', value: 'melodic-techno' },
          { title: 'Progressive House', value: 'progressive-house' },
          { title: 'Minimal', value: 'minimal' },
          { title: 'Disco', value: 'disco' }
        ]
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Amount',
          type: 'number'
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'EUR',
          options: {
            list: [
              { title: 'EUR (€)', value: 'EUR' },
              { title: 'GBP (£)', value: 'GBP' },
              { title: 'USD ($)', value: 'USD' },
              { title: 'CAD (C$)', value: 'CAD' },
              { title: 'AUD (A$)', value: 'AUD' },
              { title: 'JPY (¥)', value: 'JPY' },
              { title: 'CHF (Fr)', value: 'CHF' }
            ]
          }
        }
      ]
    }
  ]
} 