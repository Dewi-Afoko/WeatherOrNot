import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import ChooseMuscle from "../../src/components/ChooseMuscle";

describe("ChooseMuscle", () => {
    test("displays Biceps as an option", () => {
        render(<ChooseMuscle />);
        expect(screen.getByLabelText("Biceps")).toBeInTheDocument();
      })
    test("displays all muscles as options", () => {
      const muscleOptions = [
        'Abdominals', 
        'Abductors',
        'Adductors',
        'Biceps',
        'Calves',
        'Chest',
        'Forearms',
        'Glutes',
        'Hamstrings',
        'Lats',
        'Lower back',
        'Middle back',
        'Neck',
        'Quadriceps',
        'Traps',
        'Triceps'
      ];
        render(<ChooseMuscle />);
        muscleOptions.forEach((muscle) => {
          expect(screen.getByLabelText(muscle)).toBeInTheDocument();
        })
      
    })
});
