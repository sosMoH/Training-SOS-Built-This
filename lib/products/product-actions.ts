"use server";

type FormState = {
  errors?: Record<string, string>;
  success: boolean;
  message: string;
};

export const addProductAction = async (
  prevState: FormState,
  formData: FormData,
) => {
  console.log(`FormData: ${formData}`);

  return {
    errors: {},
    success: true,
    message: "Product added successfully",
  };
};
