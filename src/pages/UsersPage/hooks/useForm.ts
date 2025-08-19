import { useState } from 'react';
import { User } from '@/models/types/user.types';

export const useForm = (initialState: User) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState<User>(initialState);

  // Function to handle form submission, utilize currying
  const handleSubmit = (onSubmit: (data: User) => void) => (event: React.FormEvent<SubmitEvent>) => {
    onSubmit(formData);
    resetFormHandler(event);
    setIsDisabled(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      // Get nested keys by splitting
      const keys = name.split('.');

      // Return callback - Map the nested keys in the object for "address.street" to change the value
      return keys.reduceRight((acc, key, index) => {
        // Check if nesting is present
        if (index === keys.length - 1) {
          // Top-level property
          return { ...prev, [key]: value };
        }

        // Else handle nesting by accessing the array index and destructuring with the spread operator
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: value,
          },
        };
      }, prev);
    });

    setIsDisabled(false);
  };

  const resetFormHandler = (event?: React.FormEvent<SubmitEvent>) => {
    if (event) setFormData(initialState);
  };

  return {
    formData,
    isDisabled,
    setIsDisabled,
    onChange,
    handleSubmit,
    setFormData,
  };
};
