import Modal from '../../components/Modal';
import { useState } from 'react';

export default function VerifyCompanyModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    companyName: "",
    website: "",
    companyEmail: "",
    companySize: "",
    industry: "",
  });

  const update = (k, v) => setForm({ ...form, [k]: v });

  const handleNext = () => {
    if (!isValidCompanyEmail(form.companyEmail, form.website)) {
      setError("Use official company email matching website domain");
      return;
    }
    setError("");
    setStep(1);
  };

  return (
    <Modal show={isOpen} onClose={onClose} title="Verify Company">
      {step === 0 && (
        <CompanyDetailsStep
          data={form}
          onChange={update}
          error={error}
        />
      )}

      {step === 1 && (
        <EmailVerificationStep
          email={form.companyEmail}
          onVerified={() => {
            setVerified(true);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <VerificationStatusStep status={verified ? "verified" : "pending"} />
      )}

      <div className="flex justify-end mt-6">
        {step === 0 && (
          <Button onClick={handleNext}>Send OTP</Button>
        )}
      </div>
    </Modal>
  );
}
