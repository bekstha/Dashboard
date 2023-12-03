import MenuBookIcon from '@mui/icons-material/MenuBook';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DiscountIcon from '@mui/icons-material/Discount';

export const links = [
    {
      title: 'Menu',
      links: [
        {
          name: 'Lunch Menu',
          to: 'LunchMenu',
          icon: <MenuBookIcon />,
        },
        {
          name: 'a La Carte',
          to: 'ALaCarte',
          icon: <DinnerDiningIcon />,
        },
        {
          name: 'Special Menu',
          to: 'SpecialMenu',
          icon: <DiscountIcon />,
        },
      ],
    },
    {
      title: 'About Us',
      links: [
        {
          name: 'openings',
          to: 'Openings',
          icon: <QueryBuilderIcon />,

        },
        {
          name: 'contact',
          to: 'Contact',
          icon: <ContactMailIcon />,
        },
      ],
    },
    {
      title: 'Reservations',
      links: [
        {
          name: 'reservations',
          to: 'Reservations',
          icon: <EventSeatIcon />,
        },
      ],
    },
];
