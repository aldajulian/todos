import React, { useState, useEffect, useRef } from "react";
import { useAtom } from 'jotai'
import { todos_atoms } from '../utils/store'
import Mark from './todos/Mark'
import OnboardingTodo from "./onboarding/Todo";
import { Link } from "react-router-dom";

const Onboarding = () => {
  return(
    <div className="landing">
      <div className="landing-greatings">
        <h1 style={{fontSize: "24px"}}>Welcome to Tasks</h1>
        <Link to="/onboarding" className="btn-black">Try Tasks</Link>
      </div>
    </div>
  )
}

export default Onboarding;