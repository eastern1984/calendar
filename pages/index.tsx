import Day from '../components/publicPages/Day/Day';
import dbConnect from '../helpers/dbConnection';
import DayEvent from '../models/DayEvent';


export async function getServerSideProps(context: any) {
  await dbConnect();
  const data = await DayEvent.find({});
  return {
    props: { test: 123, c: data.length }, // will be passed to the page component as props
  }
}

export default function Home(props) {
  console.log(112233123, props);
  return (
    <>
      <Day />
    </>
  )
}
