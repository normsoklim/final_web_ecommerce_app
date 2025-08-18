import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toKHR'
})
export class ToKHRPipe implements PipeTransform {
  transform(amount: number, rate: number, rounding?: 'up' | 'down'): string {
    // Step 1: Calculate total amount
    const totalAmount = amount * rate;
    let finalAmount = totalAmount;
    
    // Step 2: Apply rounding if specified
    if (rounding === 'up') {
      // Round UP to nearest 100 (4193 → 4200, 4100 → 4100)s
      finalAmount = Math.ceil(totalAmount / 100) * 100;
      
    } else if (rounding === 'down') {
      // Round DOWN to nearest 100 (4193 → 4100, 4200 → 4200)
      finalAmount = Math.floor(totalAmount / 100) * 100;
      
    } else {
      // No rounding specified - keep original amount
      finalAmount = totalAmount;
    }
    
    // Step 3: Format with KHR symbol and commas
    return '៛' + finalAmount.toLocaleString();
  }
}
