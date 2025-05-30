'use client';

import Autoplay from "embla-carousel-autoplay"
import React, { useRef, useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export default function ProjectCarousel<TData extends any[]>({ data }: { data: TData }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="w-full md:w-7/12 mx-auto">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {data.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="w-full h-full">
                  <CardContent className="p-0 flex aspect-video items-center justify-center relative hover:aspect-square transition-all duration-300">
                    <Image
                      src={image}
                      alt={`Project image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg absolute"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                      loading="eager"
                      quality={80}
                      placeholder="blur"
                      blurDataURL={image}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        Image {current} of {count}
      </div>
    </div>
  )
}
