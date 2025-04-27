import { useState, useCallback } from "react";

type ValidationRules<T> = {
  [P in keyof T]?: (value: T[P]) => string | null;
};

interface FormOptions<T> {
  initialValues: T;
  validationRules: ValidationRules<T>;
}

interface FormState<T> {
  errors: Partial<Record<keyof T, string>>;
  values: T;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules,
}: FormOptions<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    errors: {},
    values: initialValues,
  });

  const validateField = useCallback(
    (field: keyof T, value: T[keyof T]) => {
      const validator = validationRules[field];
      if (validator) {
        const error = validator(value);
        setFormState((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            [field]: error,
          },
        }));
        return error === null;
      }
      return true;
    },
    [validationRules]
  );

  const validateAll = useCallback(() => {
    const newErrors: { [K in keyof T]?: string } = {};
    let isValid = true;

    Object.keys(validationRules).forEach((field) => {
      const key = field as keyof T;
      const validator = validationRules[key];
      if (validator) {
        const error = validator(formState.values[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setFormState((prev) => ({
      ...prev,
      errors: newErrors,
    }));

    return isValid;
  }, [validationRules, formState.values]);

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void) => {
      return (e: React.FormEvent) => {
        e.preventDefault();
        if (validateAll()) {
          onSubmit(formState.values);
        }
      };
    },
    [validateAll, formState.values]
  );

  return {
    errors: formState.errors,
    values: formState.values,
    validateField,
    validateAll,
    handleSubmit,
  };
} 