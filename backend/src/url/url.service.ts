import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UrlService {
  constructor(private prismaService: PrismaService) {}

  async createShortUrl(url: string): Promise<{ shortUrl: string; id: string; url: string }> {
    if (!this.isValidUrl(url)) {
      throw new ConflictException('Invalid URL format');
    }

    const shortUrl = Math.random().toString(36).substring(2, 8);

    const urlRecord = await this.prismaService.url.create({
      data: { url, shortUrl },
      select: { shortUrl: true, id: true, url: true },
    });

    return urlRecord;
  }

  async getOriginalUrl(
    shortUrl: string,
  ): Promise<{ url: string; shortUrl: string; id: string }> {
    const urlRecord = await this.prismaService.url.findUnique({
      where: { shortUrl },
      select: { id: true, url: true, shortUrl: true },
    });

    if (!urlRecord) throw new NotFoundException('Short URL not found');

    return urlRecord;
  }

  async getAllUrls(): Promise<{ id: string; url: string; shortUrl: string }[]> {
    const urls = await this.prismaService.url.findMany({
      select: { id: true, url: true, shortUrl: true },
    });
    return urls;
  }

  private isValidUrl(url: string): boolean {
    const pattern =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

    return pattern.test(url);
  }
}
