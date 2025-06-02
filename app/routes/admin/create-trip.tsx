import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns'
import { Header } from 'components'
import React, { useState } from 'react'
import type { Route } from './+types/create-trip';
import { useNavigate } from 'react-router';
import { comboBoxItems, selectItems } from '~/constants';
import { formatKey } from '~/lib/utils';
import {world_map} from "~/constants/world_map";
import {LayerDirective, LayersDirective, MapsComponent} from "@syncfusion/ej2-react-maps";

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

    const mapData = [
        {
            country: formData.country,
            color: '#EA382E',
            coordinates: countries.find((c:Country) => c.name === formData.country)?.coordinates || []
        }
    ]

    
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

                <div>
                    <label htmlFor="duration">Duration</label>
                    <input
                        id='duration'
                        name='duration'
                        type='number'
                        placeholder='Enter a number of days'
                        className='form-input placeholder:text-gray-100'
                        onChange={(e) => handleChange('duration', Number(e.target.value))}
                    />
                </div>

                {selectItems.map((key) => (
                    <div key={key}>
                        <label htmlFor={key}>{formatKey(key)}</label>

                        <ComboBoxComponent
                            id={key}
                            dataSource={comboBoxItems[key].map((item) => ({
                                text: item,
                                value: item,
                            }))}
                            fields={{ text: 'text', value: 'value' }}
                            placeholder={`select ${formatKey(key)}`}
                            change={(e: {value: string | undefined}) => {
                                if(e.value){
                                    handleChange(key, e.value)
                                }
                            }}
                            allowFiltering
                            filtering={(e) => {
                                const query = e.text.toLowerCase();

                                e.updateData(
                                    comboBoxItems[key]
                                        .filter((item) => item.toLowerCase().includes(query))
                                        .map(((item) => ({
                                            text: item,
                                            value: item,
                                        }))))}}
                            className='combo-box'
                        />
                    </div>
                ))}

                <div>
                    <label htmlFor="location">
                        Location on the world map
                    </label>
                    <MapsComponent>
                        <LayersDirective>
                            <LayerDirective
                                shapeData={world_map}
                                dataSource={mapData}
                                shapePropertyPath="name"
                                shapeDataPath="country"
                                shapeSettings={{ colorValuePath: "color", fill: "#E5E5E5"}}
                            />
                        </LayersDirective>
                    </MapsComponent>
                </div>
            </form>
         </section>
    </main>
  )
}

export default CreateTrip