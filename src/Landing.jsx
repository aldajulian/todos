import React, { useState, useEffect, useRef } from "react";
import { useAtom } from 'jotai'
import { todos_atoms } from './utils/store'
import Mark from './components/todos/Mark'
import OnboardingTodo from "./components/onboarding/Todo";
import OnboardingSetting from "./components/onboarding/Setting";
import { Link } from "react-router-dom";
import './styles/onboarding.scss'

const onboarding_left = [
  {name: "trip to europe", checked: false},
  {name: "Add Search feature to search task name or notes", checked: true},
  {name: "trip to europe", checked: false}
]

const Landing = () => {
  return(
    <div className="landing">
      <div className="landing-greatings">
        <h1 style={{fontSize: "24px"}}>Tasks, To-Do, Assignments, you name it.</h1>
        <p>
          Built for personal usage, designed with personal preferences. Bare-featured,
          minimal boring interface. Rich with features to choose from, you are in control.
          Focus on getting you to your end goal one step at a time.
        </p>
        <p>No tracking. No ads, ever.</p>
        <Link to="/onboarding" className="btn-black">Try Tasks</Link>
      </div>
      <div className="landing-showcase">
        <div className="todo-list">
          <div className="first-section">
            <div className="section-flex align-items-end">
              <OnboardingTodo name={"Using localStorage to store data"} checked={true} delay="0.1"/>
              <div className="flex-row align-items-end">
                <OnboardingTodo name="Desktop and Mobile support" checked={true} delay="0.4" />
                <OnboardingSetting name="Dark mode" description="For the one who love the dark-side" delay="0.6"/>
              </div>
            </div>
            <OnboardingTodo opened={true} delay="0"/>
            <div className="section-flex align-items-start">
              <div>
                <OnboardingTodo name={"Finish create To-do list called Tasks."} checked={true} delay="0.2"/>
              </div>
              <div className="flex-row  align-items-start">
                <OnboardingTodo name={"Work at european company"} checked={false} delay="0.5"/>
                <OnboardingTodo name={"Add search task with using ⌘ + K"} checked={false} delay="0.1"/>
              </div>
            </div>
          </div>
          <div className="first-section align-items-center">
            <OnboardingTodo name={"Multiple theme"} checked={false} />
            <OnboardingTodo name={"Trip to japan with my Family"} checked={false} notes="Take picture with mount Fuji" delay="0.6"/>
            <OnboardingTodo name={"Add onboarding before using Task"} checked={true} notes="Need to fill user name before using the App" delay="0.6"/>
            <OnboardingSetting name="Focus mode" description="Hide another task while you edit" delay="0.9"/>
            <OnboardingTodo name={"Option for stored data in database"} checked={false} delay="0.7"/>
            <OnboardingTodo name={"Finish create To-do list called Tasks."} checked={true} delay="0.3"/>
            <OnboardingTodo name={"Multiple theme"} checked={false} />
          </div>
          <div className="first-section">
            <OnboardingTodo name={"Multiple theme"} checked={false} delay="0.5"/>
            <OnboardingTodo name={"Add onboarding before using Task"} checked={false} delay="0.3"/>
            <OnboardingTodo name={"Multiple theme"} checked={false} delay="0.6"/>
            <OnboardingTodo name={"Multiple theme"} checked={false} />
            <OnboardingTodo name={"Add notification for completed task"} checked={false} />
            <OnboardingTodo name={"Multiple theme"} checked={false} delay="0.8"/>
            <OnboardingTodo name={"Multiple theme"} checked={false} delay="0.6"/>
            <OnboardingTodo name={"Multiple theme"} checked={false} delay="0.4"/>
            <OnboardingTodo name={"Multiple theme"} checked={false} delay="0.9"/>
            <OnboardingTodo name={"Multiple theme"} checked={false} delay="0.7"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;