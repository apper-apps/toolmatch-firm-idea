import questionsData from '@/services/mockData/questions.json';

export const questionService = {
  async getQuestions() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...questionsData];
  },

  async getQuestionById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const question = questionsData.find(q => q.Id === parseInt(id));
    if (!question) {
      throw new Error(`Question with id ${id} not found`);
    }
    return { ...question };
  },

  async getQuestionByType(type) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const question = questionsData.find(q => q.type === type);
    if (!question) {
      throw new Error(`Question with type ${type} not found`);
    }
    return { ...question };
  }
};