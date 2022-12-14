import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'validCoin' })
export class IsValidCoin implements ValidatorConstraintInterface {
  validate(value: number): boolean {
    if (value) {
      return [5, 10, 20, 50, 100].includes(value);
    }
    return false;
  }
}
