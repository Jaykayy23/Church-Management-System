"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Member = {
  id: string;
  firstName: string;
  lastName: string;
};

function toDateInput(value?: string | Date | null) {
  if (!value) return "";
  const date = new Date(value);
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
}

export default function EditContributionPage() {
  const router = useRouter();
  const params = useParams();
  const contributionId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [members, setMembers] = useState<Member[]>([]);
  const [memberId, setMemberId] = useState("");
  const [type, setType] = useState("Tithe");
  const [project, setProject] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!contributionId) return;
    Promise.all([fetch("/api/members"), fetch(`/api/contributions/${contributionId}`)])
      .then(async ([membersRes, contributionRes]) => {
        const membersData = await membersRes.json();
        const contributionData = await contributionRes.json();
        const list = membersData.data ?? [];
        setMembers(list);
        const contribution = contributionData.data;
        if (contribution) {
          setMemberId(contribution.memberId ?? list[0]?.id ?? "");
          setType(contribution.type ?? "Tithe");
          setProject(contribution.project ?? "");
          setDate(toDateInput(contribution.date));
          setAmount(contribution.amount?.toString() ?? "");
        } else if (list.length) {
          setMemberId(list[0].id);
        }
      })
      .catch(() => setError("Unable to load contribution."));
  }, [contributionId]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!contributionId) {
      setError("Missing contribution id.");
      return;
    }
    const response = await fetch(`/api/contributions/${contributionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId,
        type,
        project,
        date,
        amount: Number(amount || 0),
      }),
    });
    if (!response.ok) {
      setError("Failed to update contribution.");
      return;
    }
    router.push("/contributions");
  }

  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Edit Contribution</h1>
          <p className="gp-page-subtitle">Update contribution details.</p>
        </div>
      </div>

      <form className="gp-form" onSubmit={handleSubmit}>
        <div className="gp-form-grid">
          <div className="gp-form-row">
            <label>Member</label>
            <select
              value={memberId}
              onChange={(event) => setMemberId(event.target.value)}
              required
            >
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.firstName} {member.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="gp-form-row">
            <label>Type</label>
            <select value={type} onChange={(event) => setType(event.target.value)}>
              <option>Tithe</option>
              <option>Offering</option>
              <option>Donation</option>
              <option>Seed</option>
            </select>
          </div>
          <div className="gp-form-row">
            <label>Project</label>
            <input
              value={project}
              onChange={(event) => setProject(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
            />
          </div>
        </div>
        {error ? <p className="gp-login-error">{error}</p> : null}
        <div className="gp-form-actions">
          <button className="gp-action-btn" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
