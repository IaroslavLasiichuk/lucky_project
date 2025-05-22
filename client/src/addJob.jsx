import { useState } from 'react';
import axios from 'axios';

export default function CreateJob() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');

  const handleCreateJob = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/create-job', {
        description,
        amount: parseFloat(amount),
      });
      setPaymentUrl(res.data.paymentUrl);
    } catch (err) {
      alert('Error creating job: ' + err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Create a New Job</h2>
      <input
        type="text"
        placeholder="Job Description"
        className="border p-2 mb-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount (USD)"
        className="border p-2 mb-2 w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2"
        onClick={handleCreateJob}
      >
        Create Job & Get Payment Link
      </button>

      {paymentUrl && (
        <div className="mt-4">
          <p className="font-semibold">Payment Link:</p>
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {paymentUrl}
          </a>
        </div>
      )}
    </div>
  );
}
