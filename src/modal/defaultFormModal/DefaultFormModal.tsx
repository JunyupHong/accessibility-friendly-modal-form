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
    github: undefined,
    experience: undefined,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    if (!isOpen) {
      setForm({ name: "", email: "", github: "", experience: undefined });
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
      <h2 id="modal-title">신청폼</h2>
      <p id="modal-desc">이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="name">이름 / 닉네임</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            style={{ width: '100%' }}
          />
          {errors.name && <p id="name-error" role="alert"
            tabIndex={-1} style={{ color: "red", margin: 0 }}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">이메일</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            style={{ width: '100%' }}
          />
          {errors.email && <p id="email-error" role="alert"
            tabIndex={-1} style={{ color: "red", margin: 0 }}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="experience">경력 연차</label>
          <div>
            <select
              id="experience"
              value={form.experience || ""}
              onChange={(e) => setForm({ ...form, experience: e.target.value as FormData["experience"] })}
              aria-invalid={!!errors.experience}
              aria-describedby={errors.experience ? "experience-error" : undefined}
            >
              <option value="">선택하세요</option>
              <option value="0~1년">0~1년</option>
              <option value="1~3년">1~3년</option>
              <option value="3~5년">3~5년</option>
              <option value="5~10년">5~10년</option>
              <option value="10년 이상">10년 이상</option>
            </select>
          </div>
          {errors.experience && (
            <div
              id="experience-error"
              role="alert"
              tabIndex={-1}
              style={{ color: "red", margin: 0 }}
            >
              {errors.experience}
            </div>
          )}
        </div>
        <div>

          <label htmlFor="github">GitHub 링크 (선택)</label>
          <textarea
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            aria-invalid={!!errors.github}
            aria-describedby={errors.github ? "github-error" : undefined}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => close(null)}>취소</button>
          <button type="submit">제출하기</button>
        </div>

      </form>
    </BaseModal>
  );
}
