import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormInput from "./components/FormInput";
import Graph from "./components/Graph";

function App() {
  const [data, setData] = useState({});

  const handleData = (data) => {
    setData(data);
  };

  useEffect(() => {}, [data]);

  return (
    <Component>
      <FormInput sendData={handleData} />
      <Graph data={data} />
    </Component>
  );
}

const Component = styled.div`
  display: grid;
  grid-template-columns: 30% 65%;
  gap: 2rem;
  padding: 2rem;
`;

export default App;
