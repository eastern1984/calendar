import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import Calendar from '../components/publicPages/Calendar/Calendar'
import Day from '../components/publicPages/Day/Day';

export default function Home() {

  return (
    <>
      <Day />
    </>
  )
}
