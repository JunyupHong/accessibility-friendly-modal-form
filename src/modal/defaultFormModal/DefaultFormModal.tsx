import BaseModal from "../BaseModal";
import { useDefaultFormModal } from "./store";
import { useState, useEffect } from "react";

import { defaultFormSchema as schema, type DefaultFormData as FormData } from "./schema";

interface FormModalProps {
  modal: ReturnType<typeof useDefaultFormModal>;
}

export function DefaultFormModal({ modal }: FormModalProps) {
  const { isOpen, close } = modal;

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    memo: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    if (!isOpen) {
      setForm({ name: "", email: "", memo: "" });
      setErrors({});
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};

      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormData;
        if (key && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    close(result.data);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={() => close(null)}
      aria-labelledby="modal-title"
      aria-describedby="modal-desc">
      <h2 id="modal-title">Default Form Modal</h2>
      <p id="modal-desc">input your default information</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <input
            placeholder="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            style={{ width: '100%' }}
          />
          {errors.name && <p id="name-error" role="alert" style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <input
            placeholder="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            style={{ width: '100%' }}
          />
          {errors.email && <p id="email-error" role="alert" style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <textarea
            placeholder="memo"
            value={form.memo}
            onChange={(e) => setForm({ ...form, memo: e.target.value })}
            aria-invalid={!!errors.memo}
            aria-describedby={errors.memo ? "memo-error" : undefined}
            style={{ width: '100%' }}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </BaseModal>
  );
}
