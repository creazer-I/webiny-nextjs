import { gql, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react'
import axios from 'axios';


const create_caseStudy = gql`
mutation createFeebackForms($title :String!,
    $desc: String!,$image:String!){
      createCasestudymodel(data:{
        title: $title
        description : $desc
        image : $image
      }){
        data{
          title
        description
        image
          createdBy{
            id
            type
          }
        }
      }
    }
`

export default function create() {
  const [img, setImg] = useState([]);
  const [disable, setDisable] = useState([])



  let title;
  let desc;
  let image;
  const [casestudy, { data, loading, error }] = useMutation(create_caseStudy);



  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;



  const send = (event) => {
    axios.post('https://rzfx9vsfa7.execute-api.us-east-1.amazonaws.com/db-cloudsearch-item?', {
      title: title.value,
      description: desc.value
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));


    if (image.value.length > 0) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  };

  return (
    <div className='create_container'>
      <form className='create_form'
        onSubmit={e => {
          e.preventDefault();
          casestudy({ variables: { title: title.value, desc: desc.value, image: img } });
          title.value = '';
          desc.value = '';
          image.value = '';


        }}
      >
        <h5>Create CaseStudy</h5>

        <input
          ref={node => {
            title = node;
          }}
          className='title'
          placeholder='Enter Title'
        />
        <br></br>

        <input
          ref={node => {
            desc = node;
          }}
          className='desc'
          placeholder='Enter Desscription'
        />
        <br></br>
        <br></br>
        <label>Upload Image </label>
        <input ref={node => {
          image = node;
        }} type="file" onChange={onImageChange}  accept="image/*"/>
        <button type="submit" onClick={send} disabled={disable}>create</button>
      </form>
    </div>
  )
}





