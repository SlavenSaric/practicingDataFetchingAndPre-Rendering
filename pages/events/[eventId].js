import { Fragment } from 'react';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
// import { getAllEvents } from '../../helpers/api-util';
import Head from 'next/head';

function EventDetailPage(props) {
  const event = props.event

  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context){
  const eventId = context.params.eventId

  const response = await getEventById(eventId)
  return {
    props: {event: response},
    revalidate: 600
  }
}

export async function getStaticPaths(){
  const events = await getFeaturedEvents()

  const paths = events.map((e) => ({params: {eventId: e.id}}))
  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export default EventDetailPage;
