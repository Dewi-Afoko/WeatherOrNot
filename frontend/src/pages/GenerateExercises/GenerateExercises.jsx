// import { useState } from "react";
import GenerateButton from "../../components/GenerateButton";
import ChooseMuscle from "../../components/ChooseMuscle";

export function GenerateExercises() {

    return (
        <>
            <h1>Muscle Options</h1>
            <ChooseMuscle />
            <GenerateButton/>
        </>
    )
}