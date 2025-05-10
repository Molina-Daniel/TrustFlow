# 🤖 Recipient Verification Protocol – TrustFlow + Olas SDK

## 🔐 Purpose

The **Recipient Verification Protocol** ensures that only **valid, identity-verified individuals or organizations** can receive funds through TrustFlow. It combines on-chain registration with **AI-powered validation agents** built using the **Olas SDK**.

This protocol is critical for:

* Preventing fraud and identity abuse
* Increasing community trust
* Meeting legal and ethical standards for public-good funding

---

## 🧠 How It Works – Agent-Based Verification

### 1. **Registration Request**

A user or organization submits a funding proposal and declares their identity as a recipient. They must:

* Fill out a recipient form
* Provide public profile links (Talent Protocol, GitHub, legal registry, NGO ID, etc.)
* Select a category and describe the purpose of the funding

### 2. **Trigger AI Agent**

The submission automatically triggers the **ImpactVerifierAgent**, an AI agent registered on the Olas protocol that:

* Parses and classifies metadata
* Queries public APIs (Talent Protocol, NGO registries, LinkedIn, etc.)
* Assesses consistency, completeness, and social graph validation
* Returns a verification hash, status, and metadata summary

### 3. **Verification Outcome**

The AI agent returns one of the following states:

* ✅ **Verified** – The recipient is trustworthy and valid
* ⚠️ **Manual Review Required** – The data is inconsistent or unclear
* ❌ **Rejected** – Evidence of spam, duplicate, or fake identity

### 4. **On-Chain Record**

The result is stored on-chain, linked to the proposal ID and recipient address. Each verification includes:

* Hash of the verification data
* AI verdict
* Timestamp
* Optional manual override signature (by DAO multisig or reviewer)

---

## 🔗 Tech Stack

| Component              | Description                                      |
| ---------------------- | ------------------------------------------------ |
| Olas SDK               | Used to create the autonomous verification agent |
| Talent Protocol API    | Identity and credential validation               |
| National NGO Registry  | Optional cross-check for legal verification      |
| Kusama Smart Contracts | Stores verification results and proposal links   |

---

## ✅ Benefits

* 📛 **Reduces identity fraud** in social impact funding
* 🧠 **Autonomous evaluation** using real-world data
* 🔐 **Transparent and immutable** audit trail
* 🌍 **Supports NGOs, civic tech, researchers, and social ventures**

---

## 📌 Future Improvements

* Add support for zkProof-based verifications
* Decentralized Oracle fallback in case API access fails
* Allow public flagging and community challenge of suspicious recipients

---

> TrustFlow ensures that the right funds reach the right people, with no gatekeepers and full traceability.

For implementation examples, see [`/agents/ImpactVerifierAgent.ts`](../agents/ImpactVerifierAgent.ts)
