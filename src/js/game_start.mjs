import { setQuestionAndAnswers, makeRequest } from './utils.mjs';

const info = await makeRequest();
await setQuestionAndAnswers(info);