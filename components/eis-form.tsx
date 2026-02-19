'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { validateInputs, InputValues, ValidationError } from '@/lib/validation';

interface EISFormProps {
  onSubmit: (co2: number, pm25: number, pm10: number) => Promise<void>;
  isLoading?: boolean;
}

export function EISForm({ onSubmit, isLoading = false }: EISFormProps) {
  const [values, setValues] = useState<InputValues>({
    co2: '',
    pm25: '',
    pm10: '',
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find((e) => e.field === fieldName)?.message;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    setErrors((prev) => prev.filter((e) => e.field !== name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    const validationErrors = validateInputs(values);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors if validation passed
    setErrors([]);

    try {
      const co2 = parseFloat(values.co2);
      const pm25 = parseFloat(values.pm25);
      const pm10 = parseFloat(values.pm10);

      await onSubmit(co2, pm25, pm10);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="space-y-2">
        <label htmlFor="co2" className="block text-sm font-medium text-foreground">
          CO2 Level (0-500)
        </label>
        <Input
          id="co2"
          name="co2"
          type="number"
          placeholder="Enter CO2 level"
          value={values.co2}
          onChange={handleChange}
          disabled={isLoading}
          className={getFieldError('co2') ? 'border-red-500 border-2' : ''}
          min="0"
          max="500"
          step="0.1"
        />
        {getFieldError('co2') && (
          <p className="text-sm text-red-500">{getFieldError('co2')}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="pm25" className="block text-sm font-medium text-foreground">
          PM2.5 Level (0-500)
        </label>
        <Input
          id="pm25"
          name="pm25"
          type="number"
          placeholder="Enter PM2.5 level"
          value={values.pm25}
          onChange={handleChange}
          disabled={isLoading}
          className={getFieldError('pm25') ? 'border-red-500 border-2' : ''}
          min="0"
          max="500"
          step="0.1"
        />
        {getFieldError('pm25') && (
          <p className="text-sm text-red-500">{getFieldError('pm25')}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="pm10" className="block text-sm font-medium text-foreground">
          PM10 Level (0-500)
        </label>
        <Input
          id="pm10"
          name="pm10"
          type="number"
          placeholder="Enter PM10 level"
          value={values.pm10}
          onChange={handleChange}
          disabled={isLoading}
          className={getFieldError('pm10') ? 'border-red-500 border-2' : ''}
          min="0"
          max="500"
          step="0.1"
        />
        {getFieldError('pm10') && (
          <p className="text-sm text-red-500">{getFieldError('pm10')}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 rounded-lg transition-all duration-200"
      >
        {isLoading ? 'Verifying on Algorand...' : 'Verify on Algorand'}
      </Button>
    </form>
  );
}
