import { Body, Controller, Get, Post } from '@nestjs/common';
import ollama from 'ollama';
import { Public } from 'src/utils/decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('llm')
export class LlmController {
  @ApiTags('LLM')
  @Public()
  @Post('chat')
  async llmChat(@Body() body: { model: string; content: string }) {
    const { model, content } = body;
    const response = await ollama.chat({
      model,
      messages: [{ role: 'user', content }],
      stream: false,
    });

    return response.message;
  }

  @ApiTags('LLM')
  @Public()
  @Get('list')
  async llmList() {
    const list = await ollama.list();
    return list.models.map((model) => {
      return model.name;
    });
  }
  // create role and content and save in database
}
