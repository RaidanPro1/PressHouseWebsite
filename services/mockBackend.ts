import { MOCK_VIOLATIONS, MOCK_REPORTS, MOCK_SUBSCRIBERS } from '../constants';
import { Violation, AnalysisResult, NewsletterSubscriber } from '../types';

// Simulating Laravel API Latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockApiService = {
  
  async getViolations(): Promise<any[]> {
    await delay(800);
    return MOCK_VIOLATIONS;
  },

  async getReports(): Promise<any[]> {
    await delay(600);
    return MOCK_REPORTS;
  },
  
  async getSubscribers(): Promise<NewsletterSubscriber[]> {
    await delay(500);
    return MOCK_SUBSCRIBERS;
  },
  
  async subscribeToNewsletter(email: string): Promise<{success: boolean}> {
    await delay(1000);
    console.log(`New subscription from: ${email}`);
    // In a real app, you'd add this to the database.
    // Here we just simulate success.
    return { success: true };
  },

  async submitPanicSignal(location: GeolocationCoordinates, name: string, phone: string): Promise<boolean> {
    await delay(1500);
    console.log("Panic Signal Sent to Backend:", {
      name,
      phone,
      lat: location.latitude,
      lng: location.longitude,
      timestamp: new Date().toISOString()
    });
    return true;
  },

  async analyzeImage(file: File): Promise<AnalysisResult> {
    await delay(2000);
    // Simulated Logic for "ImageAnalyzerService" requested in the prompt
    // In a real app, this would upload to Laravel and run PHP Exif tools
    
    return {
      isManipulated: Math.random() < 0.3, // Randomly flag 30% as suspicious
      confidenceScore: 85 + Math.floor(Math.random() * 14),
      metadata: {
        "Camera Model": "Canon EOS 5D Mark IV",
        "Date Taken": "2023:10:24 14:30:22",
        "Exposure": "1/200 sec",
        "ISO": "400",
        "GPS Latitude": "15° 21' 14.22\" N",
        "GPS Longitude": "44° 12' 44.10\" E",
        "Software": "Adobe Photoshop 2023 (Suspicious)"
      }
    };
  },

  async analyzeVideo(file: File): Promise<AnalysisResult> {
    await delay(3500); // Videos take longer
    // Simulated Logic for a "VideoAnalyzerService"
    
    return {
      isManipulated: Math.random() < 0.2, // 20% chance of manipulation
      confidenceScore: 88 + Math.floor(Math.random() * 11),
      metadata: {
        "Codec": "H.264",
        "Duration": "00:00:45",
        "Frame Rate": "29.97 fps",
        "Resolution": "1920x1080",
        "Creation Date": "2024:01:15 11:45:03",
        "Audio Stream": "AAC, 48000 Hz, Stereo"
      }
    };
  }
};