export interface ValidationError {
  field: string;
  message: string;
}

export interface InputValues {
  co2: string;
  pm25: string;
  pm10: string;
}

export const VALIDATION_RANGES = {
  co2: { min: 0, max: 500, label: 'CO2' },
  pm25: { min: 0, max: 500, label: 'PM2.5' },
  pm10: { min: 0, max: 500, label: 'PM10' },
};

export function validateInputs(values: InputValues): ValidationError[] {
  const errors: ValidationError[] = [];

  // CO2 validation
  if (!values.co2) {
    errors.push({ field: 'co2', message: 'CO2 is required' });
  } else {
    const co2 = parseFloat(values.co2);
    if (isNaN(co2)) {
      errors.push({ field: 'co2', message: 'CO2 must be a valid number' });
    } else if (co2 < VALIDATION_RANGES.co2.min || co2 > VALIDATION_RANGES.co2.max) {
      errors.push({
        field: 'co2',
        message: `CO2 must be between ${VALIDATION_RANGES.co2.min} and ${VALIDATION_RANGES.co2.max}`,
      });
    }
  }

  // PM2.5 validation
  if (!values.pm25) {
    errors.push({ field: 'pm25', message: 'PM2.5 is required' });
  } else {
    const pm25 = parseFloat(values.pm25);
    if (isNaN(pm25)) {
      errors.push({ field: 'pm25', message: 'PM2.5 must be a valid number' });
    } else if (pm25 < VALIDATION_RANGES.pm25.min || pm25 > VALIDATION_RANGES.pm25.max) {
      errors.push({
        field: 'pm25',
        message: `PM2.5 must be between ${VALIDATION_RANGES.pm25.min} and ${VALIDATION_RANGES.pm25.max}`,
      });
    }
  }

  // PM10 validation
  if (!values.pm10) {
    errors.push({ field: 'pm10', message: 'PM10 is required' });
  } else {
    const pm10 = parseFloat(values.pm10);
    if (isNaN(pm10)) {
      errors.push({ field: 'pm10', message: 'PM10 must be a valid number' });
    } else if (pm10 < VALIDATION_RANGES.pm10.min || pm10 > VALIDATION_RANGES.pm10.max) {
      errors.push({
        field: 'pm10',
        message: `PM10 must be between ${VALIDATION_RANGES.pm10.min} and ${VALIDATION_RANGES.pm10.max}`,
      });
    }
  }

  return errors;
}

export function calculateEIS(co2: number, pm25: number, pm10: number): number {
  return 100 - (0.4 * co2 + 0.3 * pm25 + 0.3 * pm10);
}
