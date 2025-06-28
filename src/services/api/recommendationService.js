import recommendationsData from '@/services/mockData/recommendations.json';

export const recommendationService = {
  async getRecommendations() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...recommendationsData];
  },

  async getRecommendationByCondition(condition) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const recommendation = recommendationsData.find(r => r.condition === condition);
    if (!recommendation) {
      throw new Error(`Recommendation for condition ${condition} not found`);
    }
    return { ...recommendation };
  },

  async generateRecommendation(userSelections) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple recommendation logic based on user selections
    const priorities = userSelections.priorities || [];
    const preferences = userSelections.preference || 'moderate';
    
    // Determine recommendation based on preference
    let condition = preferences;
    if (priorities.includes('backend') || priorities.includes('auth') || priorities.includes('security')) {
      condition = 'integrated';
    } else if (priorities.includes('control') || preferences === 'control') {
      condition = 'control';
    }

    const recommendation = recommendationsData.find(r => r.condition === condition) || recommendationsData[1];
    return { ...recommendation };
  }
};