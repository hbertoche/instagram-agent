import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ContentType } from '../content/dto/generate.dto';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateContent(prompt: string, type: ContentType) {
    const typeText = type === ContentType.POST ? 'Instagram post' : 'Instagram story';
    
    const systemPrompt = `You are an expert Instagram content creator. Generate engaging ${typeText} content based on the user's prompt. Return ONLY a JSON object with this exact structure:
{
  "caption": "engaging caption text",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5"]
}`;

    const userPrompt = `Create ${typeText} content for: ${prompt}`;

    try {
      const optionAResponse = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt + ' (Style: Professional and informative)' },
        ],
        temperature: 0.7,
      });

      const optionBResponse = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt + ' (Style: Casual and fun)' },
        ],
        temperature: 0.9,
      });

      const optionA = JSON.parse(optionAResponse.choices[0].message.content || '{}');
      const optionB = JSON.parse(optionBResponse.choices[0].message.content || '{}');

      return { optionA, optionB };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('OpenAI API Error:', error);
      }
      
      return {
        optionA: {
          caption: `Check out this amazing ${type.toLowerCase()} about ${prompt}! ✨`,
          hashtags: ['#instagram', '#content', '#amazing', '#follow', '#like']
        },
        optionB: {
          caption: `${prompt} - let's talk about it! 🔥`,
          hashtags: ['#trending', '#viral', '#content', '#engagement', '#social']
        }
      };
    }
  }
}
