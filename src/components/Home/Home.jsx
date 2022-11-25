import React from "react";
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import CardCatagories from './../CardCatagories/CardCatagories';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const { data: catagoriesData = [] } = useQuery({
    queryKey: ["catagoriesData"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/cardCategory");
      const data = await res.json();
      return data;
    },
  })  
  return (
    <div>
      <section>
        <Container>
          <Row className="g-4">
            
            {
              catagoriesData.map((category)=>(
                <CardCatagories data={category}  key={category._id}/>
              ))
            }  
            
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
