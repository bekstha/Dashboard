import {MenuBookIcon} from '@mui/icons-material/MenuBook';
import {DinnerDiningIcon} from '@mui/icons-material/DinnerDining';
import {QueryBuilderIcon} from '@mui/icons-material/QueryBuilder';
import {EventSeatIcon} from '@mui/icons-material/EventSeat';
import {ContactMailIcon} from '@mui/icons-material/ContactMail';

export const links = [
    {
      title: 'Lunch Menu',
      links: [
        {
          name: 'lunchMenu',
          //icon: <MenuBookIcon />,
        },
      ],
    },
    {
      title: 'A La Carte',
      links: [
        {
          name: 'aLaCarte',
          //icon: <DinnerDiningIcon />,
        },
      ],
    },
    {
      title: 'Openings',
      links: [
        {
          name: 'openings',
          //icon: <QueryBuilderIcon />,

        },
      ],
    },
    {
      title: 'Reservations',
      links: [
        {
          name: 'reservations',
          //icon: <EventSeatIcon />,
        },
      ],
    },
    {
      title: 'Contacts',
      links: [
        {
          name: 'contacts',
          //icon: <ContactMailIcon />,
        },
      ],
    },
];
