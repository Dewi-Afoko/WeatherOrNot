
import { useState } from 'react';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

const surveyJson = {
  title: "Workout Preferences",
  showProgressBar: "bottom",
  showTimer: false,
  firstPageIsStarted: false,
  startSurveyText: "Start Test",
  pages: [{
    elements: [{
      type: "radiogroup",
      name: "civilwar",
      title: "How many days a week can you workout?",
      choices: [
        {"value": "begginer", 
        "text" :"1-2"} ,
        {"value": "intermediate", 
        "text" :"3-4"} ,
        {"value": "advanced", 
        "text" :"5-6"} 
      ],

    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "libertyordeath",
      title: "How comfortable are you with using gym equipment?",
      choicesOrder: "random",
      choices: [
        {"value": "begginer", 
          "text" :"Never use it"} ,
          {"value": "intermediate", 
          "text" :"I've tried some equipment"} ,
          {"value": "advanced", 
          "text" :"I'm comfortable with most equipment"} 
      ],

    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "q7",
      title: "How would you rate your overall fitness level?",
      choicesOrder: "random",
      choices: [
        {"value": "begginer", 
          "text" :"I'm just starting out"} ,
          {"value": "intermediate", 
          "text" :"I exercise consistently"} ,
          {"value": "advanced", 
          "text" :"I'm very experienced and fit"} 
      ],

    }]
  },
  {
    elements: [{
      type: "radiogroup",
      name: "magnacarta",
      title: "How much time can you dedicate to each workout?",
      choicesOrder: "random",
      choices: [
        {"value": "begginer", 
          "text" :"20-30 minutes"} ,
          {"value": "intermediate", 
          "text" :"30-45 minutes"} ,
          {"value": "advanced", 
          "text" :"45-60+ minutes"} 
      ],

    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "intensity",
      title: "How intense do you want your workouts to feel?",
      choicesOrder: "random",
      choices: [
        {"value": "begginer", 
          "text" :"Light, minimal workout"} ,
          {"value": "intermediate", 
          "text" :"Moderate"} ,
          {"value": "advanced", 
          "text" :"High intensity"} 
      ],

    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "strength",
      title: "What is your current strength level?",
      choicesOrder: "random",
      choices: [
        {"value": "begginer", 
          "text" :"I can't lift heavy weights yet"} ,
          {"value": "intermediate", 
          "text" :"I can lift moderate weights for 8-12 reps"} ,
          {"value": "advanced", 
          "text" :"I can lift heavy weights for a few reps"} 
      ],

    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "type",
      title: "What type of exercise are you comfortable with?",
      choicesOrder: "random",
      choices: [
        {"value": "begginer", 
          "text" :"Low impact"} ,
          {"value": "intermediate", 
          "text" :"A mix of low and high impact"} ,
          {"value": "advanced", 
          "text" :"High impact and intense"} 
      ],

    }]
  },
],
  completedHtml: "Thank you for entering your preferences, we'll take them into account when recommeding exercises.",
};

function Questions()  {


  const survey = new Model(surveyJson);
  survey.onComplete.add(function(sender){
    let beginnerPoints = 0;
    let intermediatePoints = 0;
    let advancedPoints = 0;
  
    const answers = sender.data;
    
    for (let key in answers) {
      const answer = answers[key];
      if (answer === 'beginner') {
        beginnerPoints++;
      } else if (answer === 'intermediate') {
        intermediatePoints++;
      } else if (answer === 'advanced') {
        advancedPoints++;
      }
    }
  

    let fitnessLevel = 'beginner';
    if (intermediatePoints > beginnerPoints && intermediatePoints > advancedPoints) {
      fitnessLevel = 'intermediate';
    } else if (advancedPoints > beginnerPoints && advancedPoints > intermediatePoints) {
      fitnessLevel = 'advanced';
    }
  

      localStorage.setItem('preferences',fitnessLevel)
    
  });


  return (
      <Survey model={survey} id="surveyContainer" />      
  );
}

export default Questions;
