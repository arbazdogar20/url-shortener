import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post()
  createShortUrl(
    @Body() createUrlDto: CreateUrlDto,
  ): Promise<{ shortUrl: string; id: string }> {
    return this.urlService.createShortUrl(createUrlDto.url);
  }

  @Get(':shortUrl')
  getOriginalUrl(
    @Param('shortUrl') shortUrl: string,
  ): Promise<{ url: string; shortUrl: string; id: string }> {
    return this.urlService.getOriginalUrl(shortUrl);
  }

  @Get()
  getAllUrls(): Promise<{ id: string; url: string; shortUrl: string }[]> {
    return this.urlService.getAllUrls();
  }
}
