export default function transformAutocompleteValues(formData) {
    const transformed = { ...formData };

    for (const key in transformed) {
        if (Array.isArray(transformed[key]) && transformed[key].every(v => v && typeof v === "object" && "id" in v)) {
            transformed[key] = transformed[key].map(v => v.id);
        }
    }

    return transformed;
}