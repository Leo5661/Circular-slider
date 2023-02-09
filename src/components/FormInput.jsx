import React, { useEffect, useState } from "react";
import styled from "styled-components";

function FormInput({ sendData }) {
  const [grossEarnings, setGrossEarnings] = useState("");
  const [referralPer, setReferralPer] = useState("");

  useEffect(() => {
    let dataObj = {
      grossEarnings: grossEarnings,
      referralPer: referralPer,
    };
    sendData(dataObj);
  }, [grossEarnings, referralPer]);

  return (
    <FormComponent>
      <form>
        <div>
          <label htmlFor="gross_earnings">Gross Earnings: </label>
          <input
            type="number"
            id="gross_earnings"
            name="grossEarnings"
            placeholder="Enter Amont"
            value={grossEarnings}
            onChange={(e) => setGrossEarnings(e.target.value)}
            max="9999999999"
          />
        </div>

        <div>
          <label htmlFor="referral">{`Referral (%)`}: </label>
          <input
            type="number"
            id="referral"
            name="referral"
            placeholder="Enter Amont"
            value={referralPer}
            onChange={(e) => setReferralPer(e.target.value)}
            max="100"
          />
        </div>
      </form>
    </FormComponent>
  );
}

const FormComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid blue;
  border-radius: 1rem;
  height: 90vh;
  form {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    gap: 2rem;
    input {
      border: 1px solid blueviolet;
      border-radius: 2px;
      background-color: transparent;
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &:focus {
        border: 1.3px solid blue;
        outline: none;
      }

      &:hover {
        border: 1.3px solid blue;
      }
    }
  }
`;

export default FormInput;
