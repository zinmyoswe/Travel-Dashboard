import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns'
import { Header } from 'components'
import React, { useState } from 'react'
import type { Route } from './+types/create-trip';
import { useNavigate } from 'react-router';

export const loader = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();

    return data.map((country: any) => ({
        name: country.flag + country.name.common,
        coordinates: country.latlng,
        value: country.name.common,
        openStreetMap: country.maps?.openStreetMap,
    }))
}

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
    const countries = loaderData as Country[];
    const navigate = useNavigate();

    const [formData, setFormData] = useState<TripFormData>({
        country: countries[0]?.name || '',
        travelStyle: '',
        interest: '',
        budget: '',
        duration: 0,
        groupType: ''
    });

    const handleChange = (key: keyof TripFormData, value: string | number) => {
        setFormData({ ...formData, [key]: value})
    }

    const countryData = countries.map((country) => ({
        text: country.name,
        value: country.value,
    }))

    
  return (
    <main className='flex flex-col gap-10 pb-20 wrapper'>
        <Header 
            title="Add a New Trip"
            description='View and edit AI Generated travel plans'
         />

         <section className='mt-2.5 wrapper-md'>
            <form className='trip-form'>
                <div>
                    <label htmlFor='country'>
                        Country
                    </label>
                    <ComboBoxComponent
                        id='country'
                        dataSource={countryData}
                        fields={{ text: 'text', value: 'value' }}
                        placeholder='Select a Country'
                        className='combo-box'
                        change={(e: { value: string | undefined }) => {
                            if(e.value){
                                handleChange('country', e.value)
                            }
                        }}
                        allowFiltering
                        filtering={(e) => {
                            const query = e.text.toLowerCase();

                            e.updateData(
                                countries.filter((country) => country.name.toLowerCase().includes(query)).map(((country) => ({
                                    text: country.name,
                                    value: country.value
                                })))
                            )
                        }}
                    />
                </div>
            </form>
         </section>
    </main>
  )
}

export default CreateTrip