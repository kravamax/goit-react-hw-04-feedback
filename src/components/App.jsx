import { useState } from 'react';

import Statistics from './Statistics';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification/';

const App = () => {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  const countTotalFeedback = () => {
    const reviewsArray = Object.values(state);

    return reviewsArray.reduce((total, feedbacks) => total + feedbacks, 0);
  };

  const getFeedBack = index => {
    setState(state => ({ ...state, [index]: state[index] + 1 }));
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((state.good / countTotalFeedback()) * 100);
  };

  const { good, neutral, bad } = state;
  const hasReview = countTotalFeedback() ? true : false;
  const buttonsNamesArray = Object.keys(state);

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={buttonsNamesArray}
          onLeaveFeedback={getFeedBack}
        />
      </Section>

      <Section title="Statistics">
        {hasReview ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};

export default App;
