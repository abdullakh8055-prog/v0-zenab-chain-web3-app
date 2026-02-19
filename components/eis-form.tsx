'use client';

import { useState } from 'react';
import { Wind, Droplet, Gauge } from 'lucide-react';
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
    setErrors((prev) => prev.filter((e) => e.field !== name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateInputs(values);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

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

  const fields = [
    {
      id: 'co2',
      label: 'CO2 (ppm)',
      icon: Wind,
      example: 'e.g., 400',
      range: 'Normal: <400 ppm | Dangerous: > 1000 ppm'
    },
    {
      id: 'pm25',
      label: 'PM2.5 (μg/m³)',
      icon: Droplet,
      example: 'e.g., 12',
      range: 'Normal: < 12 μg/m³ | Dangerous: > 35 μg/m³'
    },
    {
      id: 'pm10',
      label: 'PM10 (μg/m³)',
      icon: Gauge,
      example: 'e.g., 50',
      range: 'Normal: < 50 μg/m³ | Dangerous: > 150 μg/m³'
    }
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.id} className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Icon className="w-5 h-5 text-cyan-400" />
              <label htmlFor={field.id} className="block text-sm font-medium text-white">
                {field.label}
              </label>
            </div>
            <Input
              id={field.id}
              name={field.id}
              type="number"
              placeholder={field.example}
              value={values[field.id as keyof InputValues]}
              onChange={handleChange}
              disabled={isLoading}
              className={`bg-slate-800 border-slate-700 text-white placeholder-slate-500 ${
                getFieldError(field.id) ? 'border-red-500 border-2' : ''
              }`}
              min="0"
              max="500"
              step="0.1"
            />
            <p className="text-xs text-slate-400 mt-1">{field.range}</p>
            {getFieldError(field.id) && (
              <p className="text-sm text-red-500">{getFieldError(field.id)}</p>
            )}
          </div>
        );
      })}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 mt-8"
      >
        {isLoading ? 'Verifying on Algorand...' : 'Verify'}
      </Button>
    </form>
  );
}
