"use client"

import { useState, useEffect } from 'react'

export default function Appointment() {
    // State variables for each form input
    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [city, setCity] = useState('');
    const [education, setEducation] = useState('');
    const [lastDegreeName, setLastDegreeName] = useState('');
    const [university, setUniversity] = useState('');
    const [scholarshipCountry, setScholarshipCountry] = useState('');
    const [levelFor, setLevelFor] = useState(''); // Initial value for the select

    // Handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Create an object with all form data
        const formData = {
            name,
            fatherName,
            city,
            education,
            lastDegreeName,
            university,
            scholarshipCountry,
            levelFor,
        };

        // Log the form data to the console
        console.log('Form Data Submitted:', formData);

        // Reset all form states to clear the form
        setName('');
        setFatherName('');
        setCity('');
        setEducation('');
        setLastDegreeName('');
        setUniversity('');
        setScholarshipCountry('');
        setLevelFor('');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 ">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Register here, Book Appointment</h1>
            
            {/* Attach the handleSubmit function to the form's onSubmit event */}
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div className="relative">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={name} // Bind value to state
                        onChange={(e) => setName(e.target.value)} // Update state on change
                        className="w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div className="relative">
                    <input 
                        type="text" 
                        name="father_name" 
                        placeholder="Father Name" 
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        className="w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div className="relative">
                    <input 
                        type="text" 
                        name="city" 
                        placeholder="City" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div className="relative">
                    <input 
                        type="text" 
                        name="education" 
                        placeholder="Education" 
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div className="relative">
                    <input 
                        type="text" 
                        name="last_degree_name" 
                        placeholder="Last Degree Name" 
                        value={lastDegreeName}
                        onChange={(e) => setLastDegreeName(e.target.value)}
                        className="w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div className="relative">
                    <input 
                        type="text" 
                        name="university" 
                        placeholder="University" 
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className="w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div className="relative">
                    <input 
                        type="text" 
                        name="scholarship_country" 
                        placeholder="Scholarship Country" 
                        value={scholarshipCountry}
                        onChange={(e) => setScholarshipCountry(e.target.value)}
                        className="w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div className="relative">
                    <select 
                        name="level_for" 
                        id="level_for"
                        value={levelFor} // Bind value to state
                        onChange={(e) => setLevelFor(e.target.value)} // Update state on change
                        className="w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                        <option value="" disabled>Level For</option> {/* Value is empty string for the placeholder */}
                        <option value="masters">Masters</option>
                        <option value="phd">PhD</option>
                    </select>
                </div>
                
                <div className="sm:col-span-2 mt-4">
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    )
}