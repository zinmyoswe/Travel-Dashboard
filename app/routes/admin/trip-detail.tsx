import type { LoaderFunctionArgs } from "react-router";
import { getAllTrips, getTripById } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";
import type { Route } from "./+types/trip-detail";
import { Header, InfoPill } from "components";


export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { tripId } = params;
    if(!tripId) throw new Error ('Trip ID is required');

    const [trip, trips ] = await Promise.all([
        getTripById(tripId),
        getAllTrips(4,0)
    ]);

    return{
        trip,
        allTrips: trips.allTrips.map(({ $id, tripDetails, imageUrls }) => ({
            id: $id,
            ...parseTripData(tripDetails),
            imageUrls: imageUrls ?? []
        }))
    }
}

const TripDetail = ({ loaderData }: Route.ComponentProps) => {
    const imageUrls = loaderData?.trip?.imageUrls || [];
    const tripData = parseTripData(loaderData?.trip?.tripDetails);

    const {
        name, duration, itinerary, travelStyle,
        groupType, budget, interests, estimatedPrice,
        description, bestTimeToVisit, weatherInfo, country
    } = tripData || {};

    const allTrips = loaderData.allTrips as Trip[] | [];

    const pillItems = [
        { text: travelStyle, bg: '!bg-pink-50 !bg-pink-500'},
        { text: groupType, bg: '!bg-primary-50 !bg-primary-500'},
        { text: budget, bg: '!bg-success-50 !bg-success-500'},
        { text: interests, bg: '!bg-navy-50 !bg-navy-500'},
    ]

    const visitTimeAndWeatherInfo = [
        { title: 'Best Time to Visit:', items: bestTimeToVisit  },
        { title: 'Weather', items: weatherInfo}
    ]

    return (
        <main className="travel-detail wrapper">
            <Header
                title="Trip Details"
                description="View and edit AI-generated travel plans"
            />

            <section className="continer wrapper-md">
                <header>
                    <h1 className="p-40-semibold text-dark-100">{name}</h1>
                    <div className="flex items-center gap-5">
                        <InfoPill 
                            text={`${duration} day plan`}
                            image="/assets/icons/calendar.svg"
                        />

                        <InfoPill
                            text={itinerary?.slice(0,4)
                                .map((item) => item.location).join(', ') || ''
                            }
                            image="/assets/icons/location-mark.svg"
                        />
                    </div>
                </header>
            </section>
        </main>
    )
}

export default TripDetail