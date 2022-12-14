import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'validCoin' })
export class IsMultipleFive implements ValidatorConstraintInterface {
  validate(value: number): boolean {
    if (value) {
      return value % 5 === 0;
    }
    return false;
  }
}
