export function validateProps(schena, props, componentName) {
  const validationResult = schena.validate(props, { abortEarly: false });

  if (validationResult.error) {
    const { details } = validationResult.error;
    details.forEach((error) => {
      console.warn(`[${componentName}] Validation Error: ${error.message}`);
    });
  }

  return validationResult.value;
}

// export function validateProps(schema, props, componentName) {
//   const validationResult = schema.validate(props, { abortEarly: false });

//   if (validationResult.error) {
//     const { details } = validationResult.error;
//     details.forEach((error) =>
//       console.warn(`[${componentName}] Validation Error: ${error.message}`),
//     );
//   }

//   return validationResult.value;
// }
