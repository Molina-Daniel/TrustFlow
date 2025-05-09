# 🤖 ImpactAgent: Automating Social Proposals

The **ImpactAgent** in TrustFlow is an autonomous agent built with the **Olas SDK** that automatically proposes new funding initiatives based on real donation behavior and on-chain impact data.

---

## 🧠 Data-Driven Proposal Logic

### 🔍 Monitors Donation Activity
The agent listens to donation events emitted by the `FundingManager.sol` smart contract on Kusama. It aggregates donation volume by:
- Category
- User engagement
- Frequency

### 📊 Evaluates Impact Trends
Based on predefined thresholds (e.g., sudden spikes in donations to “Food Security”), the agent detects signals of community priority and emerging needs.

### 📝 Generates Proposals Automatically
When criteria are met, the agent creates a new proposal with:
- **Title** (e.g., *“Emergency Relief for Urban Hunger”*)
- **Requested amount**
- **Category** (from the TrustFlow taxonomy)
- **Justification** (based on impact metrics)
- **Metadata** for DAO display and voting

### 🗳️ Interacts with DAO Governance
The proposal is submitted to the `GovernorDAO` contract, triggering a community vote.  
> 🧠 This ensures that decisions about real funding for real causes are initiated by data—not just manual input.

---

## ⚙️ Why It Matters

- **Removes friction**: No need to wait for manual submissions. Urgent causes are surfaced immediately.
- **Reduces bias**: Decisions are suggested by impact data, not individuals or committees.
- **Scales impact**: Hundreds of proposals can be created and filtered based on live metrics.

---

## 🌐 Real-World Use Case

A spike in donations to a rural tech education initiative in Q3 triggers the agent to propose a new funding round for digital school tools.  
The community votes → Proposal passes → Funds are released — all **without waiting for bureaucracy**.

---

> 💡 *ImpactAgent transforms data into action. TrustFlow automates the path from need to funding.*

