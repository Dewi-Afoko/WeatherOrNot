import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GenerateExercises } from '../../src/pages/GenerateExercises/GenerateExercises';
import { getNewExercises } from '../../src/services/exercises';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';

// Mock the getNewExercises function
vi.mock('../../src/services/exercises');

describe('GenerateExercises Component', () => {
    it('renders correctly', () => {
        render(
            <Router>
                <GenerateExercises />
            </Router>
        );
    expect(screen.getByText('Choose a Muscle')).toBeInTheDocument();
    expect(screen.getByText('Choose Difficulty')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate Workout/i })).toBeInTheDocument();
    });

    it('submits form and fetches exercises', async () => {
    // Mock API call to return fake exercises
        const mockExercises = [
            {
                "name": "Rickshaw Carry",
                "type": "strongman",
                "muscle": "forearms",
                "equipment": "other",
                "difficulty": "beginner",
                "instructions": "Position the frame at the starting point, and load with the appropriate weight. Standing in the center of the frame, begin by gripping the handles and driving through your heels to lift the frame. Ensure your chest and head are up and your back is straight. Immediately begin walking briskly with quick, controlled steps. Keep your chest up and head forward, and make sure you continue breathing. Bring the frame to the ground after you have reached the end point."
            },
            {
                "name": "Landmine twist",
                "type": "strength",
                "muscle": "abdominals",
                "equipment": "other",
                "difficulty": "intermediate",
                "instructions": "Position a bar into a landmine or securely anchor it in a corner. Load the bar to an appropriate weight. Raise the bar from the floor, taking it to shoulder height with both hands with your arms extended in front of you. Adopt a wide stance. This will be your starting position. Perform the movement by rotating the trunk and hips as you swing the weight all the way down to one side. Keep your arms extended throughout the exercise. Reverse the motion to swing the weight all the way to the opposite side. Continue alternating the movement until the set is complete."
            },
        ];
        getNewExercises.mockResolvedValueOnce(mockExercises);
        render(
            <Router>
                <GenerateExercises />
            </Router>
        );
        fireEvent.click(screen.getByLabelText(/Abdominals/i));  // For selecting muscle as a radio button
        fireEvent.click(screen.getByLabelText(/Intermediate/i));     
        fireEvent.click(screen.getByRole('button', { name: /Generate Workout/i }));
        await waitFor(() => {
            expect(getNewExercises).toHaveBeenCalledWith(expect.any(String), 'abdominals', 'intermediate');
            expect(screen.getByText('Try these exercises:')).toBeInTheDocument();
        //     expect(screen.getByText('Rickshaw Carry')).toBeInTheDocument();
        //     expect(screen.getByText('Landmine twist')).toBeInTheDocument();
        });
    });

//     it('shows error when no filters are selected', async () => {
//         render(
//             <Router>
//                 <GenerateExercises />
//             </Router>
//         );
//         fireEvent.click(screen.getByRole('button', { name: /Generate Workout/i }));
//         await waitFor(() => {
//             expect(getNewExercises).not.toHaveBeenCalled();
//             expect(screen.queryByText('Try these exercises:')).not.toBeInTheDocument();
//         });
//     });
});
