import type { LoaderFunctionArgs } from "react-router";
import { getAllTrips, getTripById } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";
import type { Route } from "./+types/trip-detail";


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

    // const pillItems = [
    //     { text: travelStyle, bg}
    // ]
}