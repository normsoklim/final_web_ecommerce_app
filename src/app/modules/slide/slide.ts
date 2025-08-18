
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-slide',
  imports: [NgFor],
  templateUrl: './slide.html',
  styleUrl: './slide.css'
})
export class Slide {
    images = [
    {
      src: 'image/slide1.jpg',
      alt: '',
      title: '',
      caption: ''
    },
    {
      src: 'image/slide2.jpg',
      alt: '',
      title: '',
      caption: ''
    }, 
    {
      src: 'image/slide3.jpg',
      alt: '',
      title: '',
      caption: ''
    },
     {
      src: 'image/slide4.jpg',
      alt: '',
      title: '',
      caption: ''
    },
     {
      src: 'image/slide5.jpg',
      alt: '',
      title: '',
      caption: ''
    },
     {
      src: 'image/slide6.jpg',
      alt: '',
      title: '',
      caption: ''
    }
   
  ];
  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => this.nextSlide(), 3000);
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  
}
