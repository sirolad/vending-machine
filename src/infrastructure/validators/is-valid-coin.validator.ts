import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CoinsBreaker } from '../../domain';

@ValidatorConstraint({ name: 'validCoin' })
export class IsValidCoin implements ValidatorConstraintInterface {
  constructor(private readonly coinsBreaker: CoinsBreaker) {}
  validate(value: number): boolean {
    if (value) {
      return this.coinsBreaker.coins.includes(value);
    }
    return false;
  }
}
