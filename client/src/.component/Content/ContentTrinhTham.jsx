import React, {useEffect, useState } from 'react';
import axios  from 'axios';

import {BookCart} from './index';

function ContentTrinhTham(pros) {


    const [books, setBookState] = useState([])
  
    useEffect(()=>{
      const getTodos = async () =>{
        try {
          const res = await axios.get('http://localhost:9000/trinhtham')
           console.log(res.data);
          setBookState(res.data)
        } catch (error) {
          console.log(error);
        }
      }
  
      getTodos();
    });
  
    return (
      <div className="container">
        <div className="row">
          {books.map((book) => (
            <div className="col-md-4">
              <BookCart book={book} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default ContentTrinhTham;