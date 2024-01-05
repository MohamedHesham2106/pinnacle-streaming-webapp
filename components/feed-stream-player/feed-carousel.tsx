'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Stream, User } from '@prisma/client';
import React from 'react';
import { FeedStreamPlayer } from './feed-stream';
import { FeedVideoSkeleton } from './feed-video';

interface IFeedCarouselProps {
  data: (Stream & {
    user: User;
  })[];
}
export const FeedCarousel = ({ data }: IFeedCarouselProps) => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="flex justify-center">
        <div className="w-1/2">
          {data.map((stream) => (
            <CarouselItem key={stream.id}>
              <FeedStreamPlayer user={stream.user} key={stream.id} />
            </CarouselItem>
          ))}
        </div>
      </CarouselContent>
      <CarouselPrevious className="bg-primary text-white" />
      <CarouselNext className="bg-primary text-white" />
    </Carousel>
  );
};
export const FeedCarouselSkeleton = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="flex justify-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="w-full">
            <CarouselItem>
              <FeedVideoSkeleton />
            </CarouselItem>
          </div>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-primary text-white" />
      <CarouselNext className="bg-primary text-white" />
    </Carousel>
  );
};
