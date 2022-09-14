import React, { useState, useEffect } from 'react'
import axios from 'axios';



export default function search() {

    const [searches, setSearch] = useState([]);
    const [text, setText] = useState([]);
    const [show, setShow] = useState([]);
    const [suggestions, setSuggestions] = useState([]);




    /*  useEffect(() => {
         const loadCdata = async() =>{
             const response = await axios.get(`https://restcountries.com/v3.1/name/${text}`)
             setSearch(response.data);
         };
         loadCdata();
         
     },[]); */

    /*  console.log(searches); */



    const cloudSearches = (text) => {

        const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
        var cleanString = text;
        const replace = cleanString.replace(regex, '')

        const loadCdata = async () => {
            if (text.length > 1) {
                const response = await axios.get(`https://0noddmn9g1.execute-api.us-east-1.amazonaws.com/cloudsearch/?q=${replace}`)
                setSearch(response.data.hits.hit)
            }
            else {
                const response = await axios.get(`https://0noddmn9g1.execute-api.us-east-1.amazonaws.com/cloudsearch/?q=aws`)
                setSearch(response.data.hits.hit)

            };


        };
        loadCdata();
        let matches = []
        if (text.length > 0) {


            matches = searches.filter((cmsdata) => {
                const regex = new RegExp(`${replace}`, "gi");
                return cmsdata.fields.title.match(regex) || cmsdata.fields.description.match(regex)
            })
        }
        /* console.log('matches', matches) */
        setSuggestions(matches)
        if (matches.length > 0){
            setShow('')
        }else if (text.length > 0) {
            setShow('Result not found :(')
        }
        
        setText(replace)

        /* console.log(searches); */

    };


    function Overlay(event) {
        const value = event.target.textContent
        /* console.log(value)
        alert(`You Selected : ${value}`) */
    }



    return (
        <div className='container'>
            <input className='searchbar' placeholder='Search' onChange={(e) => cloudSearches(e.target.value)} value={text} type="text" />
            <h5 className='re' >{show}</h5>
            {suggestions && suggestions.map((suggestion, i) =>
                <div key={i} className='searchcard'><h5 onClick={Overlay}>{suggestion.fields.title}</h5><p on className='description'>{suggestion.fields.description}</p> </div>

            )}
        </div>


    )
}